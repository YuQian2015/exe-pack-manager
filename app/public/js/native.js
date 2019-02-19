var openPwd = false;
function getKeeperPwd() {
    requestHandler(
        'GET',
        "/api/v1/keepers",
        '',
        function (data) {
            var html = '';

            $.each(data, function (i, item) {
                html += '<h3 class="ui heade"><a target="_blank" href="'+item.website+'">'+item.name+'</a></h3>';
                if(item.data && item.data.length) {
                    html += '<div class="ui middle aligned divided celled list">';
                    $.each(item.data, function (index, dataItem) {
                        html += '<div class="item">'+ '<span class="content"><i class="user icon"></i>'+dataItem.key + '</span>' +
                            '<div class="right floated content">' + dataItem.value +
                            '</div></div>';
                    });
                    html += '</div>';
                }
                $("#nativeBox").html(html).parent().show();
            })
        });
}
function toggleKeeperPwd(dom) {
    if(!openPwd) {
        openPwd = !openPwd;
        getKeeperPwd();
        $(dom).find(".chevron.right").hide();
        $(dom).find(".chevron.down").show();
    } else {
        openPwd = !openPwd;
        $(dom).find(".chevron.right").show();
        $(dom).find(".chevron.down").hide();
        $("#nativeBox").html('').parent().hide();
    }
}

$(document).ready(function () {
    if(window.location.href.indexOf('/native') > -1) {
    }
});
