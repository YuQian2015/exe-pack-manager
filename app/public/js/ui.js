$(document).ready(function () {
    if(window.location.href.indexOf('/ui') > -1) {
        requestHandler(
            'GET',
            "/api/v1/colors",
            '',
            function (data) {
                var html = '';
                var fullColor = {};
                $.each(data, function (i, item) {
                    fullColor = _.merge(_.cloneDeep(item.colors));
                });
                $.each(fullColor, function (key, value) {
                    fullColor[key] = "------";
                });
                _.forEach(data, function (item) {
                    html += '<div class="colors">' +
                        '<div class="tenant-id">'+ item.tenantId +'</div>';
                    var cloneColor = _.cloneDeep(fullColor);
                    var colors = _.merge(cloneColor, item.colors);
                    _.forEach(colors, function (color, name) {
                        if(color !== '------') {
                            html += '<div  class="color-block" title="$'+ name +': '+ color +';" style="background: '+color+'"></div>';
                        } else {
                            html += '<div  class="color-block" title="未定义"></div>';
                        }
                    });
                    html += '</div>';
                })
                $("#tenantColors").html(html);
            });
    }
});
