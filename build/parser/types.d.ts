export interface Field {
    apiName?: string;
    fromApi?: (field: any, data: object) => any;
    toApi?: (field: any, data: object) => any;
    required?: boolean;
}
export interface Fields {
    [key: string]: Field;
}
