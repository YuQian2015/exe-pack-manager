var editUserId = '';

function editUser(dom) {
    editUserId = $(dom).data("id");
    $("#userEdit")
        .modal({
            allowMultiple: true,
            // closable: false,
            // inverted: true,
            blurring: true,
            // To prevent a modal action from causing the modal to close, you can return false; from either callback.
            // onDeny: function(){
            //     return false;
            // },
            onHidden: function() {
                editUserId = '';
            },
            onApprove: function() {

                var result = {
                    role: $("#roleSelector").val()
                };


                $.ajax({
                    type: 'PUT',
                    url: "/api/v1/roles/" + editUserId,
                    contentType: 'application/json',
                    data: JSON.stringify(result),
                    success: function (res) {
                        if (res && res.success) {
                            console.log(res);
                        }
                    },
                    error: function (error) {
                        alert(error.msg);
                    }
                });



                return false; // 返回false 阻止被关闭
            }
        }).modal('show');
}

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
                            '              <div class="ui button" onclick="editUser(this)" data-id="'+item._id+'">编辑</div>' +
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
        $.ajax({
            type: 'GET',
            url: "/api/v1/roles",
            contentType: 'application/json',
            data: '',
            success: function (res) {
                if (res && res.success) {
                    console.log(res.data);
                    var html = '';
                    $.each(res.data, function (i, item) {
                        html += '<option value="'+item.name+'">'+item.name+'</option>';
                    });
                    $("#roleSelector option").after(html);
                }
            },
            error: function (error) {
                alert(error.msg);
            }
        });
    }
});
