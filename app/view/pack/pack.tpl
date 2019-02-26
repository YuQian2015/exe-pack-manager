<html>
  <head>
    <title>租户列表</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

  {% import "../component/menu.tpl" as menu %}
  {{ menu.field('/pack/list') }}

  <div class="ui container">

    <div class="ui breadcrumb">
        <a href="/home" class="section">首页</a>
        <div class="divider"> / </div>
        <a href="/pack/list" class="section">打包列表</a>
        <div class="divider"> / </div>
        <div class="active section">打包</div>
    </div>
    <div class="ui divider"></div>
    <div class="ui tiny buttons">
        <button class="ui blue button" onclick="getPackList(this)" data-type='app'>App</button>
        <button class="ui blue basic button" onclick="getPackList(this)" data-type='wx'>微信版</button>
        <button class="ui blue basic button" onclick="getPackList(this)" data-type='workWx'>企业微信</button>
        <button class="ui blue basic button" onclick="getPackList(this)" data-type='dd'>钉钉版</button>
        <button class="ui blue basic button" onclick="getPackList(this)" data-type='inlay'>内嵌版</button>
        <button class="ui blue basic button" onclick="getPackList(this)" data-type='pc'>PC版</button>
    </div>
    <div class="ui divider"></div>

    <div class="ui violet message">从以下租户列表选择要打包的租户，点击/框选可加入打包。</div>
    <div class="ui grid">
        <div class="three wide column">
            <p>1.选择租户</p>
            <div id="selectedList" class="ui mini middle aligned selection celled list">
                {% for item in list %}
                    <div class="item" id="pack-{{item.tenantId}}" data-id="{{item._id}}" style="display:none" >
                        <div class="content">
                            <div class="header">{{ item.appName }} ({{ item.tenantId }})</div>
                        </div>
                    </div>
                {% endfor %}
            </div>
            <div class="ui divider"></div>
            <p>2.打包版本</p>
            <select class="ui fluid dropdown" id="packType" name="type">
                <option value="1">App</option>
                <option value="2">微信版</option>
                <option value="3">企业微信</option>
                <option value="4">钉钉版</option>
                <option value="5">内嵌版</option>
                <option value="6">PC版</option>
            </select>
            <div class="ui divider"></div>
            <p>3.打包</p>
            <form class="ui form">
              <div class="field">
                <input type="text" id="packTitle" placeholder="标题(可选)">
              </div>
              <div class="field">
                <input type="text" id="packNote" placeholder="备注(可选)">
              </div>
            </form>
            <div id="submitPack" class="ui attached button">
                <i class="plus icon"></i> 加入打包
            </div>
        </div>
        <div class="thirteen wide column pack-table">
            <div class="ui fluid action input">
                <input id="selectPackByCode" type="text" placeholder="[ '租户ID' , '租户ID' , ... , '租户ID' ]">
                <button onclick="selectPackByCode()" class="ui green labeled icon button">
                    <i class="code icon"></i> 执行
                </button>
            </div>
            <!--<canvas id="packSelector" width="100%" height="100%"></canvas>-->
            <table id="packSelectArea" class="ui celled small compact table">
                <thead>
                    <tr>
                        <th></th>
                        <th>租户ID</th>
                        <th>应用名</th>
                        <th>租户名</th>
                        <th class="center aligned">
                            <div class="ui checkbox add-all-pack" data-tenant-name="{{item.tenantName}}" data-tenant-id="{{item.tenantId}}">
                                <input  class="add-pack" type="checkbox">
                            </div>
                        </th>
                      </tr>
                  </thead>
                <tbody id="packList">
                {% for item in list %}
                    <tr class="selectable-line">
                        <td class="center aligned" data-label="icon">
                            <img src="{% if item.icon %}{{item.icon}}{% else %}http://exe.moyufed.com/1545874424004.png{% endif %}?imageView2/5/w/20/h/20" />
                        </td>
                        <td data-label="tenantId">{{ item.tenantId }}</td>
                        <td data-label="appName">{{ item.appName }}</td>
                        <td data-label="tenantName">{{ item.tenantName }}</td>
                        <td class="center aligned" data-label="check">
                            <div class="ui checkbox add-pack" data-tenant-name="{{item.tenantName}}" data-tenant-id="{{item.tenantId}}">
                                <input type="checkbox">
                            </div>
                        </td>

                    </tr>
                {% endfor %}
                </tbody>
            </table>
        </div>
    </div>


  <div>
  <script>
      $(document).ready(function () {
          initPacks();
      })
  </script>
  </body>
</html>