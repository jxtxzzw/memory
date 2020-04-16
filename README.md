# memory

> 我们可以共享所有记忆的最佳存储空间

## Build Setup

``` bash
# install dependencies
$ npm run install

# rename .env-sample to .env
mv .env-sample .env

# set environment variables
vim .env

# initialize the database
npm run init-db

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

一个基于 Vue + nuxt.JS 的内容分享系统，包含内容推荐、用户分享、讨论区等。

由于本项目是本科课程“现代软件工程”的一个任务，所以较多涉及了数据库交互、触发器等，在用户管理模式上从简了，也不涉及 refresh token，只做了简单的 session 和 JWT。

项目设计初衷为与二三好友之间互相安利精彩的小说、音乐等，因此虽然本项目可以一键部署运行，但建议根据个人需求进行修改和二次开发后再使用。

无论如何，对于想要熟悉 Web 设计、JavaScript、前后端交互、Vue.js、 Nuxt.js、数据库管理（ORM） 的用户，这是一个不错的仓库，非常适合初学者提升自己的项目经历。

A content sharing system based on Vue + nuxt.js, including content recommendation, user sharing, discussion area, etc.

As this project is a task of the undergraduate course "modern software engineering", it mainly involves database interaction, triggers, etc. It is simplified in the user management mode and does not involve refresh token, and only does simple session and JWT.

The original design of the project is to share wonderful novels, music, etc., with several friends, so although this project can be deployed and run easily, it is recommended to modify according to personal needs and secondary development before use.

In any case, for those who want to become familiar with Web design, JavaScript, front-end interactions, vue.js, nuxt.js, database management (ORM), this is a great repository for beginners to enhance their project experience.

