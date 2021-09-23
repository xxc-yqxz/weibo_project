## 补充知识点：

### 1.git操作相关

- git commit -m "refactor:"	-> refactor表示修改了目录结构
- git commit -m "feat:路由的演示"  -> feat表示增加了新功能



- git push origin master  -> 提交到某条分支
- git diff [文件名]   ->  查询文件修改情况
- git log -> 查看提交日志	按Q退出
- git show 日志编号  -> 查看提交内容
- git push origin feature-login -> 提交并创建分支



- git stash -> 暂存修改
- git checkout -b feature-user-setting  -> 新建并切换到新分支

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

### 19.cookie和session

- cookie是从服务端获取的，获取到后，存储到浏览器端。之后请求，浏览器会用一些方法，让请求带上cookie，然后服务端根据传来的cookie来对应session来获取相应信息。

```js
let userId = req.cookie.userid
req.session = SESSION_DATA[userId]
```

- session存储redis

  原因1：操作系统会限制一个进程的最大可用内存。如果靠定义变量存储session。当访问用户多时，就会导致内存不断增大

  原因2：启动多个进程时，进程之间的数据是相互隔离的。

<img src="file:///D:\Users\89404\Documents\Tencent Files\1806366773\Image\C2C\6731967D6E5FF163B9CB2CABAA60A266.jpg" alt="img" style="zoom:50%;" />

1. 将web server和redis拆分为两个单独的服务

2. 双方都是独立的，都是可扩展的（例如都扩展成集群）



- 为何session适用于redis？
  1. session访问频繁，对性能要求极高
  2. sessioni可不考虑断点丢失数据的问题（内存的硬伤）
  3. session数据量不会太大（相比于mysql中存储的数据）
- 为何网站数据和适合用redis？
  1. 操作频率不是太高（相比于session操作）
  2. 断电不能丢失，必须保留
  3. 数据量太大，内存成本太高

### 20.koa2配置session

```txt
npm i koa-redis koa-generic-session --save
```



```js
- app.js

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 配置需要在路由之前写
// session 配置
app.keys = ['xxc']  // 设置加密密匙
app.use(session({
  key: 'weibo.sid',   // cookie name 默认是koa.sid
  prefix: 'weibo:sess:', // redis key 的前缀，默认是`koa:sess:`
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 100   // ms
  },
  // ttl: 24 * 60 * 60 * 100,  // redis过期时间，此参数不写默认与cookie中的maxAge一致
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
```

```js
- routes/index.js

const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: "你好",
    isMe: false,
    blogList: [
      {
        id: 1,
        title: 'aaa'
      },
      {
        id: 2,
        title: 'aaa'
      },
      {
        id: 3,
        title: 'aaa'
      }
    ]
  })
})

router.get('/json', async (ctx, next) => {
  // 此处能有session是因为在app.js中配置了
  // 此种配置下，session要使用后才能生效，并非访问一个随便的页面都会导致浏览器生成cookie、redis保存session。
  const session = ctx.session
  if (session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++;
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
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



### 21.介绍jest

- 单元测试

  单个功能或接口，给定输入，得到输出。看输出是否符合要求

  需手动编写用例代码，然后统一执行

  意义：能一次性执行所有单侧，短时间内验证所有功能是否正常

- 使用jest

  *.test.js 文件

  常用的断言

  测试http接口

```txt
npm i jest --save-dev
```

```json
- package.json

"scripts": {
    "dev": "cross-env NODE_ENV=dev nodemon bin/www",
    "prd": "cross-env NODE_ENV=production pm2 start bin/www",
    "test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors"		--> runInBand表示顺序执行
    --> forceExit 表示强制退出  --> colors 表示分颜色输出
},
```

```js
- test/demo.test.js
// 注意文件名及文件创建位置
/**
 * @description test demo
 * @author xxc
 */

function sum(a, b) {
    return a + b
}

