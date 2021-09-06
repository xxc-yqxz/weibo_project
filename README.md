## 补充知识点：

### 1.git操作相关

- git commit -m "refactor:"	-> refactor表示修改了目录结构
- git commit -m "feat:路由的演示"  -> feat表示增加了新功能



- git push origin master  -> 提交到某条分支



- git log -> 查看提交日志	按Q退出
- git show 日志编号  -> 查看提交内容

### 2.js-doc注释

- 文件头部注释

```js
/**
 * @description 存储配置
 * @author xxc
 */
```

- 函数前注释

```js
/**
 * redis set
 * @param {string} key key 键
 * @param {string} val val 值
 * @param {number} timeout 过期时间，单位是秒
 */
```

添加注释前，调用函数提示：

![image-20210905214156421](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210905214156421.png)

添加注释后，调用函数提示：

![image-20210905214224729](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210905214224729.png)

### 3. 项目规范

1. \_redis.js：文件名加\_表示该文件是项目内部使用的，不对外公开。



## 一、知识点介绍

<img src="C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210902181257902.png" alt="image-20210902181257902" style="zoom:50%;" />

- 架构图设计

  <img src="C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210902181346138.png" alt="image-20210902181346138" style="zoom:40%;" />

- 技术方案设计

  架构设计

  接口和路由

  数据表和存储模型

- 功能开发

  用户：登录、注册、用户设置，粉丝和关注

  微博：发布，列表（首页、个人主页、广场页）

  @功能：@某人，回复，接收@到我的消息

- 线上环境

  pm2和多进程

  nginx和反向代理

  日志

- 总结最佳实践

  项目结构

  错误处理

  代码风格

  质量保证

  安全

  线上环境

## 二、技术选型和知识点介绍

### 1.技术选型概述

> 框架选型（koa2(async/await) vs express(异步基于js回调) vs egg(业务封装完备，不适合学习)）
>
> 数据库选型（mysql(企业应用最广泛，成本低) vs mongodb）
>
> 登录技术（session(广泛一些。适用于域名统一，用到模板引擎的情况) vs jwt）
>
> 前端页面（ejs后端模板引擎 (服务端渲染) vs vue/react前端框架(本身比较复杂，且是前后端分离开发方式)）
>
> 缓存数据库(redis)
>
> 单元测试（jest）

### 2.介绍koa2-创建项目

> 1.安装koa-generator 
>
> npm install -g koa-generator    (node版本要大于等于8.0)
>
> 2.使用脚手架新建项目
>
> koa2 -e Nodejs-Koa2模拟新浪微博  （-e表示使用ejs模板引擎）
>
> 3.cd Nodejs-Koa2模拟新浪微博 && npm install
>
> 4.连接远程仓库
>
> 5.npm i cross-env -D
>
> 6.配置package.json
>
> ```json
> "scripts": {
>     "start": "node bin/www",
>     "dev": "cross-env NODE_ENV=dev nodemon bin/www",
>     "prd": "cross-env NODE_ENV=production pm2 start bin/www",
>     "test": "echo \"Error: no test specified\" && exit 1"
>   }
> ```

### 3.介绍koa2-讲解代码结构



<img src="D:\Users\89404\Pictures\temp\6.jpg" alt="6" style="zoom: 67%;" />

<img src="D:\Users\89404\Pictures\temp\7.jpg" alt="7" style="zoom:67%;" />

### 4.介绍koa2 - 演示路由

```js
- src/routes/users.js
const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = {
    userName,
    password
  }
})


module.exports = router
```

```js
- src/routes/index.js

const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  // ctx.params可以获取/:userName中的所有参数
  const { userName } = ctx.params
  ctx.body = {
    title: 'this is profile page',
    userName
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: 'this is loadMore api',
    userName,
    pageIndex
  }
})

module.exports = router
```

### 5.介绍ejs-变量和判断

> 变量
>
> 判断和循环
>
> 引用组件

当在app.js中配置完了以下选项后，便可进行ejs书写

![image-20210903090041991](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903090041991.png)

```ejs
- views/index.ejs
<!DOCTYPE html>
<html>

<head>
  <title>
    <%= title %>
  </title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>

<body>
  <h1>
    <%= title %>
  </h1>
  <p>EJS Welcome to <%= title %></p>
  <!-- 若模板中使用到的变量没有传递，会报错，除非加locals -->
  <p>
    <%= locals.msg %>
  </p>
  <div>
    <% if(isMe){ %>
      <a href="#">@ 提到我的（3）</a>
      <% } else { %>
        <button>关注</button>
        <% } %>
  </div>
  </p>
</body>

</html>
```

