var CDN = {
    init: function () {
        requestHandler(
            'GET',
            "/api/v1/cdn",
            {},
            function (data) {
                if (data && data.length) {
                    var html = '';
                    $.each(data, function (index, item) {
                        html += '<tr><td data-label="name">' + item.name + '</td><td data-label="version">' + item.version + '</td><td data-label="action"></td></tr>'
                    })
                }
                $("#cdnList").html(html);
            });
    },

    createCdn: function () {
        var cdnDom = $("#cdn");
        var name = cdnDom.find('[name="name"]').val()
        var version = cdnDom.find('[name="version"]').val()
        var homePage = cdnDom.find('[name="homePage"]').val()
        var authPage = cdnDom.find('[name="authPage"]').val()
        var resource = cdnDom.find('[name="resource"]').val()
        requestHandler(
            'POST',
            "/api/v1/cdn",
            {
                name: name,
                version: version,
                homePage: homePage,
                authPage: authPage,
                resource: resource
            },
            function (data) {
                var html = '<tr><td data-label="name">' + data.name + '</td><td data-label="version">' + data.version + '</td><td data-label="action"></td></tr>'
                $("#cdnList").append(html);
            });
    },

    selectedZip: function (input) {
        var file = input.files[0]
        console.log(file);
        this.uploadZip(file, function(res) {
            console.log(res)
        })
    },

    uploadZip: function (blob, successCallback) {
        const formData = new FormData();
        console.log(blob);
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
                }
                console.log(result);
            },
            error: function () {
                console.log('Upload error');
            },
        });
    }
}