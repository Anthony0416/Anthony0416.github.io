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
#### 数据绑定



> bug：有些情景下，我们在初始化一个页面的时候不需要一张图，而后续需要根据用户的操作去展示一张图片，所以我们就会这么去写： `<img :src="imgurl"/>` ，然后我们在data里初始化：`imgurl =''`  。然后实际渲染的时候当我们通过this.imgurl赋值之后发现图并没有出现，F12查看源码发现img标签的src属性没了？？？解决办法就是我们初始化的时候不要给元素赋值为空，哪怕让它 = ‘#’ 也好，至少让它有效的占住位。

