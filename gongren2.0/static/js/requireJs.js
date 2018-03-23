var cssUrl = {};
var jsUrl = {};
//TODO: 定义文件在html 显示
var dynamicLoadingUrl = {  
        css: function(path) { 
            if (!path || path.length === 0) {  
                throw new Error('argument "path" is required !'); 
            } 
            var head = document.getElementsByTagName('head')[0];    
            var link = document.createElement('link');    
            link.href = path;    
            link.rel = 'stylesheet';    
            link.type = 'text/css';    
            head.appendChild(link);  
        },
          js: function(path) { 
            if (!path || path.length === 0) {  
                throw new Error('argument "path" is required !'); 
            } 
            var head = document.getElementsByTagName('head')[0];    
            var script = document.createElement('script');    
            script.src = path;    
            script.type = 'text/javascript';    
            head.appendChild(script);  
        }
    }
    //TODO: 此处暂存所有js，css路径处
cssUrl = {
    pathUrl: "static/css/",
    css: [
        "bootstrap.min.css",
        "font-awesome.min.css",
        "plugins/jquery-accordion-menu.css",
        "common.css",
        "plugins/page.css",
        "header.css",
        "service.css",
    ]
}
jsUrl = {
    pathUrl: "static/js/",
    js: [
        "bootstrap.min.js",
        "plugins/jquery.myPagination.js",
        "plugins/uploadPreview.js",
        "switch.js",
        "RegEx.js",
        "common.js"
    ]
}

//TODO: 动态加载 CSS 文件
for (var idx = 0; idx < cssUrl.css.length; idx++) {
    if (cssUrl.pathUrl) {
        dynamicLoadingUrl.css(cssUrl.pathUrl + cssUrl.css[idx]);
    }
}

//TODO: 动态加载 JS 文件
for (var idxx = 0; idxx < jsUrl.js.length; idxx++) {
    dynamicLoadingUrl.js(jsUrl.pathUrl + jsUrl.js[idxx]);
}



//加载js
//var loadJS = function (url) {
//    var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
//    script.src = url + tp;
//    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
//}
//加载css
//var loadCss =  function (url,domid) {
//    var css = document.createElement('link');
//    css.setAttribute('rel', 'stylesheet');
//    css.setAttribute('type', 'text/css');
//    css.setAttribute('href', url + tp);
//    var obj = document.getElementById(domid);
//    if (!!obj) {
//        obj.appendChild(css);
//    }
//}