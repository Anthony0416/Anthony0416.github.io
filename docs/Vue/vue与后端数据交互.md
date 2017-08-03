## vue与后端数据交互

vue作为一个前端框架，避免不了要与后端进行通讯，然而vue自身并不具有这个能力，这时候就需要其他插件来实现了。虽然还有恋旧的人使用jq的ajax与vue混用，不过我们并不建议这样，就目前我个人实践来看，jq与element-ui冲突，这样混用存在很多的风险，这里我推荐下面两种方法：

#### vue-resource

vue-resource是vue1.*时代官方推崇的方法

#### axios

axios现在最新版本是axios2