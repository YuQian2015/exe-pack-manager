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
                    url: "/api/v1/users/" + editUserId,
                    contentType: 'application/json',
                    data: JSON.stringify(result),
                    success: function (res) {
                        if (res && res.success) {
                            $("#userEdit").modal('hide');
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

function deleteUser(dom) {
    $.ajax({
        type: 'DELETE',
        url: "/api/v1/users/"+$(dom).data("id"),
        contentType: 'application/json',
        data: {},
        success: function (res) {
            if (res && res.success) {
                $(dom).parents('.item').remove();
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

function getRoleList(successCallback) {
    $.ajax({
        type: 'GET',
        url: "/api/v1/roles",
        contentType: 'application/json',
        data: '',
        success: function (res) {
            if (res && res.success) {
                successCallback && successCallback(res.data);
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

function getPolicyList(successCallback) {
    $.ajax({
        type: 'GET',
        url: "/api/v1/policies",
        contentType: 'application/json',
        data: '',
        success: function (res) {
            if (res && res.success) {
                successCallback && successCallback(res.data);
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

function addPolicy(successCallback) {
    $.ajax({
        type: 'POST',
        url: "/api/v1/policies",
        contentType: 'application/json',
        data: JSON.stringify({policy: JSON.parse($("#policyInput").val())}),
        success: function (res) {
            if (res && res.success) {
                successCallback && successCallback(res.data);
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

function removePolicy(p, dom) {
    $.ajax({
        type: 'DELETE',
        url: "/api/v1/policies/"+p,
        contentType: 'application/json',
        data: {},
        success: function (res) {
            if (res && res.success) {
                $(dom).parent().remove();
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

$(document).ready(function () {
    $('.menu .item').tab(
        // {
        //     cache: false,
        //     // faking API request
        //     apiSettings: {
        //         loadingDuration : 300,
        //         dataType: 'application/json',
        //         data: '',
        //         method: 'GET',
        //         successTest: function(response) {
        //             if(response && response.success) {
        //                 return response.success;
        //             }
        //             return false;
        //         },
        //         onSuccess: function (res, element) {
        //             console.log(element)
        //             console.log(res)
        //             return res.data;
        //         },
        //         onComplete: function (res, element) {
        //             console.log(element)
        //             console.log(res)
        //             return res.data;
        //         }
        //
        //
        //         // mockResponse    : function(settings) {
        //         //     var response = {
        //         //         first  : 'AJAX Tab One',
        //         //         second : 'AJAX Tab Two',
        //         //         third  : 'AJAX Tab Three'
        //         //     };
        //         //     return response[settings.urlData.tab];
        //         // }
        //     },
        //     auto    : true,
        //     path    : '/api/v1'
        // }
    );
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
                            '              <div class="ui button red mini" onclick="deleteUser(this)" data-id="'+item._id+'">删除</div>' +
                            '              <div class="ui button mini" onclick="editUser(this)" data-id="'+item._id+'">编辑</div>' +
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

        getRoleList(function (list) {
            var html = '';
            var roleListHtml = '';
            $.each(list, function (i, item) {
                html += '<option value="'+item._id+'">'+item.name+'</option>';
                roleListHtml += '<div>'+item.name+'</div>'
            });
            $("#roleSelector option").after(html);
            $("#roleList").after(roleListHtml);
        });
        getPolicyList(function (list) {
            var policyListHtml = '';
            $.each(list, function (i, item) {
                policyListHtml += '<div><button onclick="removePolicy(\''+item.join('00000')+'\', this)">删除</button><pre><code>'+JSON.stringify(item)+'</code></pre></div>'
            });
            $("#policyList").after(policyListHtml);
        })
    }
});
