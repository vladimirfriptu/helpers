export interface Reducer {
  loading: { [actionType: string]: any }; // todo избавиться от any
  error: { [actionType: string]: any }; // todo избавиться от any
  fulfilled: { [actionType: string]: FulfilledMeta };
}

type FulfilledMeta = {
  timestamp: number;
};

export interface RootState {
  requestsReducer?: Reducer;
}

export type Config = {
  expiryTime?: number;
  patterns: {
    request: RegExp;
    success: RegExp;
    failure: RegExp;
  };
  isSaveFulfilled: boolean;
  isExpiryFulfilled: boolean;
};
