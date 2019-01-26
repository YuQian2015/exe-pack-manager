var imageSelectorObj = {
};

imageSelectorObj.pageSize = 18;

function selectImage(dom) {
    var url = $(dom).data('url');
    var id = $(dom).data('id');

    var editDom = $('<button class="ui circular blue icon button"><i class="pencil alternate icon"></i></button>');
    var deleteDom = $('<button class="ui circular red icon button"><i class="trash alternate icon"></i></button>');
    var selectDom = $('<button class="ui circular green icon button"><i class="check icon"></i></button>');
    var containerDom = $('<div class="image-action-container"></div>');
    $(".image-action-container").remove();
    containerDom.append(deleteDom, editDom, selectDom);
    $(dom).append(containerDom);
    selectDom.click(function () {
        $("#" + imageSelectorObj.id + "Modal").modal('hide');
        $("#" + imageSelectorObj.id).html('<img class="resultImagePrev" src="'+url+'">');
        $("#" + imageSelectorObj.id + "Filed").val(url);
    })
    deleteDom.click(function () {
        $("#deleteImageConform")
            .modal({
                allowMultiple: true,
                onApprove: function() {
                    deleteImage(id, dom);
                }
            })
            .modal('show')
    })
}

function loadImage(page, successCallback) {
    $.ajax({
        type: 'GET',
        url: "/api/v1/files",
        contentType: 'application/json',
        data: "pageSize="+imageSelectorObj.pageSize+"&page="+page,
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


function getImageHtml(list) {
    var fileHtml = "";
    $.each(list, function (i, item) {
        fileHtml += '<a class="red card">' +
            '<div data-url="'+item.url+'"  data-id="'+item._id+'" class="image">' +
            '<img src="'+item.url+'?imageView2/5/w/200/h/200" />' +
            '</div><p class="image-name">'+item.fileName+'</p>' +
            '</a>';
    });
    $("#" + imageSelectorObj.id + "Content").html(fileHtml);
    $(".red.card .image").hover(function () {
        selectImage(this)
    })
}

function bindImageSelector(id) {
    imageSelectorObj.id = id;
    $('#'+id).click(function () {
        $("#" + id + "Modal")
            .modal('setting', 'closable', false)
            .modal('show');
        imageSelectorObj.$pagination = $('#pagePagination');
        var defaultOption = {
            totalPages: 10,
            startPage: 1,
            visiblePages: 5,
            pageClass: 'ui button',
            firstClass: 'ui button',
            lastClass: 'ui button',
            prevClass: 'ui button',
            nextClass: 'ui button',
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                getImage(page);
            }
        };
        // imageSelectorObj.$pagination.twbsPagination(defaultOption);
        loadImage(1, function (data) {
            var totalPages = Math.ceil(data.count / imageSelectorObj.pageSize);
            var currentPage = 1;
            var config = $.extend({}, defaultOption, {
                startPage: currentPage,
                totalPages: totalPages
            });
            imageSelectorObj.$pagination.html("").twbsPagination(config);
            getImageHtml(data.list);
        });
        function getImage(page) {
            loadImage(page, function (data) {
                // var totalPages = Math.ceil(data.count / imageSelectorObj.pageSize);
                // var currentPage = imageSelectorObj.$pagination.twbsPagination('getCurrentPage');
                // imageSelectorObj.$pagination.twbsPagination('destroy');
                // var config = $.extend({}, defaultOption, {
                //     startPage: currentPage,
                //     totalPages: totalPages
                // });
                // console.log(config);
                // setTimeout(function () {
                //     console.log(imageSelectorObj.$pagination)
                //     imageSelectorObj.$pagination.html("").twbsPagination(defaultOption);
                // }, 1000);
                getImageHtml(data.list);
            });
        }
    });
}

function imageSelectorChange(dom) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {

        var $cropperContainer = $("#"+imageSelectorObj.id+"CropperContainer");
        var $image = $('<img class="imageCropper" />');
        $image.attr('src', reader.result);
        $cropperContainer.html($image);
        var $resultImage = $("#"+imageSelectorObj.id+"Result");
        var cropperInstance;
        $("#" + imageSelectorObj.id + "CropperModal")
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
                    $("#"+imageSelectorObj.id+"Holder").val("");
                },
                onApprove: function() {
                    cropperInstance.getCroppedCanvas().toBlob(function (blob) {
                        var uploadHtml = '<div>上传中</div>';
                        $cropperContainer.html(uploadHtml);
                        uploadImage(blob, function (result) {
                            var fileHtml = '<a class="red card">' +
                                '<div onclick="selectImage(this)" data-url="'+result.data.url+'" class="image">' +
                                '<img src="'+result.data.url+'?imageView2/5/w/200/h/200" />' +
                                '</div><p class="image-name">'+result.data.fileName+'</p>' +
                                '</a>';
                            $("#" + imageSelectorObj.id + "Content").prepend(fileHtml);
                            $("#" + imageSelectorObj.id + "CropperModal").modal('hide');
                        });
                    });
                    return false; // 返回false 阻止被关闭
                }
            }).modal('show');
        $image.cropper({
            aspectRatio: 1 / 1,
            crop: function (event) {
                var resultImage = cropperInstance.getCroppedCanvas().toDataURL();
                $resultImage.attr('src', resultImage);
            }
        });
        cropperInstance = $image.data('cropper');
    });
    reader.readAsDataURL($(dom)[0].files[0]);
}

function uploadImage(blob, successCallback) {
    const formData = new FormData();
    console.log(blob);

    formData.append('image', blob, new Date().getTime() + '.png');

    // Use `jQuery.ajax` method
    $.ajax('/image/upload', {
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(result) {
            if (result && result.success) {
                successCallback && successCallback(result);
            }
            console.log(result);
        },
        error: function() {
            console.log('Upload error');
        },
    });
}

function deleteImage(id, dom) {
    $.ajax('/image/delete/'+id, {
        method: "DELETE",
        data: '',
        processData: false,
        contentType: false,
        success: function(result) {
            if (result && result.success) {
                $(dom).parent("a").remove();
            }
            console.log(result);
        },
        error: function() {
            console.log('Upload error');
        },
    });
}