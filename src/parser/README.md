## parser

`import { parser } from "@packages/helpers-rtkit";`

### Описание

>>>
Набор функций для парсинга данных в моделях.
>>>

### transformFromPayload
```typescript
transformFromPayload(
  Model: object extends BaseModel,
  serverResponse: any
): any;
```

>>>
transformFromPayload - вспомогательная функция для валидации и мапинга респонсов с бэкенда в объект заданной структуры и типа. Для работы необходимо наличия корректного статик свойства fields у модели [см. раздел Модель Данных](#модель-данных).
>>>

### transformToPayload
```typescript
transformToPayload(
  Model: object extends BaseModel,
  requestBody: any
): any;
```

>>>
transformToPayload - вспомогательная функция для мапинга данных в требуемую бэком структуру перед отправкой PUT/POST/PATCH запроса на сервер. Для работы необходимо наличия корректного статик свойства fields у модели [см. BaseModel](#модель-данных).
>>>

#### Модель Данных

>>>
Модели используются для трансформации сырых данных с бэкенда в бизнес сущности приложения, а также для обратного процесса трансформации бизнес сущностей в структуры необходимые для выполнения запроса к серверу.
>>>

```typescript
import * as yup from 'yup';

const validationScheme = yup.object().shape({ id: yup.string(), name: yup.string() });

type ExampleEntity = yup.InferType<typeof validationScheme>

class ExampleModel implements ExampleEntity {
  id = NaN;
  name = '';
  capabilities = [];

  static scheme = validationScheme;

  static fields = {
    id: {},
    name: {
      apiName: 'someName',
    },
    capabilities: {
      apiName: 'items',
      fromApi: (field) => (field || []).map((el) => el.name),
      requared: true,
    },
  };

  public static fromPayload = parser.transformFromPayload.bind(null, ExampleModel) as (response: any) => ExampleEntity;
}
```

Значения **полей модели** будут использованы в качестве дефолтных при парсинге.
**Статик поле fields обязательно** и должно содержать в себе конфигурации для парсинга **каждого** из полей модели. Поля отсутсвующие в static fields при парсинге игнорируются.

Каждый такой конфигурационный файл имеет вид:
```typescript
interface fieldConfig {
  apiName?: string = fieldName; // искомое поле в респонсе, указать если отличается от поля модели
  fromApi?: (value: any, response: object) => any = (value) => value; // функция для дополнительного паминга респонса
  requared?: boolean = false; // флаг обязательности поля в респонсе. Если искомое поле отсутсвует в респонсе, то при флаге false - будут использованы дефолтные значения поля модели, при true - будет выкинута ошибка.
  toApi?: (value: any, response: ExampleEntity) => any = (value) => value; // функция для дополнительного паминга данных в реквест
}
```