// test函数是jest帮我们定义的
test('10 + 20应该等于30', () => {
    const res = sum(10, 20)
    // expect(res).toBe(30)
    expect(res).not.toBe(40)
})
```



### 22.测试http请求

```txt
npm i supertest --save-dev
```

```JS
- test/server.js

/**
 * @description jest server
 * @author xxc
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
```

```js
- test/json.test.js

/**
 * @description json test
 * @author xxc
 */

const server = require('./server')

test('json 接口返回数据格式正确', async () => {
    // 测试get请求
    // const response = await server.get('/json')
    // expect(response.body).toEqual({      // toEqual 判断对象数据是否一样
    //     title: 'koa2 json'
    // })
    // expect(response.body.title).toBe('koa2 json')

    // 测试post请求
    // const res = await (await server.post('/login')).send({
    //     userName: "zhangsan",
    //     password: '123'
    // })
})
```



### 23.完善开发环境-eslint与sequelize配置

- eslint

  ```txt
  cnpm i eslint babel-eslint --save-dev
  ```

  1. eslint基础配置

  ![image-20210906145025250](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210906145025250.png)

> .eslintignore：eslint忽略哪些文件
>
> .eslintrc.json：eslint配置文件

```json
- .eslintignore

node_modules
test
src/public
```

```json
- .eslintrc.json

{
    "parser": "babel-eslint",	->插件
    "env": {			->环境配置
        "es6": true,
        "commonjs": true,
        "node": true
    },
    "rules": {
        "indent": [		-> 换行缩进4个空格，否则报错
            "error",
            4
        ],
        "quotes": [		-> 单引号，否则报错
            "error",
            "single",
            {
                "allowTemplateLiterals": true	-> 允许模板字符串
            }
        ],
        "semi": [		-> 用分号，报错
            "error",
            "never"
        ]
    }
}
```

```json
- package.json

"scripts": {
    "dev": "cross-env NODE_ENV=dev nodemon bin/www",
    "prd": "cross-env NODE_ENV=production pm2 start bin/www",
    "lint": "eslint --ext .js ./src",		-> 对src文件下的js文件进行eslint语法检查
    "test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors"
},
```

> 当eslint检验出错时，要使文件中出现相关错误提示，需要开启以下配置
>
> <img src="D:\Users\89404\Pictures\temp\11.jpg" alt="11" style="zoom:67%;" />

2. 实现提交之前检验eslint规范

```txt
cnpm i pre-commit --save-dev
```

```json
- package.json

  "pre-commit": [
    "lint"		--> 此处的lint未scripts中的lint。表示提交之前要执行一次npm run lint
  ]
```



- sequelize配置

```js
- src/conf/db.js

/**
 * @description 存储配置
 * @author xxc
 */
const { isProd } = require('../utils/env.js')

// 此处将REDIS_CONF单独抽出成一个文件的原因：为了适配各种环境下REDIS_CONF的变化
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'XXC',
    port: '3306',
    database: 'koa2_weibo_db',
}

if (isProd) {
    REDIS_CONF = {
        // 线上的redis配置
        port: 6379,
        host: '127.0.0.1'
    }
    MYSQL_CONF = {
        // 线上的mysql配置
        host: 'localhost',
        user: 'root',
        password: 'XXC',
        port: '3306',
        database: 'koa2_weibo_db',
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}
```

```js
- src/db/seq.js

/**
 * @description sequelize 实例
 * @author xxc
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'    // 声明操作哪个数据库
}

// 如果实在测试环境下，关闭sql语句打印
if (isTest) {
    conf.logging = () => { }
}

// 线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5,  // 连接池中最大的连接数量
        min: 0,  // 连接池中最小的连接数量
        idle: 10000  // 如果一个连接池 10s 之内没有被使用，则释放
    }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
```

```js
- src/db/sync.js

/**
 * @description sequelize 同步数据库
 * @author xxc
 */

const seq = require('./seq')

require('./model')

// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth err')
})

