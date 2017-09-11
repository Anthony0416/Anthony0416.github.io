## vue与后端数据交互

vue作为一个前端框架，避免不了要与后端进行通讯，然而vue自身并不具有这个能力，这时候就需要其他插件来实现了。虽然还有恋旧的人使用jq的ajax与vue混用，不过我们并不建议这样，就目前我个人实践来看，jq与element-ui冲突，这样混用存在很多的风险，这里我推荐下面两种方法：

#### vue-resource

vue-resource是vue1.*时代官方推崇的方法，但是到了vue2的时代，官方不在维护vue-resource，转而推荐axios。vue-resource也被提出了vue全家桶，不过，如果它依然可以使用。

#### axios

axios在官方的推崇下，现在为主流的vue数据交互插件。现在有两个版本，分别是axios和axios2，个人感觉差别不大，都可以使用。

首先是安装：

```
npm install axios --save  或  npm install axios2 --save
```

使用的话有两种方法，大家按自身需求配置：

全局配置

在main.js中将axios挂到vue下，其他无需import就可以直接`this.$axios`调用

```
-------main.js------
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios = axios
------其他文件-------
this.$axios.get('xxxxx')
```

局部引用：

main.js不做任何配置，仅在需要的地方import，然后直接`axios`调用

```
------其他文件-------
import axios from 'axios'
axios.get('xxxxx')
```

下面都以局部引用为例

##### get

```
import axios from 'axios'
axios.get('url', {
    params: {
      ID: 12345
    }
}).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
});
```

##### post

传json格式数据：

```
import axios from 'axios'
axios.post('url', {
    firstName: 'Fred',
    lastName: 'Flintstone'
}).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
});
```

传application / x-www-form-urlencoded格式数据：

先安装qs：`npm install qs --save`

```
import axios from 'axios'
import qs from 'qs'
axios.post('url', qs.stringify({
    firstName: 'Fred',
    lastName: 'Flintstone'
})).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
});
```
### Jsonp

```
$ npm install jsonp --save
```

```
var jsonp = require('jsonp');

jsonp('http://www.example.com/foo', null, function (err, data) {
  if (err) {
    console.error(err.message);
  } else {
    console.log(data);
  }
});
```

#### 开发模式跨域问题

config => index => dev => proxyTable

```
proxyTable: {
      '/api': {
        target: 'http://120.135.135.159/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
```

main.js

```
Vue.prototype.HOST = '/api'
```

其中，taget是要访问的api的域名，配置完proxyTable后，若要访问'http://120.135.135.159/api/chicken/duck'，ajax里的url只需设为'/api/chicken/duck'(即绝对路径)即可，webpack会帮你把‘/api’下的请求转发至'http://120.135.135.159/api/chicken/duck'