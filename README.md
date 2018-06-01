# hackx backend


## Command
```
yarn install
yarn start
```

After starting the server, open http://localhost:3000/swagger-html and you can see the swagger documentation.

## Files Structure
```
- src                    # 源代码目录
 |- class                # class
   |- exception.js       # 异常处理类
 |- middleware           # 中间件
   |- errorHandle.js     # 错误处理中间件
 |- models               # 数据库模型
 |- routes               # 路由
 |- server               # 针对某一模型的服务，如计算用户的 Token
 |- utils                # 工具
   |- pathCheck.js       # 路径检查
 |- config.js            # 配置文件
 |- db.js                # 数据库连接实例
 |- jsconfig.json        # VSCode 配置文件
 |- main.js              # 入口文件
```

## 开发、测试、打包命令
``` bash
# tb config

/**
* 应用oauth配置，填写app key,secret,redirect回调地址与tb上配置应一致
*/
oauth: {
  key: '978d4920-b64f-11e7-be44-d9f4a0d8da0d',
  secret: '3ff024e2-6529-4626-b003-2a0f4c0909c9',
  redirect: 'http://localhost:8080/auth/callback',
},

// tb部署的host的IP
host: 'salesdemo.teambition.net',
authHost: 'salesdemo.teambition.net',
protocol: 'http',

# mongodb config
# config locate in: src/config.js
mongodb: {
  host: 'localhost',
  database: 'example'
}
# or you can add an mongodb account for security
mongodb: {
  host: 'localhost',
  database: 'example',
  user:'user',
  password:'pwd'
}
# 安装依赖
yarn install

# 运行
yarn run start

# 构建
yarn run build

# 测试
yarn run test

# 部署
yarn run deploy:dev  部署至开发服务器
yarn run deploy:prod 部署至正式服务器

```


## Koa Swagger Decorator Introduction

#### First wrapper the koa-router object

```
// router.js
import Router from 'koa-router';

import Test from './test';

import { wrapper } from 'koa-swagger-decorator';

const router = new Router();

wrapper(router);

// open /swagger-html to show the swagger ui page
// open /swagger-json to show the swagger json data
router.swagger({ title: 'SWAGGER API DOC', description: 'API DOC', version: '1.0.0' });

// map all static methods at Test class for router
router.map(Test);

```

#### Using decorator to make api definition

```
// test.js

import User from 'models/user';
import { request, summary, query, path, body, tags } from 'koa-swagger-decorator';

const testTag = tags(['test']);

const userSchema = {
  name: { type: 'string', required: true },
  gender: { type: 'string', required: false, example: '男' },
  groups: {
    type: 'array',
    required: true,
    items: { type: 'string', example: '组1' }
  }
};

export default class Test {
  @request('get', '/users')
  @summary('获取用户列表')
  @testTag
  @query({
    type: { type: 'number', required: true, default: 1, description: '筛选的种类' }
  })
  static async getUsers(ctx) {
    const users = await User.findAll();
    ctx.body = { users };
  }

  @request('get', '/users/{id}')
  @summary('根据id获取用户信息')
  @testTag
  @path({
    id: { type: 'number', required: true, default: 1, description: '对应用户 id' }
  })
  static async getUser(ctx) {
    const { id } = ctx.params;
    const user = await User.findById(id);
    ctx.body = { user };
  }

  @request('post', '/users')
  @testTag
  @body(userSchema)
  static async postUser(ctx) {
    const body = ctx.request.body;
    ctx.body = { result: body };
  }

  static async temp(ctx) {
    ctx.body = { result: 'success' };
  }
}

```

#### Avaliable annotations:

- tag         
- query
- path
- body
- formData
- middlewares
- summary
- description


```

request      // @request('POST', '/users')

tag          // @tag(['example'])

query        // @query({limit: {type: 'number', required: true, default: 10, description: 'desc'}})

path         // @path({limit: {type: 'number', required: true, default: 10, description: 'desc'}})

body         // @body({groups: {type: 'array', required: true, items: { type: 'string', example: 'group1' }}})

formData     // @formData({file: {type: 'file', required: true, description: 'file content'}})

middlewares  
// support koa middlewares. 
// eg. @middlewares([func1,func2])

summary      // @summary('api summary')

description  // @description('api description')


```



##### The Swagger Document 

![image.png](https://camo.githubusercontent.com/d98c1c180a02190e911c6223be187a8302963a0c/687474703a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f323536333532372d346236656438393531383361303035352e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)
