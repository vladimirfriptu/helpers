import { RootState } from './types';
import { getRequestReducer } from './utils';

export function getRequestLoading(type: string, fallback?: any) {
  return (store: RootState = {}, customFallback?: any): any => {
    const reducer = getRequestReducer(store);

    if (type in reducer.loading) {
      return reducer.loading[type];
    }

    return fallback || customFallback;
  };
}

export function getRequestError(type: string, fallback?: any) {
  return (store: RootState = {}, customFallback?: any): any => {
    const reducer = getRequestReducer(store);

    if (type in reducer.error) {
      return reducer.error[type];
    }

    return fallback || customFallback;
  };
}

export enum RequestStatus {
  UNKNOWN,
  LOADING,
  ERROR,
  FULFILLED,
}

export function getRequestInfo(type: string) {
  return (store: RootState = {}) => {
    const reducer = getRequestReducer(store);

    const result = {
      status: RequestStatus.UNKNOWN,
      requestId: '',
      error: '',
    };

    if (reducer.loading[type]) {
      result.status = RequestStatus.LOADING;
    } else if (reducer.error[type]) {
      const error = reducer.error[type];
      result.status = RequestStatus.ERROR;
      if (typeof error === 'string') {
        result.error = error;
      }
    } else if (reducer.fulfilled[type]) {
      result.status = RequestStatus.FULFILLED;
    }

    return result;
  };
}
