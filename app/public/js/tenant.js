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
    $.ajax({
        type: 'PUT',
        url: "/api/v1/tenants/" + id,
        contentType: 'application/json',
        data: JSON.stringify(result),
        success: function (res) {
            if (res && res.success) {
                window.history.back(-1);
            }
        },
        error: function (error) {
            alert(error.msg);
        }
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
        $.ajax({
            type: 'DELETE',
            url: "/api/v1/tenants/" + id,
            contentType: 'application/json',
            data: {},
            success: function (res) {
                if (res && res.success) {
                    window.history.back(-1);
                }
            },
            error: function (error) {
                alert(error.msg);
            }
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
        $.ajax({
            type: 'PUT',
            url: "/api/v1/tenants/" + id,
            contentType: 'application/json',
            data: JSON.stringify({
                valid: false
            }),
            success: function (res) {
                if (res && res.success) {
                    window.location.reload();
                }
            },
            error: function (error) {
                alert(error.msg);
            }
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
    console.log(isLocked);
    $.ajax({
        type: 'PUT',
        url: "/api/v1/tenants/" + id,
        contentType: 'application/json',
        data: JSON.stringify({
            isLocked: isLocked
        }),
        success: function (res) {
            if (res && res.success) {
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
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

function uploadImage(blob) {
    const formData = new FormData();
    console.log(blob);

    formData.append('image', blob, new Date().getTime() + '.png');

    // Use `jQuery.ajax` method
    $.ajax('/upload', {
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success(result) {
            if (result && result.success) {
                $('#resultImagePrev').attr('src', result.data.url).show();
                $('[for="imageUploader"] i').hide();
                $('#iconFiled').val(result.data.url);
            }
            console.log(result);
        },
        error() {
            console.log('Upload error');
        },
    });
}

function setColor(dom) {
    var $themeSetting = $("#themeSetting");
    var brand = $themeSetting.find('input[name="brand"]').val();
    var primary = $themeSetting.find('input[name="primary"]').val();
    var secondary = $themeSetting.find('input[name="secondary"]').val();
    var tenantId = $themeSetting.find('input[name="tenantId"]').val();
    if($(dom).data('theme-id')) {
        $.ajax({
            type: 'PUT',
            url: "/api/v1/themes/" + $(dom).data('theme-id'),
            contentType: 'application/json',
            data: JSON.stringify({
                brand: brand, // 品牌颜色
                primary: primary, // 主要颜色 使用于header
                secondary: secondary, // 次要颜色 使用于footer
            }),
            success: function (res) {
                if (res && res.success) {
                    window.location.reload();
                }
            },
            error: function (error) {
                alert(error.msg);
            }
        });
        return;
    }
    $.ajax({
        type: 'POST',
        url: "/api/v1/themes/",
        contentType: 'application/json',
        data: JSON.stringify({
            brand: brand, // 品牌颜色
            primary: primary, // 主要颜色 使用于header
            secondary: secondary, // 次要颜色 使用于footer
        }),
        success: function (res) {
            if (res && res.success) {
                console.log(res);
                $.ajax({
                    type: 'PUT',
                    url: "/api/v1/tenants/" + tenantId,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        theme: [res.data._id]
                    }),
                    success: function (res) {
                        if (res && res.success) {
                            window.location.reload();
                        }
                    },
                    error: function (error) {
                        alert(error.msg);
                    }
                });
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

function saveTimeline(html, id, callback) {

    $.ajax({
        type: 'POST',
        url: "/api/v1/timelines/",
        contentType: 'application/json',
        data: JSON.stringify({
            content: html,
            tenantKey: id
        }),
        success: function (res) {
            if (res && res.success) {
                console.log(res);
                if(callback && typeof callback == 'function') {
                    callback(res.data);
                }
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

function loadTimeline(id) {
    $.ajax({
        type: 'GET',
        url: "/api/v1/timelines?tenantKey="+id,
        contentType: 'application/json',
        data: '',
        success: function (res) {
            if (res && res.success) {
                if(res && res.success && res.data.length) {
                    var html = '';
                    $.each(res.data, function (i, item) {
                        html += '<div class="create-date">'+moment(item.createDate).format('YYYY-MM-DD HH:mm:ss')+'</div>' +
                            '<div class="timeline-content">'+item.content+'</div>';
                    })
                }
                $("#timeline").prepend(html)
            }
        },
        error: function (error) {
            alert(error.msg);
        }
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
    $('#imageUploader').on('change', function () {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            $('#imagePicker').attr('src', reader.result);
            var $resultImage = $('#resultImage');
            var $image = $('#imagePicker');
            var cropperInstance;
            $('.large.modal').modal('show');
            $image.cropper({
                aspectRatio: 1 / 1,
                crop: function (event) {
                    var resultImage = cropperInstance.getCroppedCanvas().toDataURL();
                    $resultImage.attr('src', resultImage);
                }
            });
            cropperInstance = $image.data('cropper');
            $('#imagePickerModal .actions').html('<div class="ui button" id="confirmImagePick">确定</div>');
            $('#confirmImagePick').bind('click', function () {
                cropperInstance.getCroppedCanvas().toBlob(function (blob) {
                    uploadImage(blob);
                });
                $('.large.modal').modal('hide');
                $('#confirmImagePick').unbind('click');
            })
        });
        reader.readAsDataURL($(this)[0].files[0]);
    });
    $('.color-picker').ColorPicker({
        color: '#00ccff',
        onShow: function (colpkr) {
            window.imagePickerClickedEl = this;
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(this.value);
        },
        onChange: function (hsb, hex, rgb) {
            window.imagePickerClickedEl.value = '#' + hex;
            $(window.imagePickerClickedEl).parents(".color-picker-container").css('backgroundColor', '#' + hex);
        },
        livePreview: true
    });
});
