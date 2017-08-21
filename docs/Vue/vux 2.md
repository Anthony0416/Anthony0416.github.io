## vux 2

vux是基于vue+weui+webpack打造的一款移动端ui库，集成了大量我们常用的组件，可以方便调用，省去很多的界面编写时间而让而开发者更专注于功能。

老规矩，先上官网：[vux.li](https://vux.li/#/zh-CN/README)

#### 使用vux

1，如果你的项目还没开始，那么可以直接使用vux官方模板创建项目

```
npm install -g vue-cli 或 yarn global add vue-cli
vue init airyland/vux2 projectPath
cd projectPath
npm install 或 yarn
npm run dev 或 yarn start
```

2，在现有项目中使用vux

安装vux

```
npm install vux --save 或 yarn add vux（注意，使用yarn安装的是0.X版本的vux，安装完后需要使用yarn upgrade vux更新至2.X）
```

安装vux-loader   2.X版本必须配合vux-loader使用

```
npm install vux-loader --save-dev 或 yarn add vux-loader --dev
```

检查你的package.json文件，是否存在vue-style-loader，css-loader，less，less-loader。这四个依赖为vux-loader打包必须包，请确保你的项目中有它们，如果没有，请添加并安装。

> 这里有个坑，因为vux使用了less，但是当你的项目中没有less和less-loader的时候，它会反反复复提醒你缺少css-loader和vue-style-loader，即便它们已经存在。当如果vux报错了，请检查less，less-loader，css-loader，vue-style-loader是否缺少。

安装完成后打开项目中/build/webpack.base.conf.js
最上方引入vux-loader模板

```
const vuxLoader = require（'vux-loader'）
```

修改项目中的module.exports为const.webpackConfig  修改后的文件如下

```
const webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
  ... ...
```

在webpack.base.conf.js最后追加如下代码：

```
module.exports = vuxLoader.merge(webpackConfig,{
  options: {},
  plugins: [{
    name: 'vux-ui'
  }]
})
```

保存在控制台启动项目服务器，成功打开页面并在控制台输出如下即为配置成功：

```
[VUX] 提 Issue 时麻烦附上以下版本信息以及必要的显示截图、重现步骤、代码(代码请不要截图)。 
[VUX] vux@2.5.4, vux-loader@1.1.4, webpack@2.7.0, node@7.2
[VUX] 建议反馈请访问 https://github.com/airyland/vux/issues
```



#### 修改vux默认样式 

在引入vux组件后，如果需要修改默认样式，你可以在浏览器的调试模式下找到对应标签的类名，在对应vue的组件中进行重写。

> 注意，请确保重写样式的 `<style>` 标签不存在scoped属性，该属性会影响样式的覆盖。