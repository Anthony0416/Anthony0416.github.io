## ios的一些坑

#### overflow问题

实际上，Safari真的用了原生控件来实现，对于有-webkit-overflow-scrolling的网页，会创建一个UIScrollView，提供子layer给渲染模块使用。只使用`overflow:scroll;` 页面的滚动会很不流畅，所以最好使用`-webkit-overflow-scrolling: touch;` 。

而因为是原生控件，则会无视overflow:hidden; ，解决方法是给需要停止滚动的元素加上`overflow:hidden;` 的同时加上`position:fixed; height:100%; width: 100%;`。

#### 事件委托

个人习惯把事件绑定在body上，再委托给对应的元素，这样页面的改动就不会影响到事件。

但是ios不允许将事件绑定在document上，所以只能选择一个相对稳定的父元素来绑定事件。

