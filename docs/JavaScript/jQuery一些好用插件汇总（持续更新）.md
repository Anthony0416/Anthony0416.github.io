## jQuery一些好用插件汇总（持续更新）

### 滚动条插件

中文简版 -- [jQuery滚动条插件-jQuery custom content scroller](http://www.jq22.com/jquery-info124) 

英文原版 -- [jQuery custom content scroller](http://manos.malihu.gr/jquery-custom-content-scroller/)

用法很简单，文中给了两个使用方法，这里建议使用js来动态绑定。因为这个滚动条一旦插入dom就不会随着你文档的高度而变化，所以当目标内容高度变化的时候需要重新绑定一次。

<u>jQuery版本不低于1.9.1</u>



### 图片缩放插件

[jQuery支持图片放大缩小查看效果](http://www.lanrenzhijia.com/jquery/3030.html)

下载下来的是一个demo，在它基础上改成自己的样式即可。但是这里需要注意几点：

如果你的放大缩小模块在页面加载的时候是隐藏的，请使用 `visibility: hidden` 去隐藏它，不然会导致js找不到元素而初始化失败。

如果你需要在调出来缩放后继续隐藏，请使用 `display: none` ，否则放大的图片不能被同时隐藏掉而留在你的页面上。

<u>jQuery版本不低于1.11.0</u>

后来我在使用这个插件的时候遇到一个需求，在图片放大后可以使用画笔在图片上涂抹。但是这和插件本身放大后的拖动事件相冲突。查看原来的网站发现并没有任何的说明。后来在Github上找到了它的源码[smartJQueryZoomExt](https://github.com/litslink/smartJQueryZoomExt) 查看文档发现并没有暴露方法出来。



### jCanvas

website: [jCanvas](https://projects.calebevans.me/jcanvas/)  docs: [jCanvas-docs](https://projects.calebevans.me/jcanvas/docs/)

这是一款基于jQuery和canvas的插件。使用该插件，我们就可以像使用jQuery一样方便的操纵canvas，而不需要复杂冗余的原生指令。该插件语法简练，简单几行就可创建canvas对象并且支持事件，可以方便的操纵canvas元素。



