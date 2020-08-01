import { RootState } from './types';
export declare function getRequestLoading(type: string, fallback?: any): (store?: RootState, customFallback?: any) => any;
export declare function getRequestError(type: string, fallback?: any): (store?: RootState, customFallback?: any) => any;
export declare enum RequestStatus {
    UNKNOWN = 0,
    LOADING = 1,
    ERROR = 2,
    FULFILLED = 3
}
export declare function getRequestInfo(type: string): (store?: RootState) => {
    status: RequestStatus;
    requestId: string;
    error: string;
};
