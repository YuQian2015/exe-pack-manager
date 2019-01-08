<html>
  <head>
    <title>添加租户</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

  {% import "../component/menu.tpl" as menu %}
  {{ menu.field('/file') }}

    <div class="ui container">

        <div class="ui breadcrumb">
            <a href="/home" class="section">首页</a>
            <div class="divider"> / </div>
            <div class="active section">文件</div>
        </div>
        <div class="ui divider"></div>
        <div id="fileContainer" class="ui eight cards"></div>
    </div>
  </body>
</html>