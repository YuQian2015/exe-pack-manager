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

                requestHandler(
                    'PUT',
                    "/api/v1/users/" + editUserId,
                    result,
                    function (data) {
                        $("#userEdit").modal('hide');
                    });
                return false; // 返回false 阻止被关闭
            }
        }).modal('show');
}

function deleteUser(dom) {
    requestHandler(
        'DELETE',
        "/api/v1/users/"+$(dom).data("id"),
        {},
        function (data) {
            $(dom).parents('.item').remove();
        });
}

function getRoleList(successCallback) {
    requestHandler(
        'GET',
        "/api/v1/roles",
        '',
        function (data) {
            successCallback && successCallback(data);
        });
}

function getPolicyList(successCallback) {
    requestHandler(
        'GET',
        "/api/v1/policies",
        '',
        function (data) {
            successCallback && successCallback(data);
        });
}

function addPolicy(successCallback) {
    requestHandler(
        'POST',
        "/api/v1/policies",
        {policy: JSON.parse($("#policyInput").val())},
        function (data) {
            successCallback && successCallback(data);
        });
}

function removePolicy(p, dom) {
    requestHandler(
        'DELETE',
        "/api/v1/policies/"+p,
        {},
        function (data) {
            $(dom).parent().remove();
        });
}

function addRole() {
    requestHandler(
        'POST',
        "/api/v1/roles",
        {name: $("#roleInput").val()},
        function (data) {
            $("#roleList").prepend('<a class="ui label">' + data.name+ ' <i data-id="'+data._id+'" onclick="deleteRole(this)" class="icon close"></i></a>');
        });
}

function deleteRole(dom) {
    requestHandler(
        'DELETE',
        "/api/v1/roles/"+$(dom).data("id"),
        {},
        function (data) {
            $(dom).parents('.ui.label').remove();
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
        requestHandler(
            'GET',
            "/api/v1/users",
            '',
            function (data) {
                var html = '';
                $.each(data, function (i, item) {
                    html+= '<div class="item">' +
                        '            <div class="right floated content">' +
                        '              <div class="ui button red mini basic" onclick="deleteUser(this)" data-id="'+item._id+'">删除</div>' +
                        '              <div class="ui button mini blue basic" onclick="editUser(this)" data-id="'+item._id+'">编辑</div>' +
                        '            </div>' +
                        '            <img class="ui avatar image" src="/images/avatar2/small/lena.png">' +
                        '            <div class="content">' + item.name + '(' +item.userId + ')' + ' - <a class="ui mini label">' + (item.role?item.role.name:'visitor') + '</a></div>' +
                        '</div>';
                });
                $("#userList").html(html)
            });
        getRoleList(function (list) {
            var html = '';
            var roleListHtml = '';
            $.each(list, function (i, item) {
                html += '<option value="'+item._id+'">'+item.name+'</option>';
                roleListHtml += '<a class="ui label">' + item.name+ ' <i data-id="'+item._id+'" onclick="deleteRole(this)" class="icon close"></i></a>';
            });
            $("#roleSelector option").after(html);
            $("#roleList").append(roleListHtml);
        });
        getPolicyList(function (list) {
            var policyListHtml = '';
            $.each(list, function (i, item) {
                policyListHtml += '<div><button class="right floated ui button red small" onclick="removePolicy(\''+item.join('00000').replace(/\//g,'{1}').replace(/\*/g,'{2}').replace(/\?/g,'{3}')+'\', this)">删除</button><pre><code>'+JSON.stringify(item)+'</code></pre></div>'
            });
            $("#policyList").after(policyListHtml);
            document.querySelectorAll('pre code').forEach(function (block) {
                hljs.highlightBlock(block);
            });
        })
    }
});
