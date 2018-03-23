
//ajax 获取 html
function jumpPageDemo(id,url,handler) {
    $.ajax({
        type : "post",
        url : encodeURI(url),
        dataType : "html",
        beforeSend: function(){
            //$("#" + id).html("页面正在加载....");
        },
        success : function (data) {
            $("#" + id).html(data);
            if(handler){
                handler(data);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status==401){
                location.reload("/login");
            }else{
                $("#" + id).html("<div style='text-align: center;padding-top: 50px;'><h3>系统繁忙，请稍候重试！</h3></div>");
            }
        }
    });
}

