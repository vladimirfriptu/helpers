## createAsyncActions
> Данные хелперы подразумевают использование в связке с redux-toolkit однако могут использоваться и не зависимо от него

##### Стандартный action creator

```javascript
function action() {
  return {
    type: string,
    payload: any // В реальности payload типизируется
  };
}
```

#### Использование

`store/user/actions.ts`

##### createActionCreators

```javascript
export const loadUser = toolkitHelpers.createActionCreators<R, S, F>("LOAD_USER");

// R = REQUEST payload type
// S = SUCCESS payload type
// F = FAILURE payload type
```

В `loadUser` получаем объект с 3 `action creators` и свойство `type` которое равно строке переданной в функцию `createActionCreators`. _Пример:_

```javascript
loadUser.request({ userId: 1 });
// { type: "LOAD_USER_REQUEST", payload: { userId: 1 } }

loadUser.success();
// { type: "LOAD_USER_SUCCESS", payload: {} }

loadUser.fail(1);
// { type: "LOAD_USER_REQUEST", payload: 1 }
```

Результатом выполнения вышеперечисленных функций является стандартизированный экшен, который готов к диспатчу в стор

Для работы типизации в слайсе нужно использовать `builder`
```typescript
interface State {
  users: {[userId: string]: User};
  usersIds: number[];
}

const slice = createSlice<State>({
  name: 'users',
  initialState: {
    users: {},
    usersIds: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUsers.success, (state, action) => {
      state.users = action.payload;
    });
  },
});
```
