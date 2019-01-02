$(document).ready(function () {
    if(window.location.href.indexOf('/ui') > -1) {
        $.ajax({
            type: 'GET',
            url: "/api/v1/colors",
            contentType: 'application/json',
            data: '',
            success: function (res) {
                if (res && res.success) {
                    var html = '';
                    var fullColor = {};
                    $.each(res.data, function (i, item) {
                        fullColor = _.merge(_.cloneDeep(item.colors));
                    });
                    $.each(fullColor, function (key, value) {
                        fullColor[key] = "------";
                    });
                    console.log(res.data);
                    console.log(fullColor);
                    _.forEach(res.data, function (item) {
                        html += '<div class="colors">' +
                            '<div class="tenant-id">'+ item.tenantId +'</div>';
                        var cloneColor = _.cloneDeep(fullColor);
                        var colors = _.merge(cloneColor, item.colors);
                        console.log(colors);
                        _.forEach(colors, function (color, name) {
                            if(color !== '------') {
                                html += '<div  class="color-block" title="$'+ name +': '+ color +';" style="background: '+color+'"></div>';
                            } else {
                                html += '<div  class="color-block" title="未定义"></div>';
                            }
                        });
                        html += '</div>';
                        // console.log(item)
                    })
                    $("#tenantColors").html(html);
                    console.log(res);
                }
            },
            error: function (error) {
                alert(error.msg);
            }
        });
    }
});
