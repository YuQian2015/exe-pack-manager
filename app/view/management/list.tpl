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
        <div class="ui grid">
          <div class="six wide column">
            <h4 class="ui header">用户列表</h4>
            <div id="userList" class="ui middle aligned divided list"></div>
          </div>
          <div class="ten wide column">
              <div class="ui top attached tabular menu">
                <a class="item active" data-tab="roles">角色列表</a>
                <a class="item" data-tab="policies">协议列表</a>
              </div>
              <div class="ui bottom attached tab segment active" data-tab="roles">
                  <div class="ui form">
                      <div class="fields">
                        <div class="twelve wide field">
                          <input type="text" id="roleInput" placeholder="输入角色名">
                        </div>
                        <div class="four wide field">
                          <button class="ui green button" onclick="addRole()">新增</button>
                        </div>
                      </div>
                  </div>
                  <div class="ui blue labels" id="roleList"></div>
              </div>
              <div class="ui bottom attached tab segment" data-tab="policies">
                    <div class="ui form">
                        <div class="fields">
                          <div class="twelve wide field">
                            <input type="text" id="policyInput" placeholder="[role，path， method]">
                          </div>
                          <div class="four wide field">
                            <button class="ui green button" onclick="addPolicy()">新增</button>
                          </div>
                        </div>
                    </div>
                <div id="policyList"></div>
              </div>
          </div>
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