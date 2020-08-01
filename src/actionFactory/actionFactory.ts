import { createAction } from '@reduxjs/toolkit';

export function createAsyncActions<R, S, F>(type: string) {
  return {
    request: createAction<R>(`${type}_REQUEST`),
    success: createAction<S>(`${type}_SUCCESS`),
    failure: createAction<F>(`${type}_FAILURE`),
    type,
  };
}
