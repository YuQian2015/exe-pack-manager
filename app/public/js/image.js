var imageSelectorObj = {
};

function selectImage(dom) {
    var url = $(dom).data('url');
    $("#" + imageSelectorObj.id + "Modal").modal('hide');
    $('#closeImagePick').unbind('click');
    $("#" + imageSelectorObj.id).html('<img class="resultImagePrev" src="'+url+'">');
    $("#" + imageSelectorObj.id + "Filed").val(url);
}

function loadImage(successCallback) {
    $.ajax({
        type: 'GET',
        url: "/api/v1/files",
        contentType: 'application/json',
        data: '',
        success: function (res) {
            if (res && res.success) {
                var fileHtml = "";
                var addImage = '<a class="red card">' +
                    '<label class="image-upload" for="'+imageSelectorObj.id+'Holder"><i class="plus icon"></i></label>' +
                    '</div>' +
                    '</a>';
                $.each(res.data, function (i, item) {
                    fileHtml += '<a class="red card">' +
                        '<div onclick="selectImage(this)" data-url="'+item.url+'" class="image">' +
                        '<img src="'+item.url+'?imageView2/5/w/200/h/200" />' +
                        '</div><p class="image-name">'+item.fileName+'</p>' +
                        '</a>';
                });

                successCallback && successCallback(addImage+fileHtml);
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

function bindImageSelector(id) {
    imageSelectorObj.id = id;
    $('#'+id).click(function () {
        $("#" + id + "Modal").modal('show');
        $("#" + id + "Actions").html('<div class="ui button" id="closeImagePick">关闭</div>');
        loadImage(function (result) {
            $("#" + id + "Content").html(result);
        });
        $('#closeImagePick').bind('click', function () {
            $("#" + id + "Modal").modal('hide');
            $('#closeImagePick').unbind('click');
        });
    });
}

function imageSelectorChange(dom) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
        var $image = $("#"+imageSelectorObj.id+"Cropper");
        $image.attr('src', reader.result);
        var $resultImage = $("#"+imageSelectorObj.id+"Result");
        var cropperInstance;
        $("#" + imageSelectorObj.id + "CropperModal").modal('show');
        $image.cropper({
            aspectRatio: 1 / 1,
            crop: function (event) {
                var resultImage = cropperInstance.getCroppedCanvas().toDataURL();
                $resultImage.attr('src', resultImage);
            }
        });
        cropperInstance = $image.data('cropper');
        $("#" + imageSelectorObj.id + "CropperModal .actions").html('<div class="ui button" id="confirmImagePick">确定</div>');
        $('#confirmImagePick').bind('click', function () {
            cropperInstance.getCroppedCanvas().toBlob(function (blob) {
                uploadImage(blob);
            });
            $("#" + imageSelectorObj.id + "CropperModal").modal('hide');
            $('#confirmImagePick').unbind('click');
        })
    });
    reader.readAsDataURL($(dom)[0].files[0]);
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
        success: function(result) {
            if (result && result.success) {
                var fileHtml = '<a class="red card">' +
                    '<div onclick="selectImage(this)" data-url="'+result.data.url+'" class="image">' +
                    '<img src="'+result.data.url+'?imageView2/5/w/200/h/200" />' +
                    '</div><p class="image-name">'+result.data.fileName+'</p>' +
                    '</a>';
                $("#" + imageSelectorObj.id + "Content").prepend(fileHtml);
                $("#" + imageSelectorObj.id).html('<img class="resultImagePrev" src="'+result.data.url+'">');
                $("#" + imageSelectorObj.id + "Filed").val(result.data.url);
            }
            console.log(result);
        },
        error: function() {
            console.log('Upload error');
        },
    });
}