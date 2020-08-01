## transformObjectKeys

`import { transformObjectKeys } from "@packages/helpers-rtkit";`

Необходим для трансформации ключей объекта в camelCase/snakeCase
Функция будет перебирать все вложенности

### Использование

#### snakeCase > camelCase

```javascript
const a = {
  user: {
    user_name: "name",
    user_age: 2
  }
};

transformObjectKeys(a);

/*
 * {
 *   user: {
 *     userName: "name",
 *     userAge: 2
 *   }
 * };
 */
```

#### camelCase > snakeCase

```javascript
const a = {
  user: {
    userName: "name",
    userAge: 2
  }
};

transformObjectKeys(a, true);

/*
 * {
 *   user: {
 *     user_name: 'name',
 *     user_age: 2
 *   }
 * }
 */
```
