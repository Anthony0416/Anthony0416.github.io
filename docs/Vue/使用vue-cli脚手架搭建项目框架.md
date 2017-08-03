## 使用vue-cli脚手架搭建项目框架

首先确保系统中安装node.js 4.x以上版本，npm 3.x以上版本

安装vue-cli脚手架构建工具：`cnpm install -g vue-cli`

### 使用vue-cli创建项目模板

1.打开控制台进入项目存放目录，这里以项目存储路径为D:\git\ 为例

2.创建项目模板，其中webpack为模板类型，vue-model为项目名称

`vue init webpack vue-model` 

建议使用更全的webpack模板，如果你自是用于小项目或单个页面的开发，可以使用webpack-simple

创建成功后，将在git文件夹下看到vue-model文件夹，这就是vue-cli帮我们搭建的项目模板

3.安装所有依赖

`npm install` or `yarn`

> 附npm和yarn换源：
>
> ​	npm install --registry=https://registry.npm.taobao.org
>
> ​	yarn config set registry https://registry.npm.taobao.org

4.执行项目

`npm run dev` or `yarn start`

在模板中，有两个已经配置好的命令可以执行，一个是dev用作项目开发，一个是build用作生产环境，配置代码在package.json文件中的script属性。
执行成功后，浏览器自动打开http://localhost:8080/，并且支持热更新。

5.项目打包

`npm run dist` or `yarn build`

打包后会在项目中生成dist文件夹，复制里面的文件到服务器即可发布。


