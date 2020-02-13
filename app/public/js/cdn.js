var CDN = {
    id: '',
    data: [],
    file: null,
    init: function () {
        var _this = this;
        requestHandler(
            'GET',
            "/api/v1/cdn",
            {},
            function (data) {
                if (data && data.length) {
                    var html = '';
                    _this.data = data;
                    $.each(data, function (index, item) {
                        html += _this._getLine(item, index)
                    })
                }
                $("#cdnList").html(html);
            });

        $('.ui.dropdown').dropdown();
        $('#cdnList').delegate('.deleteSite', 'click', function () {
            _this.id = $(this).data('id');
            $('.mini.modal#deleteSite').modal('show');
        })
        $('#cdnList').delegate('.upload', 'click', function () {
            var index = $(this).data('index');
            var cdn = _this.data[index];
            _this.id = cdn._id;

            requestHandler(
                'GET',
                "/api/v1/cdn/" + cdn._id + "/version",
                "",
                function (data) {
                    $("#uploadTenantInfo").html(cdn.name + ' 线上版本:' + data);
                    $("#packageUploadBox").show();
                });
        })
    },

    hideDeleteModal: function () {
        this.id = '';
        $('.mini.modal#deleteSite').modal('hide');
    },

    hideUpload: function (e) {
        $("#packageUploadBox").hide();
        this.cancelUploadZip();
    },

    _getLine: function (item, index) {
        return '<tr>' +
            '<td data-label="name">' + item.name + '</td>' +
            '<td data-label="version">' + item.tenantId + '</td>' +
            '<td data-label="version">' + item.version + '</td>' +
            '<td data-label="action">' +
            '<button class="ui button mini green upload" data-index="' + index + '">上传新版本</button>' +
            '<button class="ui button mini blue">查看</button>' +
            '<button class="ui button mini red deleteSite" data-id="' + item._id + '">删除</button>' +
            '</td>' +
            '</tr>'
    },

    newSite: function (e) {
        $(e).toggleClass("green");
        $("#newSite").toggle();
    },

    deleteCdn: function (id) {
        var _this = this;
        if (_this.id) {
            id = _this.id
        }
        requestHandler(
            'DELETE',
            "/api/v1/cdn/" + id,
            {},
            function (data) {
                $('[data-id="' + id + '"]').parents('tr').remove();
                _this.hideDeleteModal();
            });
    },

    createCdn: function () {
        var _this = this;
        var cdnDom = $("#cdn");
        var name = cdnDom.find('[name="name"]').val()
        var version = cdnDom.find('[name="version"]').val()
        var homePage = cdnDom.find('[name="homePage"]').val()
        var authPage = cdnDom.find('[name="authPage"]').val()
        var resource = cdnDom.find('[name="resource"]').val()
        var tenantId = cdnDom.find('[name="tenantId"]').val()
        var rule = cdnDom.find('[name="rule"]').val()
        requestHandler(
            'POST',
            "/api/v1/cdn",
            {
                name: name,
                version: version,
                homePage: homePage,
                authPage: authPage,
                resource: resource,
                tenantId: tenantId,
                rule: rule
            },
            function (data) {
                var html = _this._getLine(data)
                $("#cdnList").append(html);
            });
    },

    selectedZip: function (input) {
        var file = input.files[0];
        this.file = file;
        // this.uploadZip(file, function (res) {
        //     console.log(res)
        // })
        var $image = $(input).parents(".image");
        var $card = $("#packageUploadBox");
        $(input).parents("label").hide();
        $image.append('<div class="file-type" style="height: 240px;text-align:center">' +
            '<img src="https://eftcdn.exexm.com/exe-pack-manager/assets/zip.png" />' +
            '<div style="font-size: 20px;">' + file.name + '</div>' +
            '</div>');
        $card.find("#uploadAction").show();
    },

    uploadZip: function (successCallback) {
        var blob = this.file;
        var _this = this;
        var formData = new FormData();
        formData.append('id', this.id);
        formData.append('package', blob, blob.name);
        // Use `jQuery.ajax` method
        $.ajax('/package/upload', {
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result && result.success) {
                    successCallback && successCallback(result);
                    _this.uploadComplete()
                }
                console.log(result);
            },
            error: function () {
                console.log('Upload error');
            },
        });
    },

    cancelUploadZip: function () {
        var $card = $("#packageUploadBox");
        $card.find("label").show();
        $card.find(".file-type").remove();
        $card.find("#uploadAction").hide();
        this.clearInput();
    },

    clearInput: function () {
        var $card = $("#packageUploadBox");
        this.file = null;
        $card.find("input").val("");
    },

    uploadComplete: function () {
        this.cancelUploadZip();
        var $card = $("#packageUploadBox");
        $card.find("label").hide();
        $card.find(".image").append('<div style="height: 240px;text-align:center" class="publish"><div>上传成功</div>' +
            '<button class="ui basic green button" onclick="CDN.publish()">立即发布</button>' +
            '</div>');
    },

    publish: function () {
        var _this = this;
        var publish = $("#packageUploadBox .image .publish");
        publish.html('<div>发布中，请等待发布完成…</div>');
        requestHandler(
            'POST',
            "/api/v1/cdn/" + this.id + "/publish",
            {},
            function (data) {
                _this.cancelUploadZip();
                publish.remove();
                alert('发布成功！');
                console.log('发布成功！');
            });
    }
}