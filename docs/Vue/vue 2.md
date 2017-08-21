## vue 2 

#### vue实例

官方文档：[ vue-api ](https://vuefe.cn/v2/api/) 

我这里列举一些常用的：

name：组件名

```
name: 'home',
```

data：数据

```
data () {
  return {
    title: 'hello world！'
  }
}
====================
this.title   // => hello world!
```

props：子组件中声明父组件传递来的数据

```
props: ['text']
====================
this.text   // => name (父元素中<compontent ：title = 'name'></compontent>)
```

components：声明使用的组件

```
import { Toast, Loading } from 'vux'
// 声明的组件都需要现在script标签内引用
components: { Toast, Loading }
```

methods：方法，通常用于事件绑定

```
methods: {
  submit () {
    alert('提交成功！')
  }
}
```


computed：计算属性

```
data: { a: 1 },
computed: {
  // 仅读取，值只须为函数
  aDouble: function () {
    return this.a * 2
  }
}
this.a       // => 1
this.aDouble // => 2
this.a       // => 2
this.aDouble // => 4
```

watch：监听数据变化

```
data：{ a: 1 }，
watch: (
	a: function (val, oldVal) {
      console.log(val, oldVal)
	}
)
this.a = 2   // => 2, 1
```

mounted：生命周期方法，页面（组件）载入后执行

```
mounted () {
  let clientHeight = window.innerHeight
  this.minHeight = clientHeight
},
```





#### 生命周期

官方文档：[选项-生命周期钩子](https://vuefe.cn/v2/api/#选项-生命周期钩子)

![vue-life](https://vuefe.cn/images/lifecycle.png)

vue的生命周期分为如下阶段

**beforeCreate** 实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用

**created** 实例已经创建完成之后被调用

**beforeMount** 在挂载开始之前被调用，相关的 `render` 函数首次被调用

**mounted** `el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子

**beforeUpdate** 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前

**updated** 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子

**activated** keep-alive 组件激活时调用

**deactivated** keep-alive 组件停用时调用

**beforeDestroy** 实例销毁之前调用

**destroyed** Vue 实例销毁后调用

我们用的最多的就是mounted，它的作用相当于js中的window.onload。



#### 子组件

由于子组件的特殊性，如果想在子组件上使用原生事件，比如click事件，常规的@click方法并不能生效，而必须写为@click.native



#### 使用sass

其实sass/scss,less和css差不多，但是结构比较清晰(*/ω＼*)

废话不多说，既然要用，首先就要安装sass-loader，不然浏览器可看不懂哦：

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

vue的数据绑定只有一个模式：双花括号里面放上data的对象名：

```
<p>{{title}</p>

data: {
  title: 'hello world!'
}

// => <p>hello world!</p>
```

如果你要使用字符串和变量混合，很简单，写在花括号外面就可以了：

```
<p>title：{{title}</p>    // =>  <p>title： hello world!</p>
```



#### 属性绑定

##### class

class的绑定分为以下情况：

1：只有一个样式：使用单花括号：

```
<div :class='{ red }'></div>

data: {
  show: true,
  red: redText
}
//  =>  <div class='redText'></div>
```

2，多个样式：使用中括号：

```
<div :class='[ show, red ]'></div>

data: {
  show: pic,
  red: redText
}
//  =>  <div class='pic redText'></div>
```



```
<div :class='[{title: show}, show?block:none, red]'></div>

data: {
  show: true,
  red: red
}
//  =>  <div class='title block red'></div>
```



##### style

```

```

##### 其他

```

```

> bug：有些情景下，我们在初始化一个页面的时候不需要一张图，而后续需要根据用户的操作去展示一张图片，所以我们就会这么去写： `<img :src="imgurl"/>` ，然后我们在data里初始化：`imgurl =''`  。然后实际渲染的时候当我们通过this.imgurl赋值之后发现图并没有出现，F12查看源码发现img标签的src属性没了？？？解决办法就是我们初始化的时候不要给元素赋值为空，哪怕让它 = ‘#’ 也好，至少让它有效的占住位。

