$(document).ready(function () {
    if(window.location.href.indexOf('file') > -1) {
        $.ajax({
            type: 'GET',
            url: "/api/v1/files",
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (res) {
                if (res && res.success) {
                    var fileHtml = "";
                    $.each(res.data, function (i, item) {

                        fileHtml += '<a class="red card">' +
                            '<div class="image">' +
                            '<img src="'+item.url+'?imageView2/5/w/200/h/200" />' +
                            '</div>' +
                            '</a>';
                    });
                    $("#fileContainer").html(fileHtml);
                    console.log(res);
                }
            },
            error: function (error) {
                alert(error.msg);
            }
        });
    }
});