```js
- routes/index.js
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: "你好",
    isMe: false
  })
})

module.exports = router
```

### 6.介绍ejs-循环和组件

```ejs
- views/widgets/blog-list.ejs

<ul>
    <% blogList.forEach(blog=>{ %>
        <li data-id="<%= blog.id %> ">
            <%= blog.title %>
        </li>
        <% }) %>
</ul>

<script type="text/javascript">
    console.log(111)
</script>
```

### 7.mysql初始化相关操作

1. 建库

<img src="D:\Users\89404\Pictures\temp\8.jpg" alt="8" style="zoom:67%;" />

2. 建表

   users:

<img src="C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903093712045.png" alt="image-20210903093712045" style="zoom: 33%;" />

​       blogs:

<img src="C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903094015611.png" alt="image-20210903094015611" style="zoom: 33%;" />

3. sql语句（增删改查）

```sql
use koa2_weibo_db;
select * from users;
-- 数据库优化：一般不用select *，而是选择特定列查询
-- select username,nickname from users;
-- select username,nickname from users where username='zhangsan' and `password`='123';

select * from blogs;
-- desc 倒序排序
select * from blogs order by id desc;

insert into users (username,`password`,nickname) values ('zhangsan','123','张三');
-- 注意此处userid需要对应表中id
-- insert into blogs (title,content,userid) values ('标题4',"内容4",4);

-- update后面必须加where,此处id为数字类型，值可以加也可以不加单引号
update blogs set content='内容1111' where id='1';

delete from blogs where id=4;

-- 查询id列，并将结果列改名为count输出
select count(id) as `count` from blogs;

-- limit 2：限制查询两行  offset 2：跳过两行
select * from blogs order by id desc limit 2 offset 2;
```

### 8.介绍外键

> 创建外键
>
> 更新限制 & 删除级联
>
> 连表查询

- 创建外键（创建外键是要确保两个属性数据类型一样）

  1. 

  <img src="C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903101649741.png" alt="image-20210903101649741" style="zoom:80%;" />

  2. 

<img src="D:\Users\89404\Pictures\temp\9.jpg" alt="9" style="zoom:50%;" />



3. 

<img src="D:\Users\89404\Pictures\temp\10.jpg" alt="10" style="zoom:67%;" />

> 注意：若出现error 1452，则要查看要关联的两个属性中的数据是否对应。

4. 创建成功后

   ![image-20210903103718012](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903103718012.png)

此时，若执行以下sql语句，因为users表中没有id为3的用户，就会报错

```sql
insert into blogs (title,content,userid) values ('标题5','内容5',3);
```



若执行以下sql语句，则删除users中id为1的用户的同时，blogs中userId为1的数据也会跟着删除

```sql
delete from users where id =1;
```



- ER图

<img src="C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903104317981.png" alt="image-20210903104317981" style="zoom:50%;" />

- 连表查询

```sql
select * from blogs inner join users on users.id = blogs.userid;
```

![image-20210903104530158](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903104530158.png)

> 此种查询结果会导致id冲突

```sql
select blogs.*,users.username,users.nickname from blogs inner join users on users.id = blogs.userid;
```

![image-20210903105004751](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903105004751.png)

```sql
select blogs.*,users.username,users.nickname from blogs inner join users on users.id = blogs.userid where users.username='lisi';
```

![image-20210903105356300](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903105356300.png)

> 连表查询不一定需要有外键关系。但是一般是连起来用的。

### 9.介绍sequelize - 创建连接

> ORM - Object Relational Mapping ：对象关系映射
>
> 建模（外键）& 同步到数据库
>
> 增删改查 & 连表查询

- ORM

  数据表，用JS中的模型（class或对象）代替

  一条或多条记录，用JS中一个对象或数组代替

  sql语句，用对象方法代替

1. 安装

```txt
npm i mysql2 sequelize -d
```

2. 

```js
const Sequelize = require('sequelize')

const conf = {
    host: 'localhost',
    dialect: 'mysql'    // 声明操作哪个数据库
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'admin123', conf)


// 测试连接
seq.authenticate().then(() => {
    console.log('ok')
}).catch(() => {
    console.log('err')
})

module.exports = seq
```

### 10.介绍sequelize - 创建模型

