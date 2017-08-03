vue & webpack

使用vue-cli构建项目的目录是酱紫：

```
├── build               // 项目 webpack 配置目录
├── config               // 项目 config 目录
├── dist               // 项目 npm run build 后产生的目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── components     // 组件，创建组件时需注意组件的命名格式
│   ├── views          //router 渲染的页面组件
│   ├── App.vue        // 顶层组件（但在该项目，初期不熟悉，把该顶层组件删除了，组件直接写在 index.html里面了，影响还未发现）
│   └── main.js        // Webpack 预编译入口
│   └── vuex.js        // vuex 配置，状态管理
│   └── router.js      // router 配置文件
├── static             // 不需要 webpack 打包的静态资源，可以用来放置绝对路径的文件
```

一般情况下我们会把图片放在assets文件夹中，官方确实也是这么做的。但是请注意这样只对html和css有效，因为这里面的路径会经过url-loader进行转换为打包后的路径。

如果你需要在js中操作图片的地址，请务必将图片放在static文件夹中，路径写为 `'static/xx'` 即可。因为static中的文件无需打包，所以路径也不会有任何变化，所以这里直接写打包后的路径即可，不确定路径的话可以先打包一下看看哦~