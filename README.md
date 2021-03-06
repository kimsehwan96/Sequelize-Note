# Sequelize

- Node에서 대표적으로 사용하는 ORM 프레임워크

## 설치

`npm install --save sequelize`

- 본인이 사용하고자 하는 데이터베이스에 따라서 아래 명령어 추가 사용
`npm install --save pg`
`npm install --save mysql2`
`npm install --save mariadb`
`npm install --save sqlite`
`npm install --save tedious`

## 데이터베이스와 커넥션

1. sequelize 인스턴스를 생성한다. 이 때 인자로 어떤 데이터베이스를 쓰는지와 같은 설정을 넘겨주어야 한다.

```js
const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
```

- sequelize-cli 를 사용하면 config.json 으로 설정 할 수 있게 된다. 본인이 원하면 config.js로 수정해서 js객체기반 설정도 가능하다.

- 실제로 나는 테스트를 위해 올바르다고 여겨지는 디렉터리 구성을 하지 않고 한 파일 안에서 테스트 해볼 예정.

- 실제 시퀄라이즈 인스턴스를 만드는 과정

```js
const { Sequelize, DataTypes, Model } = require('sequelize');

const database = 'seq_test'
const username = 'root'
const password = null;
const host = '127.0.0.1'
const dialect = 'mysql'

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
});
```

## 커넥션 체크 로직

```js
const checkcon = async () => {
    try {
        await sequelize.authenticate();
        console.log("conn established");
    } catch (e) {
        console.log(e);
    }
}

checkcon();
```

- `sequelize.authenticate()` 는 프로미스 객체를 반환하며. 이는 연결하고자하는 DB에 1+1 에 대한 리절트를 물어보는. 즉 커넥션 체크만 하는 로직이다.

## 객체 모델 생성

```js
class User extends Model{
    static associate(models) {
        //associate 스태틱 메서드에 여러분이 원하는 모델간 관계를 작성하세요.
        //아래 예제는 M:N 관계를 표현하는것이며, 시퀄라이즈는 디폴트로 junction Table을 만들어서 M:N 구현을 해줍니다.
        User.belongsToMany(models.Task, {
            through: 'UserTasks'
        });
    };
    //init 메서드에서 여러분이 원하는 어트리뷰트들을 작성하세요, init의 첫번째 인자로는 어트리뷰트에 대한 객체가 들어오고, 두번째는 옵션에 대한 객체가 들어옵니다.
    static init(sequelize){
        return super.init({
            name: DataTypes.STRING
        }, {
            sequelize,
            modelName: "User",
            tableName: "users"
        });
    }
}
```

## 객체 모델 초기화 방법

```js
User.init(sequelize)
```
- 를 통해 객체 모델을 초기화 합니다.

## 테이블을 생성하기

```js
const initializeDB = async () => {
    await sequelize.sync({force: false});
}

initializeDB();
```

- 여기서 중요한점. `sync` 메서드의 인자인 force를 true로 주면 기존에 똑같은 이름의 테이블이 있을경우 DROP 합니다.

## 모델에 대한 인스턴스를 하나 생성해서 저장하기

- 두가지 방법이 있습니다.
    1. build & save
    2. create

- build 는 non-persistance 인스턴스를 생성하는 것입니다. 즉 DB에 실제로 저장되지 않은 상태의 객체를 만드는 것.
- 따라서 save() 메서드로 트랜잭션해줘야 실제 저장이 됩니다.

- create는 바로 객체를 생성하면서 DB에 저장합니다. 리턴값이 무엇인지는 문서보고 확인해야함

```js
const kim = User.build({
    name: "kim"
});

const makeUser = async(user) => {
    await user.save();
    console.log("saved " + user);
}

makeUser(kim);
```

- save연산은 프라미스 객체를 반환합니다. 따라서 async await을 활용 가능합니다.

### 팁

- sequelize의 대부분의 메서드의 결과는 프라미스 객체를 반환하므로 비동기 로직을 짜기 쉽습니다.

```js


Task.bulkCreate([
    { name : "task1" },
    { name : "task2" },
    { name : "task3" }
]).then(() => {
    console.log('save success');
})

```

- 여러 데이터를 대량으로 저장하는 방법입니다. bulkCreate이라는 메서드를 쓰면 되며, 인자로는 객체들의 배열이 들어와야 합니다.
- 만약 하나의 데이터만 저장할경우 `create` 메서드로 하나의 객체만 던져주면 됩니다. 
- 위 코드에서는 간단히 확인을 위해 .then()을 활용했습니다.

## assocs

- sequelize는 여러 관계를 표현하기 위한 방법들을 제공합니다.

- `belongsTo` : 1:1 
- `hasOne` : 1:1
- `hasMany` : 1:N
- `belongsToMany` : M:N

- 위 네개가 그러한 것들입니다.

- 위 네개 메서드를 사용하여 관계를 표현하면, 해당 모델에대한 객체는 여러 특별한 메서드들을 얻게 됩니다.

- 우선 `Foo`, `Bar` 두 모델이 있다고 치고 시작합시다.

## Foo.hasOne(Bar)

- fooInstance.getBar()
- fooInstance.setBar()
- fooInstance.createBar()

- 이러한 세개의 특별한 메서드/믹스인이 생깁니다.