// 执行同步
// force:true -> 表示强制执行。如果数据库中有这个表，则删除后再创建。(重新建表)
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})
```

### 24.完善开发环境-debug

- 使用inspect进行debug

> 一般在路由中写debugger，而不在app.js中写

1. 配置：

```json
"scripts": {
    "dev": "cross-env NODE_ENV=dev nodemon --inspect=9229 bin/www",		--inspect配置端口
},
```

2. 在浏览器中输入 chrome://inspect/#devices 打开debugger窗口
3. 在程序中想要进行调试的地方输入debugger。即可进行调试。

### 25. 完善开发环境-404和错误页-模板

首先在app.js中配置完以下代码：

```js
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
```



> 此处ejs代码理解即可

```ejs
- src/views/404.ejs

<%- include('layout/header', { title: '微博 - 404', isNav: true })%>

<div class="container margin-top-20">
    <div class="row">
        <!-- 左侧 -->
        <div class="col-8">
            <h4 class="margin-bottom-20 padding-bottom-10 border-bottom">404</h4>
            <p>该网页未找到，请<a href="/">返回首页</a></p>
        </div>
    </div>
</div>

<%- include('layout/footer')%>
```

```ejs
- src/views/layout/header.ejs

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= title%></title>

    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">

    <% if (locals.list) { %>
    <%# 有微博列表，以及右侧面板 %>
    <link href="/css/list.css" rel="stylesheet">
    <link href="/css/right.css" rel="stylesheet">
    <% } %>

    <% if (locals.isNarrow) { %>
    <%# 窄模式，登录和注册 %>
    <style>
        body {
            width: 400px;
            margin: 0 auto;
            margin-top: 100px;
        }
    </style>
    <% } %>

    <% if (locals.isNav) { %>
    <%# 有导航%>
    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <% } %>

    <!-- jquery 要首先引入-->
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
    <!-- 封装的 ajax -->
    <script src="/javascripts/my-ajax.js"></script>

    <% if (locals.isInputBlog) { %>
    <%# 有发布微博的功能，需要 at.js https://github.com/ichord/At.js %>
    <link href="/css/jquery.atwho.css" rel="stylesheet">
    <script src="/javascripts/jquery.caret.js"></script>
    <script src="/javascripts/jquery.atwho.js"></script>
    <% } %>
</head>
<body>

    <% if (locals.isNav) { %>
    <%# 有导航%>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="/">慕课微博</a>
        <ul class="navbar-nav mr-auto" style="flex-direction: row;">
            <li class="nav-item">
                <a class="nav-link" href="/">
                    <i class="fa fa-home"></i>
                    首页
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/profile">
                    <i class="fa fa-user"></i>
                    我的空间
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/square">
                    <i class="fa fa-group"></i>
                    广场
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/setting">
                    <i class="fa fa-gear"></i>
                    设置
                </a>
            </li>
        </ul>
    </nav>
    <% } %>
```

```ejs
- src/views/layout/footer.ejs
	<script src="https://cdn.bootcss.com/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://cdn.bootcss.com/twitter-bootstrap/4.3.0/js/bootstrap.min.js"></script>
    <script src="/javascripts/query-object.js"></script>
</body>
</html>
```



### 26.完善开发环境-404和错误页-路由

在routes下新建两个文件夹

![image-20210906164034709](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210906164034709.png)

其中，api是用来放置处理数据等的路由，而view是用来渲染页面的路由。



```js
- app.js
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')
const {isProd} = require('./utils/env')

// 路由
const errorViewRouter = require('./routes/view/error')
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
let onerrorConf = {}
if (isProd) {
// 此处的配置使得页面中发生错误时，能够让重定向到/error路由，并渲染错误页面
  onerrorConf = {
    redirect:'/error'
  }
}
onerror(app,onerrorConf)



......



app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))



......



// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(),errorViewRouter.allowedMethods())  // 此处的路由要放在最后，因为其内部的404页面可以匹配所有路由

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app

```

```js
- src/routes/view/error.js
/**
 * @description error 404 路由
 * @author xxc
 */
const router = require('koa-router')()

// error
router.get('/error', async (ctx, next) => {
    await ctx.render('error')   // 此处的error为ejs模板的名字
})

