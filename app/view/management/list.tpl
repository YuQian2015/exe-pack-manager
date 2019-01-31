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

        <div class="ui modal" id="userEdit">
            <div class="header">用户管理</div>
            <div class="content"><div class="field">
                 <!--<label>省份</label>-->
                 <select class="ui fluid dropdown" id="roleSelector" name="role">
                     <option value="0">请选择角色</option>
                 </select>
                 </div>
            </div>
            <div class="actions">
                <div class="ui cancel button">取消</div>
                <div class="ui approve green button">确定</div>
            </div>
        </div>
  </body>
</html>