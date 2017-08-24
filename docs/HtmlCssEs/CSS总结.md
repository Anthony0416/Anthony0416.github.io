## CSS总结 

### cursor

一般使用鼠标样式都是默认的那么几个，这次项目中需要使用自定义样式。我蛮以为很简单的，把样式切成图url引进去就可以了，但是我这么写了之后发现不生效？？？

```
cursor: url("../images/pen.png");
```

又跑去查看文档，没错啊，自定义就是url引进去就可以了啊。然后百度，有人说部分浏览器不支持png的鼠标样式，然后我就给转成了cur格式。可是鼠标依然是箭头？？？

后来发现有人会在url后面加一些参数，我又跑去看w3c的cursor文档，还是没找到相关的用法，然后死马当活马医就在url后面加个auto，诶，居然成功了~

```
cursor: url("../images/pen.cur") auto;
```



### 纯css实现图片居中剪裁

```
background-image: url(1.jpg);
background-repeat: no-repeat;
background-attachment: fixed;
background-position: center;
background-size: cover;
```



### css实现邮票边

```
background: radial-gradient(transparent 0, transparent 5px, #F39B00 5px);
background-size: 15px 15px;
background-position: 9px 3px;
```

