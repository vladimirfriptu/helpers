import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';

/**
 * T: Интерфейс ожидаемого ответа на выходе
 * */
function transformObjectKeys<T = any>(res: object, toSnakeCase?: boolean): T {
  const parser = toSnakeCase ? snakeCase : camelCase;

  if (Array.isArray(res)) {
    return res.reduce((acc, current) => {
      if (typeof current === 'object' && current !== null) {
        acc.push(transformObjectKeys(current, toSnakeCase));
      } else {
        acc.push(current);
      }

      return acc;
    }, []);
  }

  return Object.keys(res).reduce((acc, current) => {
    const value = (res as any)[current];
    if (typeof value === 'object' && value !== null) {
      (acc as any)[parser(current)] = transformObjectKeys(value, toSnakeCase);
    } else {
      (acc as any)[parser(current)] = value;
    }

    return acc;
  }, {}) as any;
}

export default transformObjectKeys;
