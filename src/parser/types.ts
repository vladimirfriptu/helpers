export interface Field {
  /**
   * apiName: backend field name is nto the one we use on FE
   */
  apiName?: string;

  /**
   * fromApi: function to calculate value for FE based on BE field
   * E.g. fromApi: (field) => field.map((el) => el.name)
   * would output an array of names instead of nested object
   * Another example: using another model to process the BE field
   * fromApi: (field) => Barrier.fromApi(field)
   * would process the field as a Barrier entity
   * If you need to calc field value based on another BE field - the whole BE object is passed as second argument, e.g.
   * fromApi: (field, data) => field + data.total
   */
  fromApi?: (field: any, data: object) => any;

  /**
   * toApi: process the object to send it to BE
   */
  toApi?: (field: any, data: object) => any;

  /**
   * if field is required (e.g. id) but not present in the response - fromApi() will return null
   */
  required?: boolean;
}

export interface Fields {
  [key: string]: Field;
}
