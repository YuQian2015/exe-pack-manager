var UI = {
    initUiPage: function() {
        var clipboard = new ClipboardJS('.copy-btn');
        clipboard.on('success', function (e) {
            // console.info('Action:', e.action);
            // console.info('Text:', e.text);
            // console.info('Trigger:', e.trigger);
            toast('复制颜色成功 ' + '<div class="color-block" style="background: #' + e.text + '">' + e.text + '</div>');
            e.clearSelection();
        });
        clipboard.on('error', function (e) {
            // console.error('Action:', e.action);
            // console.error('Trigger:', e.trigger);
        });
        this.getUiData();
        this.getTenant();
    },
    getUiData: function() {
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
                        '<div class="tenant-id">' + item.tenantId + '</div>';
                    var cloneColor = _.cloneDeep(fullColor);
                    var colors = _.merge(cloneColor, item.colors);
                    _.forEach(colors, function (color, name) {
                        if (color !== '------') {
                            html += '<div  class="color-block copy-btn" data-clipboard-text="' + color.replace('#', '') + '" title="$' + name + ': ' + color + ';" style="background: ' + color + '"></div>';
                        } else {
                            html += '<div  class="color-block" title="未定义"></div>';
                        }
                    });
                    html += '</div>';
                });
                $("#tenantColors").html(html);
            });
    },
    getTenant: function () {
        requestHandler(
            'GET',
            "/api/v1/tenants",
            {
                isCommon: false,
                valid: true,
                wx: false,
                inlay: false,
                app: true,
                pc: false
            },
            function (data) {
                var html = '';
                console.log(data);
                function getThemeHtml(theme) {
                    if(theme) {
                        return '<div style="background: '+theme.brand+'">'+ theme.brand + '</div>'+'<div style="background: '+theme.primary+'">'+ theme.primary +'</div>'+'<div style="background: '+theme.secondary+'">'+ theme.secondary +'</div>'
                    } else {
                        return '<div>无</div><div>无</div><div >无</div>'
                    }
                }
                $.each(data, function (i, item) {
                    html += '<div class="tenant-theme" style="margin-bottom: 40px;"><h5>'+item.appName+'</h5><div>' + getThemeHtml(item.theme) + '</div></div>'
                });
                $("#tenantTheme").html(html)
            });
    }

};
