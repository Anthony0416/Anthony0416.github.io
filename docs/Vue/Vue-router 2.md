## Vue-router 2 

### 安装

这一点在vue-router的官方文档中已经写得很明确，这里不再赘述。

如果你自己构建项目，可以参考这里：[vue-router2 安装](https://router.vuejs.org/zh-cn/installation.html) ;

如果你是使用vue-cli初始化项目，项目中自带vue-router并已经做了简单的配置你可以在  src/router/index.js 中找到它并进行修改。

### 路由配置

安装之后需要进行相关配置，这里以vue-cli来简要介绍。

在router/index.js中配置路由信息，基础信息如下：

```
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello' 
import other from '@/components/other'
// @为全局变量，在build/webpack.base.conf.js中可以看到@为路径src
// 这里需要import所有需要做路由的页面

Vue.use(Router)
// 声明vue使用router

export default new Router({
// 实例化router
  mode: 'history',
  // 声明路由模式，默认为hash模式，我这里修改为history模式
  routes: [
  // 配置路由路径
    {
      path: '/',
      // 路径，域名后的路径信息eg：www.baidu.com/
      name: 'Hello',
      // 命名
      component: Hello
      // vue组件，对应上面import
    },
    {
      path: '/other/:id',
      // 带参路径，下面会有详细解释
      name: 'other',
      component: other
    }
  ]
})
```

更多详细配置信息参考 [Router构造配置](https://router.vuejs.org/zh-cn/api/options.html) 。
然后在main.js中使用该配置：

```
import Vue from 'vue'
import App from './App'
import router from './router'

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
  // 这里声明当前路径下的App.vue使用router/index.js配置信息
})
```



### router-view

 router-view是一个视图容器组件，该组件中承载当前路径的vue组件。上一小节中说到的App.vue中就有一个 `<router-view></router-view>` ，其中承载的内容根据浏览器中路径变化而变化。如当前路径为xxx.com/other，该容器中就是other.vue中的内容。

router-view允许嵌套，这一点将在下面详细介绍。

### router-link

vue-router使用 `<router-link></router-link>` 标签进行路径跳转，使用 `to` 属性指定目标地址：

```
eg：<router-link to='/home'>Home</router-link>  // 跳转到/home页面
```

这个标签在经过转义后会被替换为 `a` 标签，默认配置下 `class='router-link-active'` 。我们可以直接修改 `a` 标签的默认样式或者 `.router-link-active` 的样式来定义 `router-link` 的样式。

更多router-link的参数，参考这里[<router-link>](https://router.vuejs.org/zh-cn/api/router-link.html)

### 编程式导航

有些时候，我们希望页面在跳转前执行一些其他代码，比如save当前页面的数据。如果直接使用router-link标签，用户一点击立马就跳过去了，这显然不是我们想要的结果。这时候编程式导航就派上用场了。

我们在需要跳转的标签上绑定点击事件，在函数中使用 `this.$router.push('/')` 来进行跳转。

> 这里this为vue实例，如果你需要在闭包中使用this，请在外部将this赋值给其他参数： `const _this = this` 

### 路由传参

跨页面必然会需要传递些许参数，这里对vue-router的几种参数传递做个汇总：

1，第一种方法就是vue-router官方文档所介绍的动态路由匹配。

```
// router.js
{
  path: '/user_ifo/:id',
  name: 'userIfo',
  component: userIfo
},
```

这样的使用`/user_ifo/253`来跳转，传参可以直接 `this.$route.push({path: 'user_ifo', params: {id: 253}})` 甚至直接 `this.$route.push('user_ifo/253')` ，但是需要注意，如果没有另外配置/user_ifo的路由，那么不带参是会404的。

同理，多个参数就一直往后面加就行了：

```
// router.js
{
  path: '/user_ifo/:id/:data',
  name: 'userIfo',
  component: userIfo
},
```

路径：‘/user_ifo/253/something’

实际访问：‘/user_ifo’

参数: {id: 253, data: something}

甚至还能嵌套：

```
// router.js
{
  path: '/user_ifo/:id/:data',
  name: 'userIfo',
  component: userIfo,
  children: [
    {
      path: 'record/:time',
      component: record
    }
  ]
},
```

路径：‘/user_ifo/253/something/record/2017’

实际访问：‘/user_ifo/record’

参数: {id: 253, data: something, time: 2017}

html中直接 `{{$route.params.id}}` 即可，js中使用 `this.$route.params.id` 获取。

> 有一种说法是路由中可以不配置参数，这样直接使用 `<router-link :to='{name: 'user_ifo', params: {id: 253}}'>` 可以直接跳转，且路径中仅有/user_ifo，参数也能正常传递，但是如果刷新页面参数就没了。
>
> 

2，第二种方法是使用传统的 `?` 传参，这种方法无需对路由做任何配置，兼容性较强：

```
// router.js
{
  path: '/user_ifo',
  name: 'userIfo',
  component: userIfo
},
```

传： `this.$route.push({path: 'user_ifo', query: {id: 253}})`

取：`this.$route.query.id` 

### 附：SPA标题修改

我们经常会使用vue做spa，虽然spa的用户体验较好，但是毕竟自是一个单页面，页面的标题是不会变的。浏览器还好，如果在微信中访问，上方大大的标题一直不变让人看起来很不舒服。

当然解决办法也是有的，引用deboy大神的一篇blog：[教你在微信中给Vue单页应用设置标题](http://www.deboy.cn/set-wechat-title-in-vuejs-spa.html) 。而且为了方便，deboy发布了一个npm包：[vue-wechat-title](https://www.npmjs.com/package/vue-wechat-title)

原理的话，blog里面已经说得很清楚，我这里就简单说下怎么用吧。

首先肯定是安装：

```
npm install vue-wechat-title --save
```

然后在main.js中引入：

```
Vue.use(require('vue-wechat-title'))
```

在App.vue的 `<router-view>` 标签中加入指令：

```
<router-view v-wechat-title="$route.meta.title"></router-view>
```

最后，在路由配置中加入 `meta: { title = '***' }`:

```
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: '主页'
      },
      component: Home
    }
  ]
```

到这里就可以在浏览器中查看效果啦！

> Tip：微信web开发者工具中调试无效果，请在手机微信中查看！