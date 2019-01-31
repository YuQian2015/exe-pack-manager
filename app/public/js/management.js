$(document).ready(function () {
    if(window.location.href.indexOf('/management') > -1) {
        $.ajax({
            type: 'GET',
            url: "/api/v1/users",
            contentType: 'application/json',
            data: '',
            success: function (res) {
                if (res && res.success) {

                    var html = '';
                    $.each(res.data, function (i, item) {
                        html+= '<div class="item">' +
                            '            <div class="right floated content">' +
                            '              <div class="ui button">编辑</div>' +
                            '            </div>' +
                            '            <img class="ui avatar image" src="/images/avatar2/small/lena.png">' +
                            '            <div class="content">' + item.name + '(' +item.userId + ')' + '</div>' +
                            '</div>';
                    });


                    $("#userList").html(html)
                }
            },
            error: function (error) {
                alert(error.msg);
            }
        });
    }
});
