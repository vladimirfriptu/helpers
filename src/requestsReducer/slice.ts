import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { Reducer, Config } from './types';

const defaultRequestReducerConfig: Config = {
  expiryTime: 10000, // миллисекунды
  isSaveFulfilled: true,
  isExpiryFulfilled: true,
  patterns: {
    request: /_REQUEST$|\/pending$/g,
    success: /_SUCCESS$|\/fulfilled$/g,
    failure: /_FAILURE$|\/rejected$|\/rejectedWithValue$/g,
  },
};

type UserConfig = Partial<typeof defaultRequestReducerConfig>;

const initialState: Reducer = Object.freeze({
  loading: {},
  error: {},
  fulfilled: {},
});

/**
 * @param userConfig optional config object
 * */
export function createRequestReducer(userConfig: UserConfig = {}) {
  const config = {
    ...defaultRequestReducerConfig,
    ...userConfig,
  };

  function clearFulfilledActions(state: typeof initialState) {
    if (config.isSaveFulfilled && config.isExpiryFulfilled && Object.keys(state.fulfilled).length) {
      Object.entries(state.fulfilled).forEach(([actionType, meta]) => {
        if (config.expiryTime < Date.now() - meta.timestamp) {
          delete state.fulfilled[actionType];
        }
      });
    }
  }

  return createReducer(initialState, (builder) => {
    builder
      .addMatcher(
        (action): action is PayloadAction => !!action.type.match(config.patterns.request)?.length,
        (state, action) => {
          const actionType = action.type.replace(config.patterns.request, '');
          clearFulfilledActions(state);

          state.loading[actionType] = true;
        },
      )
      .addMatcher(
        (action): action is PayloadAction<string | undefined> =>
          !!action.type.match(config.patterns.failure)?.length,
        (state, action) => {
          const actionType = action.type.replace(config.patterns.failure, '');
          clearFulfilledActions(state);

          state.error[actionType] = action.payload || true;

          delete state.loading[actionType];
          delete state.fulfilled[actionType];
        },
      )
      .addMatcher(
        (action): action is PayloadAction => !!action.type.match(config.patterns.success)?.length,
        (state, action) => {
          const actionType = action.type.replace(config.patterns.success, '');
          clearFulfilledActions(state);

          state.fulfilled[actionType] = {
            timestamp: Date.now(),
          };

          delete state.loading[actionType];
          delete state.error[actionType];
        },
      );
  });
}
