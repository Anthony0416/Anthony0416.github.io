## vue + weixin-js-sdk

vue开发移动端页面是一件再平常不过的事情，但是既然是移动端就免不了涉及到微信开发。微信官方文档对js-sdk的使用是这样说的：

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
> （直接在浏览器输入即可获取，提示{"errcode":40164,"errmsg":"invalid ip XXX.XXX.XX.XX, not in whitelist hint: [***********]"}则需要将你的IP加入到公众号开发配置的白名单中）
>
> 2，用上面获取到的access_token获取jsapi_ticket
>
> https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
>
> 3，拿到ticket之后生成JS-SDK权限验证的签名了。
>
> 我们为什么要知道这些呢，在微信js-sdk的调用中，微信对于安全的把控是十分严格的，签名的错误会导致sdk无法调用。签名的生成和验校需要jsapi_ticket(也就是上面第二步拿到的ticket)、nonceStr、timestamp、url四个值共同计算，其中任何一个的不同都会导致签名不同，从而无法调用sdk。为了排除签名错误导致的问题，微信官方给出了 [微信 JS 接口签名校验工具](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign) ，我们可以直接在这个页面上进行签名的验校，排除异常（甩锅给后台）。



####  开发

首先先来看官方文档：

> **步骤三：通过config接口注入权限验证配置**
>
> 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复）。
>
> wx.config({
>
> ​    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
>
> ​    appId: '', // 必填，公众号的唯一标识
>
> ​    timestamp: , // 必填，生成签名的时间戳
>
> ​    nonceStr: '', // 必填，生成签名的随机串
>
> ​    signature: '',// 必填，签名，见附录1
>
> ​    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
>
> });

划重点：<u>同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用</u> 

那么什么是同一个url呢，经过我的测试我发现，微信在使用url生成签名的时候会读到?后面的参数一并进行计算，但是vue-router中hash模式#后的内容却不读。所以只要两个url中第一个#前面的内容一样，即可视为他们是同一个url，他们生成的签名是一样的。

所以如果你是用hash模式，你只需要在App.vue中调用一次wx.config，将所有需要的api在jsApiList中声明，即可全局调用api而无需二次调用。

但是如果你使用history模式，除了需要服务器的配置之外，每个vue组件内都需要从后端取一次签名，调用config之后才可以使用api。

我的项目前端使用hash模式，后端使用了TP框架，config的参数在index.html中取到并存进了localStorage中：

```
localStorage.w_appId = '{$signPackage["appId"]}';
localStorage.w_timestamp = '{$signPackage["timestamp"]}';
localStorage.w_nonceStr = '{$signPackage["nonceStr"]}';
localStorage.w_signature = '{$signPackage["signature"]}';
```

所以在App.vue中直接取出即可：

```
<script>
  import wx from 'weixin-js-sdk'

  export default {
    name: 'app',
    mounted () {
      wx.config({
        debug: true, // 开启调试模式，true会alert所有api返回值
        appId: localStorage.w_appId, // 公众号唯一id
        timestamp: localStorage.w_timestamp, // 生成签名的时间戳
        nonceStr: localStorage.w_nonceStr, // 生成签名的随机串
        signature: localStorage.w_signature, // 签名
        jsApiList: [ // 需要使用的js列表
          'onMenuShareTimeline',
		  'onMenuShareAppMessage',
		  'onMenuShareQQ',
		  'onMenuShareWeibo',
		  'onMenuShareQZone'
        ]
      })
    }
  }
</script>
```



#### 图片相关

项目中需要使用图片上传，干脆直接调微信sdk吧，照着开发文档在methods里写：

```
chooseImages () {
  const _this = this
  wx.chooseImage({
    count: 1, // 选择图片张数
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 图片来源
    success: function (res) {
      // 渲染图片
      _this.imgUrl = res.localIds[0]
      if (window.__wxjs_is_wkwebview) { // 兼容苹果
        wx.getLocalImgData({
          localId: _this.imgUrl, // 图片的localID
          success: function (res) {
            _this.chooseImg = res.localData 
            // localData是图片的base64数据，可以用img标签显示，ios系统必须使用base64显示
          }
        })
      } else {
        _this.chooseImg = _this.imgUrl
      }
    }
  })
},
```

> 这里我特别想吐槽腾讯的文档，我照着写的localIds，没错啊，但就是不行。后来debug才发现中间两个ll第一个是小写L第二个是大写I ！想杀人有没有！

然后是上传到微信服务器：

```
      submit () {
        const _this = this
        wx.uploadImage({
          localId: _this.imgUrl,
          isShowProgressTips: 100,
          success: function (res) {
            let serverId = res.serverId // 返回图片的服务器端ID
            // 发送给后台
            axios.post('url', {
              images: serverId
            }).then(
              function (response) {
                // 回到提交成功页面
                _this.$router.push('/finish')
              }
            ).catch(function () {
              _this.$vux.toast.show({
                text: '上传失败，请稍后再试！',
                time: '2000',
                type: 'text',
                width: '2rem',
                position: 'middle'
              })
            })
          }
        })
      }
    }
```

> 这里需要注意，上传微信服务器的 `localId` 必须是 `wx.chooseImage()` 返回的res.localIds，不能是`wx.getLocalImgData()` 返回的base64。

微信在调取 `wx.uploadImage()` 接口会默认有一个正在上传图片的loading，我们就不需要处理了。 