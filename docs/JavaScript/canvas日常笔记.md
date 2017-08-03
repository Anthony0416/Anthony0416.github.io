## canvas技巧小结

### canvas图片问题

最近一个项目需要对图片进行涂鸦，于是采用了canvas来解决。最开始天真的以为把图片设为canvas背景即可，但是后来发现设为background的图片在导出canvas绘图的时候没有一并导出。然后使用了drawImage把图片放到画布上，却发现出不来？！

后来找到原因出在加载这里，因为浏览器加载图片是异步加载，在图片没有加载到的情况下执行drawImage，画布中当然什么都没有。于是在原有代码的基础上加了onload就解决了。附上解决后代码：

```
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var img = new Image();
img.src = 'images/z.jpg';
img.onload = function() {
	ctx.drawImage(img,0,0)
};
```

后来发现这并不是好的解决办法，图片放进canvas之后在使用橡皮功能（`resetEraser()`）可以擦去画布内的一切，包括我放进去的图片。

最后决定结合background和canvas来解决。首先在获取到图片后将图片设为canvas的background，然后在canvas内随意涂鸦，当保存时先导出canvas内容，然后再将获取到的图片放进canvas中，再放入导出的canvas涂鸦，最后合成一张图片导出。附上代码：

```
var img = new Image();
var l = $('#canvas').css('background-image').length;
img.src = $('#canvas').css('background-image').substring(5,l-2);
var imgs = new Image();
imgs.src = this.canvas.toDataURL();
img.onload = function() {
	// 保证图片加载后才放到画布中
	ctx.drawImage(img,0,0,512,512) 
	ctx.drawImage(imgs,0,0,512,512)
	// ==============保存图片===========
	Output = canvas.toDataURL();
};
```



### canvas大小问题

在之前的一个项目中，我通过获取后台图片的宽高用js给canvas重置宽高。但是后续发现在canvas内的涂鸦全被放大并且有不同程度的位置跑偏。

原来canvas有一个默认宽高为300px * 150px ，如果在canvas标签内使用height，width给canvas重设高度，则canvas的宽高为你设定的宽高。

```
<canvas height='500' width='600'></canvas>
```

但是如果使用css的height，width给canvas重设宽高，那么canvas则在原来300*150的基础上缩放到你所设定的宽高（js给canvas设宽高也是通过css样式设置，所以效果一样，包括内联样式style的height，width也是同样效果）。

并且canvas的宽高只能设置一个数组，默认为px，不能使用百分比，rem等，即使设了也不认单位只认数字。



### canvas绘制虚线框

最近做的项目中有一个需求，需要在canvas中绘制一个框来标出重要的部分，有些是实线框，有些是虚线框。聊需求的时候我以为蛮简单的，但是在实际处理中我发现canvas根本没有线型的参数，一条虚直线都画不了，跟别提虚线框了T_T

换个角度，既然可以画线条，那就可以画很多短线条连起来不就是虚线吗，四条虚线闭合不就是虚线框了。于是我找到了这样一个canvas下绘制虚线的算法：[canvas 绘制虚线](http://blog.sina.com.cn/s/blog_6d0dc2a90102vcd4.html) ，实际使用我发现有点不太方便，遂加了小小的改进。

```
// 画虚线函数 8个值为canvas，起点坐标x1，y1，终点坐标x2,y2，虚线宽度, 线粗细, 颜色
function drawDashedLine(ctx, x1, y1, x2, y2, dashLength ,lineWeight ,lineColor) {
	dashLength = dashLength === undefined ? 5 : dashLength;
	var deltaX = x2 - x1;
	var deltaY = y2 - y1;
	var numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);
	for(var i = 0; i < numDashes; ++i) {
		ctx[i % 2 === 0 ? 'moveTo' : 'lineTo'](x1 + (deltaX / numDashes) * i, y1 + (deltaY / numDashes) * i);
	}
	ctx.lineWidth = lineWeight;
	ctx.strokeStyle = lineColor;
	ctx.stroke();
};
```

这样就可以使用drawDashedLine()来绘制各种虚线了。为了实际使用的方便，我这里又封装了一个绘制虚线框的函数来简化整个绘制过程：

```
// 画虚线框函数 3个值为起点坐标，框的宽度,间隔,粗细
			function drawDashedBorder(x ,y ,size){
				var cxt = document.getElementById('img').getContext('2d');
				var x1 = x;
				var x2 = x + size;
				var y1 = y;
				var y2 = y + size;
				cxt.beginPath();
				drawDashedLine(cxt,x1,y1,x2,y1,2,1,'red');
				drawDashedLine(cxt,x2,y1,x2,y2,2,1,'red');
				drawDashedLine(cxt,x2,y2,x1,y2,2,1,'red');
				drawDashedLine(cxt,x1,y2,x1,y1,2,1,'red');
				cxt.closePath();
			}
```



### canvas之半透明

在项目中，我们有时候需要吧canvas中的内容变成半透明的，如果只是绘制一个点，线，面，我们在指定颜色的时候就可以使用rgba来改变透明度，但是如果要把图片变透明呢？我这里找到了两种方法供大家参考：

1，ctx.globalAlpha = 0.5; 

这样做可以让canvas中的所有元素直接变成半透明，但问题也在这里，如果我只是让某张半透明其他正常那就不行了；

2，对图像进行像素级处理

我们在把图片绘制到canvas里面之后，再使用ctx.getImageData(offsetX, offsetY, getImgWidth, getImgHeight);函数就可以把指定区域内的数据取出来，打印可以看到取出的是一组数字，这其实是每个像素点的颜色信息，每一个像素点都被转换成了rgba四个颜色值，我们可以遍历这组数据，把每四个数字的最后一个数字乘以0.X就可以实现透明度的变换，最后再ctx.putImageData(imgageData, startX, startY); 但是这样做效率太慢，有待优化。

更多好的方法，期待你的方案：csw0416@hotamil.com