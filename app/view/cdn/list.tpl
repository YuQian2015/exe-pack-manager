<html>
  <head>
    <title>CDN</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

  {% import "../component/menu.tpl" as menu %}
  {{ menu.field('/cdn') }}
    <div class="ui container">
        <div class="ui breadcrumb">
            <a href="/home" class="section">首页</a>
            <div class="divider"> / </div>
            <div class="active section">CDN</div>
        </div>
        <div class="ui divider"></div>
        <h3>CDN列表</h3>
        <table class="ui celled table">
          <thead>
            <tr><th>项目名</th>
            <th>版本</th>
            <th>操作</th>
          </tr></thead>
          <tbody id="cdnList">
          </tbody>
        </table>
        <h3>新增CDN站点</h3>
        <div class="ui form" id="cdn">
        <input onchange="CDN.selectedZip(this)" multiple="false" type="file" accept="application/zip,application/x-zip,application/x-zip-compressed" />
          <div class="field">
            <label>名称</label>
            <input type="text" name="name" placeholder="输入项目名称">
          </div>
          <div class="field">
            <label>租户ID</label>
            <input type="text" name="version" placeholder="输入项目版本">
          </div>
          <div class="field">
            <label>版本</label>
            <input type="text" name="version" placeholder="输入项目版本">
          </div>
          <div class="field">
            <label>访问地址</label>
            <input type="text" name="homePage" placeholder="输入访问地址首页">
          </div>
          <div class="field">
            <label>授权页地址</label>
            <input type="text" name="authPage" placeholder="输入中间授权页地址">
          </div>
          <div class="field">
            <label>资源上传地址</label>
            <input type="text" name="resource" placeholder="输入项目资源上传最终地址">
          </div>
          <button class="ui button" type="submit" onclick="CDN.createCdn()">提交</button>
        </div>
    </div>
  </body>
  <script>
    $(document).ready(function () {
        CDN.init();
    })
  </script>
</html>