```js
const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建 User 模型。数据表的名字是users
// 此处虽然写user,但是默认会加s
const User = seq.define('user', {
    // id会自动创建，并设为主键，自增
    userName: {
        type: Sequelize.STRING,   // varchar(255)，varchar是可变类型的，根据你的输入计算内存
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING,

    }
    // suquelize会自动帮我们创建updateAt、createAt两个属性
})

// 创建Blog模型

// 外键关联

module.exports = {
    User
}
```

```js
- src/seq.js
const Sequelize = require('sequelize')

const conf = {
    host: 'localhost',
    dialect: 'mysql'    // 声明操作哪个数据库
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'admin123', conf)

module.exports = seq
    
```

```js
- src/sync.js
const seq = require('./seq')

require('./model')

// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth err')
})

// 执行同步
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})
```

result:

![image-20210903113239710](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903113239710.png)

### 11.介绍sequelize - 创建关联

```js
- src/model.js

const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建 User 模型。数据表的名字是users
// 此处虽然写user,但是默认会加s
const User = seq.define('user', {
    // id会自动创建，并设为主键，自增
    userName: {
        type: Sequelize.STRING,   // varchar(255)，varchar是可变类型的，根据你的输入计算内存
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING,
        comment: '昵称'

    }
    // suquelize会自动帮我们创建updateAt、createAt两个属性
})

// 创建Blog模型
const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

// 外键关联
// 多对一，默认关联id
Blog.belongsTo(User, {
    // 创建外键 Blog.userId -> User.id
    foreignKey: 'userId'
})
// 两个一起写的原因：确保既能查Blog时连着查User，又能查User时连着查Blog
User.hasMany(Blog, {
    foreignKey: 'userId'
})

// 此种写法会在Blog中默认创建一个userId并关联到User中
// Blog.belongsTo(User)

module.exports = {
    User,
    Blog
}
```

- 使用workbench自动创建ER图

  ![image-20210903124542992](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903124542992.png)

### 12.介绍sequelize - 插入数据

```js
- src/create.js
// insert ... 语句

const { Blog, User } = require('./model')

!(async function () {
    // 创建用户
    const zhangsan = await User.create({
        userName: 'xxc',
        password: '123',
        nickName: '薛昕铖'
    })

    // zhangsan.dataValues表示数据库中的当前数据值
    console.log('zhangsan:', zhangsan.dataValues)
    const zhangsanId = zhangsan.dataValues.id

    const lisi = await User.create({
        userName: 'jmz',
        password: '123',
        nickName: '久美子'
    })

    const lisiId = lisi.dataValues.id

    // 创建博客
    const blog1 = await Blog.create({
        title: '标题1',
        content: '内容1',
        userId: zhangsanId
    })

    console.log(blog1.dataValues)

    const blog2 = await Blog.create({
        title: '标题2',
        content: '内容2',
        userId: zhangsanId
    })

    const blog3 = await Blog.create({
        title: '标题3',
        content: '内容4',
        userId: lisiId
    })
})()
```

### 13.介绍sequelize - 查询数据

```js
- src/select.js

const { Blog, User } = require('./model')

!(async function () {
    // // 查询一条记录
    // const xxc = await User.findOne({
    //     where: {
    //         userName: 'xxc'
    //     }
    // })
    // console.log('userName', xxc.dataValues)

    // // 查询特定的列
    // const xxcName = await User.findOne({
    //     attributes: ['userName', 'nickName'],
    //     where: {
    //         userName: 'xxc'
    //     }
    // })
    // console.log('xxcName', xxcName.dataValues)

    // // 查询一个列表
    // const xxcBlogList = await Blog.findAll({
    //     where: {
    //         userId: 1
    //     },
    //     order: [
    //         ['id', 'desc'],
    //         ['title', 'desc']
    //     ]
    // })
    // console.log('xxcBlogList', xxcBlogList.map(blog => blog.dataValues))

    // 分页
    // const blogPageList = await Blog.findAll({
    //     limit: 2,   // 限制本次查询两条
    //     offset: 1,   // 跳过多少条
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })
    // console.log('blogPageList', blogPageList.map(blog => blog.dataValues))

    // 查询总数
    const blogListAndCount = await Blog.findAndCountAll({
        limit: 2,   // 限制本次查询两条
        offset: 0,   // 跳过多少条
        order: [
            ['id', 'desc']
        ]
    })
    console.log(
        'blogListAndCount',
        blogListAndCount.count, // 所有的总数，不考虑分页。不受limit和offset影响
        blogListAndCount.rows.map(blog => blog.dataValues)  // 受limit和offset和order影响，查询出的数据
    )
})()
```

