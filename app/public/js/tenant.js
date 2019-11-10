function addTenant() {
    var $form = $('form');
    $.each($form.serializeArray(), function (index, data) {
        if (data.value === 'on') {
            tenantForm[data.name].value = true;
        }
        console.log(data.name);
        console.log(data.value);
    });
    $form.submit();
}

function updateTenant(id) {
    var result = {};
    $.each(tenantForm, function (index, data) {
        if(data.type === 'checkbox') {
            result[data.name] = data.checked;
        } else {
            result[data.name] = data.value
        }
    });
    requestHandler(
        'PUT',
        "/api/v1/tenants/" + id,
        result,
        function (data) {
            window.history.back(-1);
        });
}

function deleteTenant(dom) {
    var cancelDom = $('<div class="ui button">取消</div>');
    var deleteDom = $('<div class="ui red button">删除</div>');
    $('#deleteTenant .actions').html("").append(cancelDom, deleteDom);
    $('.mini.modal#deleteTenant').modal('show');
    cancelDom.click(function () {
        $('.mini.modal#deleteTenant').modal('hide');
    });
    deleteDom.click(function () {
        deleteTenantFunc($(dom).data('id'))
    });



    function deleteTenantFunc(id) {
        requestHandler(
            'DELETE',
            "/api/v1/tenants/" + id,
            {},
            function (data) {
                window.history.back(-1);
            });
    }
}

function abateTenant(dom) {
    var cancelDom = $('<div class="ui button">取消</div>');
    var deleteDom = $('<div class="ui red button">确认</div>');
    $('#abateTenant .actions').html("").append(cancelDom, deleteDom);
    $('.mini.modal#abateTenant').modal('show');
    cancelDom.click(function () {
        $('.mini.modal#abateTenant').modal('hide');
    });
    deleteDom.click(function () {
        abateTenantFunc($(dom).data('id'))
    });

    function abateTenantFunc(id) {
        requestHandler(
            'PUT',
            "/api/v1/tenants/" + id,
            {
                valid: false
            },
            function (data) {
                window.location.reload();
            });
    }
}

function viewTenant(id) {
    window.location.href = '/tenant/' + id;
}

function editTenant(id) {
    window.location.href = '/tenant/' + id + '/edit';
}

function lockTenant(id, dom) {
    var isLocked = $(dom).hasClass('unlock');
    requestHandler(
        'PUT',
        "/api/v1/tenants/" + id,
        {
            isLocked: isLocked
        },
        function (data) {
            if (isLocked) {
                $(dom).attr({
                    'class': 'lock icon',
                    'data-content': '已锁定，不能修改'
                });
            } else {
                $(dom).attr({
                    'class': 'unlock icon',
                    'data-content': '锁定租户'
                });
            }
        });
}

function setColor(dom) {
    var $themeSetting = $("#themeSetting");
    var brand = $themeSetting.find('input[name="brand"]').val();
    var primary = $themeSetting.find('input[name="primary"]').val();
    var secondary = $themeSetting.find('input[name="secondary"]').val();
    var tenantId = $themeSetting.find('input[name="tenantId"]').val();
    if($(dom).data('theme-id')) {
        requestHandler(
            'PUT',
            "/api/v1/themes/" + $(dom).data('theme-id'),
            {
                brand: brand, // 品牌颜色
                primary: primary, // 主要颜色 使用于header
                secondary: secondary, // 次要颜色 使用于footer
            },
            function (data) {
                window.location.reload();
            });
        return;
    }

    requestHandler(
        'POST',
        "/api/v1/themes/",
        {
            brand: brand, // 品牌颜色
            primary: primary, // 主要颜色 使用于header
            secondary: secondary, // 次要颜色 使用于footer
        },
        function (data) {
            requestHandler(
                'PUT',
                "/api/v1/tenants/" + tenantId,
                {
                    theme: [data._id]
                },
                function (data) {
                    window.location.reload();
                });
        });
}

function saveTimeline(html, id, callback) {
    requestHandler(
        'POST',
        "/api/v1/timelines",
        {
            content: html,
            tenantKey: id
        },
        function (data) {
            if(callback && typeof callback == 'function') {
                callback(res.data);
            }
        });
}

function loadTimeline(id) {
    requestHandler(
        'GET',
        "/api/v1/timelines?tenantKey="+id,
        '',
        function (data) {
            if(data.length) {
                var html = '';
                $.each(data, function (i, item) {
                    html += '<div class="create-date">'+moment(item.createDate).format('YYYY-MM-DD HH:mm:ss')+'</div>' +
                        '<div class="timeline-content">'+item.content+'</div>';
                })
            }
            $("#timeline").prepend(html)
        });
}
$(document).ready(function () {
    // show dropdown on hover
    $('.menu  .ui.dropdown').dropdown({
        on: 'hover'
    });
    $('.ui.checkbox').checkbox();
    $('select.dropdown').dropdown();
    $('[data-content]').popup();
    $('.ui.form').form({
        on: 'blur',
        fields: {
            tenantId: {
                identifier: 'tenantId',
                rules: [{
                    type: 'empty',
                    prompt: '请输入租户ID'
                }]
            },
            appName: {
                identifier: 'appName',
                rules: [{
                    type: 'empty',
                    prompt: '请输入应用名'
                }]
            },
            tenantName: {
                identifier: 'tenantName',
                rules: [{
                    type: 'empty',
                    prompt: '请输入租户名'
                }]
            },
        }
    });
    $('table.sortable').tablesort();
    // $('.color-picker').ColorPicker({
    //     color: '#00ccff',
    //     onShow: function (colpkr) {
    //         window.imagePickerClickedEl = this;
    //         $(colpkr).fadeIn(500);
    //         return false;
    //     },
    //     onHide: function (colpkr) {
    //         $(colpkr).fadeOut(500);
    //         return false;
    //     },
    //     onBeforeShow: function () {
    //         $(this).ColorPickerSetColor(this.value);
    //     },
    //     onChange: function (hsb, hex, rgb) {
    //         window.imagePickerClickedEl.value = '#' + hex;
    //         $(window.imagePickerClickedEl).parents(".color-picker-container").css('backgroundColor', '#' + hex);
    //     },
    //     livePreview: true
    // });

    $(".color-picker").change(function() {
        $(this).parent().prev().css('background', $(this).val());
    })
});
