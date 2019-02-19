<html>
  <head>
    <title>租户列表</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

  {% import "../component/menu.tpl" as menu %}
  {{ menu.field('/native') }}

  <div class="ui container">

    <div class="ui breadcrumb">
        <a href="/home" class="section">首页</a>
        <div class="divider"> / </div>
        <div class="active section">原生</div>
    </div>

    <div class="ui divider"></div>
    <div class="ui grid">
      <div class="eight wide column">
        <h3 class="ui header">密码管理</h3>
        <div class="ui clearing segment" onclick="toggleKeeperPwd(this)">
          <span>显示密码</span>
          <div style="float:right"><i class="chevron right icon"></i><i class="chevron down icon" style="display:none"></i></div>
        </div>
        <div class="ui segment" style="display:none">
            <div id="nativeBox"></div>
        </div>
      </div>
      <div class="eight wide column"></div>
    </div>

  <div>
  </body>
</html>