# unirDemo
这是一个三端统一的Demo工程，完全本地打包，基于RN开发，融合了RN的expo框架，以及阿里的remax框架，引入了我们的开源组件库@qnpm/rn-remax-mirror

项目目录结构
```
unirDemo
├── App.js
├── App.web.js
├── README.md
├── app.json
├── assets
│   ├── favicon.png
│   ├── icon.png
│   └── splash.png
├── babel.config.js
├── mini.project.json
├── package.json
├── project.config.json
├── public
│   ├── icon.png
│   └── index.html
├── remax.config.js
├── src
│   ├── Components
│   ├── app.config.js
│   ├── app.css
│   ├── app.js
│   └── pages
├── tree.md
├── webpack.config.js
└── yarn.lock

```

## 启动流程

---
### 1、安装依赖
```
yarn
```
### 2、运行dev环境
```
yarn dev         //RN环境
yarn dev:wx      //微信小程序，需要用小程序IDE打开./dist/wechat目录进行调试开发  
```
### 参考文档：

---
remax  
- [官网](https://remaxjs.org/)
- [github地址](https://github.com/remaxjs/remax)
expo
- [官网](https://docs.expo.io/)
---
