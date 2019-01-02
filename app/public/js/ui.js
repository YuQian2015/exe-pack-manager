$(document).ready(function () {
    if(window.location.href.indexOf('/ui') > -1) {
        $.ajax({
            type: 'GET',
            url: "/api/v1/colors",
            contentType: 'application/json',
            data: '',
            success: function (res) {
                if (res && res.success) {
                    var html = '';
                    $.each(res.data, function (i, item) {
                        html += '<div class="colors">' +
                            '<div class="tenant-id">'+ item.tenantId +'</div>';


                        $.each(item.colors, function (key, color) {
                            html += '<div  class="color-block" title="'+ key +'" style="background: '+color+'"></div>';
                        })
                        html += '</div>';
                        console.log(item)
                    })
                    $("#tenantColors").html(html);
                    console.log(res);
                }
            },
            error: function (error) {
                alert(error.msg);
            }
        });
    }
});
