/**
 * Created by lenovo on 2016/10/13.
 */

function assistantSquare() {
    $('.assistantWrapper,.assistantBtn').toggle()
}
function jumpPage(url){
    $.get(url, function (data) {
        $("#rightWrapper").html(data);
    });
}