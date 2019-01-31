<html>
  <head>
    <title>管理</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

  {% import "../component/menu.tpl" as menu %}
  {{ menu.field('/management') }}
    <div class="ui container">
        <div class="ui breadcrumb">
            <a href="/home" class="section">首页</a>
            <div class="divider"> / </div>
            <div class="active section">用户/权限</div>
        </div>
        <div class="ui divider"></div>
        <div id="userList" class="ui middle aligned divided list">
        </div>
    </div>
  </body>
</html>