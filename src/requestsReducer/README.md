## requestReducer

`import { requestReducer } from "@packages/helpers-rtkit";`

#### Описание

Данный редьюсер предназначен для автоматического отсеживания типов, который заканчиваются подстрокой
`_REQUEST | _SUCCESS | _FAILURE` и воспринимает данные подстроки типов как модификаторы состояния запроса

> `_REQUEST` - начало выполнения запроса \
> `_SUCCESS` - запрос выполнен успешно \
> `_FAILURE` - запрос вернул ошибку

#### Подключение:

`src/store/index.ts`

```typescript
import { createStore, Store } from 'redux';
import { createRequestReducer } from '@packages/helpers-rtkit';

const rootReduceer = combineReducers({
  requestsReducer: createRequestReducer(),
  ...OTHER_REDUCERS,
});

const store: Store = createStore(rootReduceer, {});

export default store;
```

#### Использование:

`src/store/profile/selectors.ts`

```typescript
import { getRequestLoading, getRequestError } from '@packages/helpers-rtkit';
import { LOAD_USER } from './actions'; // как создавать action смотреть в описании 'toolkitHelpers/actionFactory'

export const getUserRequestPanding = getRequestLoading(LOAD_USER.ORIGIN);
export const getUserRequestError = getRequestError(LOAD_USER.ORIGIN);
```

`src/components/component/index.ts`

```typescript
import { connect } from 'react-redux;
import { getUserRequestPanding, getUserRequestError } from 'src/store/profile/selectors'

import Component from './Profile;

interface StateProps {
  isUserLoading?: boolean;
  userLoadError?: any;
}

const mapStateToProps = (state): StateProps => ({
  isUserLoading: Boolean(getUserRequestPanding(state)),
  userLoadError: getUserRequestError(state)
});

export default connect<StateProps>(mapStteToProps)(Component);
```
