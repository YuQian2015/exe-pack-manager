$(document).ready(function () {
    if(window.location.href.indexOf('/ui') > -1) {

        var clipboard = new ClipboardJS('.copy-btn');
        clipboard.on('success', function(e) {
            // console.info('Action:', e.action);
            // console.info('Text:', e.text);
            // console.info('Trigger:', e.trigger);
            toast('复制颜色成功 '+'<div class="color-block" style="background: #'+e.text+'">'+e.text+'</div>');
            e.clearSelection();
        });
        clipboard.on('error', function(e) {
            // console.error('Action:', e.action);
            // console.error('Trigger:', e.trigger);
        });
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
                            html += '<div  class="color-block copy-btn" data-clipboard-text="'+ color.replace('#', '') +'" title="$'+ name +': '+ color +';" style="background: '+color+'"></div>';
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
