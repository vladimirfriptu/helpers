/* eslint-disable no-console */
import get from 'lodash.get';
import snakeCase from 'lodash.snakecase';
import { isSchema, Schema } from 'yup';
import { Field, Fields } from './types';

/**
 * transform the entity received from BE to the formats we need on FE (camelcase, destructuring, etc.)
 * @param ExtendingClass Класс модельки
 * @param response то что нужно распарсить
 * */
export const transformFromPayload = (
  ExtendingClass: any,
  response: object | string,
): object | never => {
  let data: any;
  try {
    data = typeof response === 'string' ? JSON.parse(response) : response;
  } catch {
    data = null;
  }

  const {
    fields,
    scheme,
  }: { fields: Fields; keepUnprocessed: boolean; scheme: Schema<object> } = ExtendingClass;
  const defaults = new ExtendingClass();
  // iterate over fields, use constructor values as defaults
  if (!Object.keys(fields).length) return null;

  const result = Object.entries(fields).reduce((acc, curr) => {
    const [localFieldName, fieldDescription]: [string, Field] = curr;
    const {apiName, fromApi, required = false} = fieldDescription;

    let rawValue: object;

    if (!apiName) rawValue = data[snakeCase(localFieldName)];
    else rawValue = get(data, apiName);

    if (!rawValue && required && typeof fromApi !== 'function') {
      throw new Error(
        `${ExtendingClass.name} has required field "${localFieldName}" but it was missing, skipping`,
      );
    }
    const defaultValue = defaults[localFieldName];
    let resultingValue;
    // if there's a special method to extract value - pass the raw value and the whole object to it
    if (fromApi) {
      try {
        resultingValue = fromApi(rawValue, data);
      } catch (e) {
        // decide on what to do in this case
        console.log(`Failed to parse ${localFieldName} data for object`);
        resultingValue = defaultValue;
      }
    } else {
      // else just extract value using apiName (if it's different than the name we use locally) or local name
      resultingValue = rawValue;
    }

    /**
     * Изменил!
     * если прилетает значение 0 или false то оно применяло дефолтное (Переделано)
     * */
    resultingValue = typeof resultingValue === 'undefined' ? defaultValue : resultingValue;

    (acc as any)[localFieldName] = resultingValue;

    return acc;
  }, {});

  /*
   * Валидация всей модели по схеме
   * */
  if (isSchema(scheme)) {
    const isValid = scheme.isValidSync(result);

    if (!isValid) {
      throw new Error('An error occurred while validating the models');
    }
  }

  return result;
};
