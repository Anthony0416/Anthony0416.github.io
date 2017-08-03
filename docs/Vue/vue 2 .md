## vue 2 

#### script参数



#### 子组件

由于子组件的特殊性，如果想在子组件上使用原生事件，比如click事件，常规的@click方法并不能生效，而必须写为@click.native

#### 使用sass

个人感觉sass/scss,less和css差不多，但是结构比较好看(*/ω＼*)

废话不多说，既然想用，首先就要安装sass-loader，不然浏览器不承认哦：

```
npm install sass-loader --save-dev 或 yarn add sass-loader --dev
```

然后在webpack打包规则中添加如下代码：

```
{
  test: /\.scss$/,
  loaders: ["style", "css", "sass"]
},
```

最后再每个vue组件的style标签上声明语言：

```
<style scoped lang='scss'></style>
```