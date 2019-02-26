<html>
  <head>
    <title>添加租户</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

  {% import "../component/menu.tpl" as menu %}
  {{ menu.field('/ui') }}

    <div class="ui container">

        <div class="ui breadcrumb">
            <a href="/home" class="section">首页</a>
            <div class="divider"> / </div>
            <div class="active section">UI</div>
        </div>
        <div class="ui divider"></div>
        <h3>租户品牌色</h3>
        <div id="tenantTheme"></div>
        <h3>v2租户颜色分析</h3>
        <div class="ui violet message">本数据从v2项目样式文件抽取出来，鼠标放到色块上可以查看定义的颜色变量，点击色块可以复制颜色。</div>
        <div id="tenantColors"></div>
    </div>
  </body>
  <script>
    $(document).ready(function () {
        UI.initUiPage();
    })
  </script>
</html>