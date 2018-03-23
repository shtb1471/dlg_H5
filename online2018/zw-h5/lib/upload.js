var userid = GetRequest()['userid'];
var sex = GetRequest()['sex'];
var access_token = GetRequest()['access_token'];
var cidUPimg = GetRequest()['cidUPimg'];

//click事件
$("#photograph_btn").click(function () {
    $("#selectfiles").click();
})

$("#selectfiles").click(function () {
    $("input[type='file']").click();
    $("input[type='file']").change(function () {
        $("#postfiles").click();
    })
})

//摄像头判断
window.onload = function () {
    $("input[type='file']").removeAttr("accept");
    $("input[type='file']").removeAttr("multiple");
    var userAgentInfo = navigator.userAgent;
    if (userAgentInfo.indexOf("Android") > 0) {
        if (userAgentInfo.indexOf("MicroMessenger") > 0 || userAgentInfo.indexOf("Mobile MQQBrowser") > 0) {
            var idx = $("input[type='file']").attr("id");
            if (idx) {
                $("#" + idx).attr("accept", "image/*,video/!*;capture=camera");
            } else {
                $("input[type='file']").attr("accept", "image/*,video/!*;capture=camera");
            }
            if (userAgentInfo.indexOf("Mobile MQQBrowser") > 0) {
                $("input[type='file']").attr("capture", "camera");
            }
        } else {
            $("input[type='file']").attr("accept", "image/!*;capture=camera");

            if (userAgentInfo.indexOf("VivoBrowser") > 0) {
                $("input[type='file']").attr("capture", "camera").attr("accept", "image/*");
            }
        }
    } else {
        $("input[type='file']").attr("capture", "camera").attr("accept", "image/gif,image/jpeg,image/jpg,image/png,image/svg");
    }
}


/*-------------------------------upload.js-----------------------------*/

//注意，阅读顺序请按照注释的标号进行
accessid = 't9zSHOdQ10x7QwLk';//替换成自己的，要记得在oss的管理界面设置cors，即跨域访问的设置
accesskey = 'etpwepGdRxIx3wpn86C2CpSyhXxfE9';//替换成自己的，要记得在oss的管理界面设置cors，即跨域访问的设置
host = 'http://s.gongren.com/';//替换成自己的，要记得在oss的管理界面设置cors，即跨域访问的设置

g_dirname = 'dds/img/zw/handImg/'
g_object_name = ''
now = timestamp = Date.parse(new Date()) / 1000;
//5 如果想要在这个界面设置可变的参数，可以在index.html中设置隐藏的文本域，通过getElementById的方法可以得到对应的value

var policyText = {
    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
        ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
};

var policyBase64 = Base64.encode(JSON.stringify(policyText))
message = policyBase64
var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, {asBytes: true});
var signature = Crypto.util.bytesToBase64(bytes);

function random_string(len) {//该方法定义生成文件名的规则，可以自己修改成自己的生成规则
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {//该方法是得到文件名的后缀名
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename) {
    //把生成的文件名和后缀名拼接到一起
    suffix = get_suffix(filename);
    g_object_name = g_dirname + random_string(10) + suffix
}

function set_upload_param(up, filename, ret) {//4设置上传的参数
    // g_object_name = g_dirname;
    if (filename != '') {
        suffix = get_suffix(filename)
        calculate_object_name(filename)
    }
    new_multipart_params = {
        'key': g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
        'signature': signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}

var uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: 'selectfiles',
    //multi_selection: false,
    container: document.getElementById('container'),
    flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
    silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
    url: 'http://oss.aliyuncs.com',

    init: {
        PostInit: function () {
            document.getElementById('ossfile').innerHTML = '';
            document.getElementById('postfiles').onclick = function () {
                set_upload_param(uploader, '', false);
                return false;
            };
        },

        FilesAdded: function (up, files) {//文件添加时执行的方法，files为单次打开文件添加窗口时添加的文件数组，不是上传列表中总共的文件数。
            plupload.each(files, function (file) {
                document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '"><b></b>'
                    + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
                    + '</div>';
            });
        },

        BeforeUpload: function (up, file) {//1该方法在上传前执行，做一些上传前对文件进行处理和参数设置，文件名的修改就在这里进行

            var s = up.files.length;//这块内容可以限制上传文件只能有一个，打开这块注释后，当选择多个文件的时候之后上传最后一个文件
            if (s > 1) {
                up.splice(0, s - 2);
            }
            set_upload_param(up, file.name, true);

            $('#pload').show();//显示加载动画
        },

        UploadProgress: function (up, file) {
            var d = document.getElementById(file.id);
            d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            var prog = d.getElementsByTagName('div')[0];
            var progBar = prog.getElementsByTagName('div')[0]
            progBar.style.width = 2 * file.percent + 'px';
            progBar.setAttribute('aria-valuenow', file.percent);
        },

        FileUploaded: function (up, file, info) {//上传完成之后执行的方法
            if (info.status == 200) {
                var url = host + g_object_name;
                var imgType = $('#imgBtn').attr('imgType');//上传图片类型
                //网络诊断navigator.onLine
                if(navigator.onLine == true){
                    //上传照片
                    uploadForm_AJAX(url);
                }
            }
            else {
                console.log(info.response);
            }
        },
        Error: function (up, err) {
            document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
        }
    }
});
uploader.bind('FilesAdded',function (up, files) {
        if (!/.(png|jpg|jpeg|bmp|gif)$/.test(files[0].name)) {
            return false;
        } else {
            uploader.splice(0, uploader.files.length - 1);
        }
    });
uploader.init();



//上传照片
function uploadForm_AJAX(url){
    $.ajax({
        type: 'POST',
        url: loginUrl+'/zw/'+userid+'/zw_info_save',
        data: {
            photo: url,
            gender:sex,
            source:"打零工APP"
        },
        success: function (datas) {
            var data=JSON.parse(datas).body;
            $('#pload').hide();
            if(data.code == "SUCCESS"){
                //是右手掌
                window.location.href = 'Processing.html?userid=' + userid+"&access_token="+access_token+"&_lt="+ new Date().getTime();
            }else{
                alert(data.msg);
                window.location.href = 'sex.html?userid=' + userid+"&access_token="+access_token+"&_lt="+ new Date().getTime();
            }
        },
        error: function () {
            $('#pload').hide();
            window.location.href = 'sex.html?userid=' + userid+"&access_token="+access_token+"&_lt="+ new Date().getTime();
        }
    })
}