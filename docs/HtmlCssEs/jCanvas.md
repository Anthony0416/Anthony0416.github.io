## jCanvas

jCanvas给canvas加入了层(layer)的概念，使得我们可以很容易的创建一个图层以及像操作jQueryDom一样操作该图层。

> 可能canvas也有图层，原谅我浅薄无知，目前我在各大论坛知乎上看到关于canvas图层的解决方案都是利用多个canvas叠加来实现画布的效果。

获取一个图层有两个方法，一是使用该层的索引，这个只适合简单和情况，复杂情况下我们最好预先给每个层定义一个唯一的id，方便后面获取和操作。

> tip：每一个layer的name都是唯一的，重复会导致后面的layer无法正常创建，且不会抛出任何异常。

对layer进行操作之需要调用drawLayers()进行重绘才可看到效果。

clearLayer().drawLayer() 可以直接清除所有层。