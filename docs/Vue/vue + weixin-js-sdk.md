## vue + weixin-js-sdk

vue+vux开发移动端页面是一件再平常不过的事情，但是既然是移动端就免不了涉及到微信开发。微信官方文档对js-sdk的使用是这样说的：

> 在需要调用JS接口的页面引入如下JS文件，（支持https）：http://res.wx.qq.com/open/js/jweixin-1.2.0.js
>
> 备注：支持使用 AMD/CMD 标准模块加载方法加载

？？？在备注中一句支持带过，跟不说有什么区别啊摔(╯°Д°)╯︵┻━┻

看来万事还得靠自己┐(￣ー￣)┌

==========================我是万能的分割线========================

如果你是这样使用vue的

```
<script href='https://unpkg.com'></script>
```

出门左转去看[微信官方文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)，慢走不送_(¦3」∠)_

==========================我是万能的分割线========================

大致网上搜了下，发现很多人都是下载微信的js文件，然后用各种奇怪的方法引入。其实npm上已经有[weixin-js-sdk](https://www.npmjs.com/package/weixin-js-sdk)，我们直接安装引入即可：

```
npm install weixin-js-sdk
```





#### 开始之前

由于微信对安全把控比较严格，在请求之前都需要使用wx.config注入配置信息，配置信息由后端返回。

关于这一堆信息，微信官方文档有相应的说明，不过有点残缺，这里补充一下，不感兴趣的可以跳过。

> 1，获取access_token，链接中的APPID和APPSECRET可以在公众号中获取
>
> https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
>
> 2，用上面获取到的access_token获取jsapi_ticket
>
> https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
>
> 3，拿到ticket之后生成JS-SDK权限验证签名

 