// 404
router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router
```

### 27. jwt-加密用户信息

> jwt - json web token
>
> 用户认证成功之后，server端返回一个加密的token给客户端
>
> 客户端后续每次请求都带token，以示当前的用户身份(cookie是浏览器帮我们带的，而token是需要我们自己去带)
>
> token为加密后的用户信息，由客户端存储。而cookie对应的用户信息由服务端的session存储。

- 返回未加密用户数据

```js
// 模拟登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body

  let userInfo
  if (userName === 'zhangsan' && password === 'abc') {
    // 登录成功，获取用户信息。模拟数据库
    userInfo = {
      userId: 1,
      userName: 'zhangsan',
      nickName: '张三',
      gender: 1 // 男
    }
  }

  if (userInfo === null) {
    ctx.body = {
      errno: -1,
      msg: '登录失败'
    }
    return
  }

  ctx.body = {
    errno: 0,
    data: userInfo
  }
})
```

- 返回token加密后的用户数据

1. 安装依赖

```txt
cnpm i koa-jwt jsonwebtoken --save
```

> jsonwebtoken用于加密，koa-jwt用于检验token。

2. 使用

```js
- conf/constants
// 设置密匙，用于加密、解密
module.exports = {
    SECRET: 'XXC'
}
```



```js
- app.js

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt')

const index = require('./routes/index')
const users = require('./routes/users')

const { SECRET } = require('./conf/constants')

......

// 检验客户端发送的请求是否携带token
app.use(jwtKoa({
  secret: SECRET	// 个人理解：检验时需要配置密匙是为了防止第三方不合法token。
}).unless({
  path: [/^\/users\/login/]   // 自定义哪些请求忽略 jwt 验证。除外的请求如果未带token会返回401错误
}))

......


module.exports = app

```



```js
- src/routes/user.js

const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../conf/constants')

router.prefix('/users')

// 模拟登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body

  let userInfo
  if (userName === 'zhangsan' && password === 'abc') {
    // 登录成功，获取用户信息。模拟数据库
    userInfo = {
      userId: 1,
      userName: 'zhangsan',
      nickName: '张三',
      gender: 1 // 男
    }
  }

  // 加密 userInfo
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' }) //expiresIn表示过期时间
  }

  if (userInfo === null) {
    ctx.body = {
      errno: -1,
      msg: '登录失败'
    }
    return
  }

  ctx.body = {
    errno: 0,
    data: token
  }
})

module.exports = router
```

未携带token结果：

![image-20210906180306325](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210906180306325.png)

### 28.jwt-获取用户信息

1. 首先通过login接口，来获取服务端生成并返回给客户端的接口

![12](D:\Users\89404\Pictures\temp\12.jpg)

2. 访问时，通过设置请求头：Authorization：Bearer token值。来避免token校验失败及用于解析token获取用户数据
3. 解密token

```js
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
// util是nodejs内置的一个模块
const util = require('util')
// util.promisify将返回一个Promise
const verify = util.promisify(jwt.verify)
const { SECRET } = require('../conf/constants')

router.prefix('/users')

......

// 获取用户信息
router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    // 后端通过解析token获取到用户信息
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      userInfo: payload
    }
  } catch (ex) {
    ctx.body = {
      errno: -1,
      userInfo: 'verify token failed'
    }
  }
})

module.exports = router

```

此时，访问getUserInfo，便可以获得解密后返回的用户信息（加上了过期时间）

![image-20210906182425529](C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210906182425529.png)

- jwt vs session

为了解决：登录&存储登录用户的信息

jwt用户信息加密存储在客户端，不依赖cookie，可跨域

session用户信息存储在服务端，依赖cookie，默认不可跨域

一般情况下，两者都能满足。大型系统中两者可共用

jwt更适合于服务节点较多，跨域比较多的系统

session更适合于统一的web服务，server要严格管理用户信息（可以随时删除用户。而jwt用户信息未过期则无法删除，除非该密钥）

