function addTenant() {
    var tenant = {};
    $.each($('form').serializeArray(), function (index, data) {
        if (data.value === 'on') {
            tenantForm[data.name].value = true;
        }
    });
    $('form').submit();
}

function updateTenant(id) {
    var result = {};
    $.each($('form').serializeArray(), function (index, data) {
        if (data.value === 'on') {
            result[data.name] = true;
        } else {
            result[data.name] = data.value
        }
    });
    console.log(result);
    $.ajax({
        type: 'PUT',
        url: "/api/v1/tenants/" + id,
        contentType: 'application/json',
        data: JSON.stringify(result),
        success: function (res) {
            if (res && res.success) {
                alert('修改成功');
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
    $('.mini.modal').modal('show');
    cancelDom.click(function () {
        $('.mini.modal').modal('hide');
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
    $('.mini.modal').modal('show');
    cancelDom.click(function () {
        $('.mini.modal').modal('hide');
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
            tenantName: {
                identifier: 'tenantName',
                rules: [{
                    type: 'empty',
                    prompt: '请输入租户名'
                }]
            },
            province: {
                identifier: 'province',
                rules: [{
                    type: 'empty',
                    prompt: '请选择省份地区'
                }]
            },
        }
    });
    $('table').tablesort();
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
    })
});