import { Reducer, Config } from './types';
declare const defaultRequestReducerConfig: Config;
declare type UserConfig = Partial<typeof defaultRequestReducerConfig>;
export declare function createRequestReducer(userConfig?: UserConfig): import("redux").Reducer<Reducer, import("redux").AnyAction>;
export {};