### 14.介绍sequelize - 连表查询

```js
    // 连表查询1
    // 要想执行以下语句的前提是在model中设置了Blog.belongsTo
    // const blogListWithUser = await Blog.findAndCountAll({
    //     // 个人理解：此处先查询出所有blog，在根据查询出的结果算出userName为xxc(userid为1，User表中id与userid相同的数据)
    //     order: [
    //         ['id', 'desc']
    //     ],
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['userName', 'nickName'],
    //             where: {
    //                 userName: 'xxc'
    //             }
    //         }
    //     ]
    // })
    // console.log('blogListWithUser',
    //     blogListWithUser.count,
    //     blogListWithUser.rows.map(blog => {
    //         const blogVal = blog.dataValues
    //         // 因为有include，所以每个blog中会有一个user属性。
    //         blogVal.user = blogVal.user.dataValues   // 此处的user是根据model中define的值决定的
    //         return blogVal
    //     })
    // )

    // 连表查询2
    // 要想执行以下语句的前提是在model中设置了User.hasMany
    const userListWithBlog = await User.findAndCountAll({
        attributes: ['userName', 'nickName'],
        include: [
            {
                model: Blog
            }
        ]
    })
    console.log(
        'userListWithBlog',
        userListWithBlog.count,
        JSON.stringify(userListWithBlog.rows.map(user => {
            const userVal = user.dataValues
            userVal.blogs = userVal.blogs.map(blog => blog.dataValues)
            return userVal
        }))
    )
```

### 15.介绍sequelize - 删除和更新

```js
- src/update.js

const { User } = require('./model')

!(async function () {
    const updateRes = await User.update({
        nickName: '薛'
    }, {
        where: {
            userName: 'xxc'
        }
    })
    console.log('updateRes...', updateRes[0] > 0)   // updateRes的值为[1]（修改成功）或[0]
})()
```

```js
- src/delete.js

const { User, Blog } = require('./model')

!(async function () {
    // 删除一条博客
    // const delBlogRes = await Blog.destroy({
    //     where: {
    //         id: 3
    //     }
    // })
    // console.log('delBlogRes', delBlogRes > 0)   // delBlogRes为删除的行数

    // 删除一个用户
    const delUserRes = await User.destroy({
        where: {
            id: 1
        }
    })
    console.log('delUserRes', delUserRes)
})()
```

> 注意此处，因为Blog设置了外键，所以当删除User表中的数据，会导致Blog中的数据也被修改。但是由于是sequelize自动帮我们添加的外键，所以要注意把此处的On Delete改为CASCADE
>
> ![image-20210903163734349](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903163734349.png)

### 16.介绍sequelize - 连接池

<img src="C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210903170840293.png" alt="image-20210903170840293" style="zoom:50%;" />

```js
- src/seq.js
const Sequelize = require('sequelize')

const conf = {
    host: 'localhost',
    dialect: 'mysql'    // 声明操作哪个数据库
}

// 线上环境使用连接池
conf.pool = {
    max: 5,  // 连接池中最大的连接数量
    min: 0,  // 连接池中最小的连接数量
    idle: 10000  // 如果一个连接池 10s 之内没有被使用，则释放
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'admin123', conf)

module.exports = seq
```



### 17.介绍redis

> 内存数据库（mysql是硬盘数据库）
>
> 推荐放入redis中的数据：微博广场页数据（公共数据）、session



### 18.nodejs操作redis

```js
- src/utils/env.js

/**
 * @description 环境变量
 * @author xxc
 */

const ENV = process.env.NODE_ENV

module.exports = {
    isDev: ENV === 'dev',
    notDev: ENV !== 'dev',
    isProd: ENV === 'production',
    notProd: ENV !== 'production',
}
```

```js
- src/conf/db.js

/**
 * @description 存储配置
 * @author xxc
 */
import { isProd } from '../utils/env.js'

// 此处将REDIS_CONF单独抽出成一个文件的原因：为了适配各种环境下REDIS_CONF的变化
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

if (isProd) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    REDIS_CONF
}
```

```js
- src/cache/_redis.js

/**
 * @description 连接 redis 的方法 get set
 * @author xxc
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log('redis error', err)
})

/**
 * redis set
 * @param {string} key key 键
 * @param {string} val val 值
 * @param {number} timeout 过期时间，单位是秒
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key 键
 */
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                // 如果能变对象则在try中处理，否则在catch中处理
                resolve(
                    JSON.parse(val)
                )
            } catch (error) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = { set, get }
```

