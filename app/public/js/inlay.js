var INLAY = {
    features: [],
    featuresId: []
};

function createInlay() {
    var html = '<div class="feature-item">' +
        '<div class="ui input nimi"><input style="width: 60px" id="featureName" type="text" placeholder="平台"></div>' +
        '</div>';
    $.each(INLAY.features, function (i, item) {
        html+= '<div class="feature-item">' +
            '<div class="ui checkbox">' +
            '  <input type="checkbox" data-id="'+item._id+'">' +
            '</div>' +
            '</div>'
    });
    $("#saveInlay, #cancelInlay").show();
    $("#createInlay").hide();
    $("#newInlay").html(html);
    $('#newInlay .ui.checkbox').checkbox();
}

function saveInlay() {
    var ids = [];
    var name = $("#featureName").val();
    $.each($('#newInlay input[type="checkbox"]'), function (i, item) {
        if(item.checked) {
            ids.push($(item).data('id'))
        }
    });

    if( name && ids.length) {
        requestHandler(
            'POST',
            "/api/v1/inlays",
            {
                features: ids,
                name: name
            },
            function (data) {
                toast('新增成功')
            });
        $("#saveInlay, #cancelInlay").hide();
        $("#createInlay").show();

    } else {
        toast('请填写内嵌版信息')
    }
    console.log(ids)
}

function cancelInlay() {
    $("#newInlay").html('');
    $("#saveInlay, #cancelInlay").hide();
    $("#createInlay").show();
}

function saveFeature() {
    var value = $("#featureName").val();
    if(value) {
        requestHandler(
            'POST',
            "/api/v1/features",
            {
                name: value,
            },
            function (data) {
                toast('保存成功')
            });
    }
}

$(function () {
    if(window.location.href.indexOf('/inlay') > -1) {
        requestHandler(
            'GET',
            "/api/v1/features",
            '',
            function (data) {
                INLAY.features = data;
                var html = '<div class="feature-item">租户</div>';
                $.each(data, function (i, item) {
                    INLAY.featuresId.push(item._id);
                    html+= '<div class="feature-item">'+item.name+'</div>'
                });
                $("#featureList").html(html)

                requestHandler(
                    'GET',
                    "/api/v1/inlays",
                    '',
                    function (data) {
                        $.each(data, function (i, item) {
                            var html = '<div class="feature-list">';
                            html += '<div class="feature-item">'+item.name+'</div>';
                            $.each(INLAY.featuresId, function (i, feat) {
                                var index = item.features.indexOf(feat);
                                if(index >= 0) {
                                    html+= '<div class="feature-item">' +
                                        '<div class="ui checkbox">' +
                                        '  <input type="checkbox" data-id="'+feat+'" disabled checked>' +
                                        '</div>' +
                                        '</div>';
                                } else {
                                    html+= '<div class="feature-item">' +
                                        '<div class="ui checkbox">' +
                                        '  <input type="checkbox" data-id="'+feat+'" disabled>' +
                                        '</div>' +
                                        '</div>';
                                }
                            });
                            html += '</div>';
                            var $result = $(html);
                            $("#featureList").after($result);
                            setTimeout(function () {
                                $result.find('.ui.checkbox').checkbox()
                            }, 20)
                        });
                    });
            });
    }
});