```js
const foo = await Foo.create({ name: 'the-foo' });
const bar1 = await Bar.create({ name: 'some-bar' });
const bar2 = await Bar.create({ name: 'another-bar' });
console.log(await foo.getBar()); // null
await foo.setBar(bar1);
console.log((await foo.getBar()).name); // 'some-bar'
await foo.createBar({ name: 'yet-another-bar' });
const newlyAssociatedBar = await foo.getBar();
console.log(newlyAssociatedBar.name); // 'yet-another-bar'
await foo.setBar(null); // Un-associate
console.log(await foo.getBar()); // null
```

## Foo.belongsTo(Bar)

- hasOne이랑 동일한 메서드 및 믹스인을 갖습니다.

- fooInstance.getBar()
- fooInstance.setBar()
- fooInstance.createBar()

## Foo.hasMany(Bar)

- fooInstance.getBars()
- fooInstance.countBars()
- fooInstance.hasBar()
- fooInstance.hasBars()
- fooInstance.setBars()
- fooInstance.addBar()
- fooInstance.addBars()
- fooInstance.removeBar()
- fooInstance.removeBars()
- fooInstance.createBar()

```js
const foo = await Foo.create({ name: 'the-foo' });
const bar1 = await Bar.create({ name: 'some-bar' });
const bar2 = await Bar.create({ name: 'another-bar' });
console.log(await foo.getBars()); // []
console.log(await foo.countBars()); // 0
console.log(await foo.hasBar(bar1)); // false
await foo.addBars([bar1, bar2]);
console.log(await foo.countBars()); // 2
await foo.addBar(bar1);
console.log(await foo.countBars()); // 2
console.log(await foo.hasBar(bar1)); // true
await foo.removeBar(bar2);
console.log(await foo.countBars()); // 1
await foo.createBar({ name: 'yet-another-bar' });
console.log(await foo.countBars()); // 2
await foo.setBars([]); // Un-associate all previously associated bars
console.log(await foo.countBars()); // 0
```

- 위에건 나중에 또 작성할래요

## Eager Loading

- Eager Loading 이란 이런 N:M 관계에 대한 내용들을 조회할때, 시퀄라이저로 여러 쿼리문을 조합하는게 아니라, 단일 쿼리문으로 쪼지는걸 의미
- 자동으로 SQL JOIN 구문을 만들어서 조회하는거라고 보면 되겠다 !!

```js
const getResult = async() => {
    const result = await User.findOne({
        where : {id : 9},
        include: Task
    });
    console.log(JSON.stringify(result, null, 2));
}

getResult();
```

- 위 같은 코드로 User의 id가 9인 레코드에 어떤 Task들이 할당되었는지 보려고 한다.
- 이 때 수행되는 SQL 쿼리문은 다음과 같더라

```SQL
Executing (default): SELECT `User`.`id`, `User`.`name`, `User`.`createdAt`, `User`.`updatedAt`, `Tasks`.`id` AS `Tasks.id`, `Tasks`.`name` AS `Tasks.name`, `Tasks`.`createdAt` AS `Tasks.createdAt`, `Tasks`.`updatedAt` AS `Tasks.updatedAt`, `Tasks->UserTasks`.`createdAt` AS `Tasks.UserTasks.createdAt`, `Tasks->UserTasks`.`updatedAt` AS `Tasks.UserTasks.updatedAt`, `Tasks->UserTasks`.`UserId` AS `Tasks.UserTasks.UserId`, `Tasks->UserTasks`.`TaskId` AS `Tasks.UserTasks.TaskId` FROM `users` AS `User` LEFT OUTER JOIN ( `UserTasks` AS `Tasks->UserTasks` INNER JOIN `tasks` AS `Tasks` ON `Tasks`.`id` = `Tasks->UserTasks`.`TaskId`) ON `User`.`id` = `Tasks->UserTasks`.`UserId` WHERE `User`.`id` = 9;
```
- 오우야..

- 콘솔 결과

```console
{
  "id": 9,
  "name": "lee",
  "createdAt": "2021-02-04T10:21:26.000Z",
  "updatedAt": "2021-02-04T10:21:26.000Z",
  "Tasks": [
    {
      "id": 4,
      "name": "task1",
      "createdAt": "2021-02-04T10:21:26.000Z",
      "updatedAt": "2021-02-04T10:21:26.000Z",
      "UserTasks": {
        "createdAt": "2021-02-04T10:21:26.000Z",
        "updatedAt": "2021-02-04T10:21:26.000Z",
        "UserId": 9,
        "TaskId": 4
      }
    },
    {
      "id": 5,
      "name": "task2",
      "createdAt": "2021-02-04T10:21:26.000Z",
      "updatedAt": "2021-02-04T10:21:26.000Z",
      "UserTasks": {
        "createdAt": "2021-02-04T10:21:26.000Z",
        "updatedAt": "2021-02-04T10:21:26.000Z",
        "UserId": 9,
        "TaskId": 5
      }
    },
    {
      "id": 6,
      "name": "task3",
      "createdAt": "2021-02-04T10:21:26.000Z",
      "updatedAt": "2021-02-04T10:21:26.000Z",
      "UserTasks": {
        "createdAt": "2021-02-04T10:21:26.000Z",
        "updatedAt": "2021-02-04T10:21:26.000Z",
        "UserId": 9,
        "TaskId": 6
      }
    }
  ]
}
```

- 실제로 데이터를 저렇게 저장했다

![1](images/1.png)

