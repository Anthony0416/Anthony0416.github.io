jQuery i18n国际化

最近需要给一个现有网站做国际化处理，拿到代码看了下发现是jq+bootstrap，遂找基于jq的i18n国际化插件。这里对国际化处理及踩坑做下记录。

首先引入需要的插件：[jquery.i18n.properties.js](https://github.com/jquery-i18n-properties/jquery-i18n-properties) （英文文档及文件），中文文档参考[这里](http://blog.csdn.net/u013982839/article/details/61203138) 。

从github下载所需js引入页面，然后我们创建一个名为language.js的文件作为国际化的配置文件。该配置文件主要用于操作cookies，查找写入语言包，切换语言等操作。

```
// language.js
/**
 * cookie操作
 */
var getCookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var s = [cookie, expires, path, domain, secure].join('');
        var secure = options.secure ? '; secure' : '';
        var c = [name, '=', encodeURIComponent(value)].join('');
        var cookie = [c, expires, path, domain, secure].join('')
        document.cookie = cookie;
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/**
 * 获取浏览器语言类型
 * @return {string} 浏览器国家语言
 */
var getNavLanguage = function(){
    if(navigator.appName == "Netscape"){
        var navLanguage = navigator.language;
        return navLanguage;
    }
    return false;
}

/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "zh-CN";

/*
设置一下网站支持的语言种类
 */
var webLanguage = ['zh-CN', 'zh-TW', 'en'];

/**
 * 执行页面i18n方法
 * @return
 */ 
var execI18n = function(){
    /*
    获取一下资源文件名
     */
    var optionEle = $("#i18n_pagename");
    if (optionEle.length < 1) {
        console.log("未找到页面名称元素，请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
        return false;
    };
    var sourceName = optionEle.attr('content');
    sourceName = sourceName.split('-');
    /*
    首先获取用户浏览器设备之前选择过的语言类型
     */
    if (getCookie("userLanguage")) {
        i18nLanguage = getCookie("userLanguage");
    } else {
        // 获取浏览器语言
        var navLanguage = getNavLanguage();
        if (navLanguage) {
            // 判断是否在网站支持语言数组里
            var charSize = $.inArray(navLanguage, webLanguage);
            if (charSize > -1) {
                i18nLanguage = navLanguage;
                // 存到缓存中
                getCookie("userLanguage",navLanguage);
            };
        } else{
            console.log("not navigator");
            return false;
        }
    }
    /* 需要引入 i18n 文件*/
    if ($.i18n == undefined) {
        console.log("请引入i18n js 文件")
        return false;
    };

    /*
    这里需要进行i18n的翻译
     */
    jQuery.i18n.properties({
        name : sourceName, //资源文件名称
        path : 'i18n/' + i18nLanguage +'/', //资源文件路径
        mode : 'map', //用Map的方式使用资源文件中的值
        language : i18nLanguage,
        callback : function() {//加载成功后设置显示内容
            var insertEle = $(".i18n");
            console.log(".i18n 写入中...");
            insertEle.each(function() {
                // 根据i18n元素的 name 获取内容写入
                $(this).html($.i18n.prop($(this).attr('name')));
            });
            console.log("写入完毕");

            console.log(".i18n-input 写入中...");
            var insertInputEle = $(".i18n-input");
            insertInputEle.each(function() {
                var selectAttr = $(this).attr('selectattr');
                if (!selectAttr) {
                    selectAttr = "value";
                };
                $(this).attr(selectAttr, $.i18n.prop($(this).attr('selectname')));
            });
            console.log("写入完毕");
        }
    });
        
}

/*页面执行加载执行*/
$(function(){

    /*执行I18n翻译*/
    execI18n();

    /*将语言选择默认选中缓存中的值*/
    $("#language option[value="+i18nLanguage+"]").attr("selected",true);

    /* 选择语言 */
    $("#language").bind('change', function() {
        var language = $(this).children('option:selected').val()
        console.log(language);
        getCookie("userLanguage",language,{
            expires: 30,
            path:'/i18n'
        });
        location.reload();
    });
});
```

然后创建语言包，我这边是吧每个语言的语言包单独放在一个文件夹中，文件夹以语言名来命名，路径在language.js配置文件115行path中进行配置。语言包文件后缀为properties。

```
// zh-CN/common.properties
stats=统计
dashboard=仪表盘
// en/common.properties
stats=Stats
dashboard=Dashboard
```

使用。我们在页面中引入jquery.js, jquery.i18n.properties.js, language.js三个js文件，然后在html头部加上meta标签来设定语言包包名。

```
<meta id="i18n_pagename" content="common">
```

这里content只需写包名，他就会自动去寻找对应的common.properties文件，多个语言包可以使用 `-` 连接。

最后在需要多语言的地方加上 `<label class="i18n" name="stats"></label>` 即可，实际渲染这里就会被渲染成stats的对应语言。

踩坑

因为jquery.i18n.properties.js需要使用cookies，每个cookies都会有一个path，这个path在language.js最下方的函数中可以修改，在实际开发和上线过程中，我们需要根据具体情况设置对应的path，不然会导致语言包的路径解析错误。

##### 