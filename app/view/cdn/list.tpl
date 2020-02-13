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
        <h3>CDN站点列表</h3>
        <table class="ui celled table">
          <thead>
            <tr><th>项目名</th>
            <th>租户目录ID</th>
            <th>版本</th>
            <th>操作</th>
          </tr></thead>
          <tbody id="cdnList">
          </tbody>
        </table>
        <div class="ui card" id="packageUploadBox" style="display: none;">
          <div class="content">
            <div class="header">新增版本<div class="right floated"><i class="close icon" onclick="CDN.hideUpload(this)"></i></div></div>
          </div>
          <div class="image">
            <label style="height: 240px; text-align: center; display: inline-block; line-height: 240px; width: 100%;">
              点击/拖拽 .zip 文件上传
              <input style="display:none" onchange="CDN.selectedZip(this)" multiple="false" type="file" accept="application/zip,application/x-zip,application/x-zip-compressed" />
            </label>
          </div>
          <div class="content" id="uploadTenantInfo"></div>
          <div class="extra content" id="uploadAction" style="display: none">
            <div class="ui two buttons">
              <div class="ui basic red button" onclick="CDN.cancelUploadZip()">取消</div>
              <div class="ui basic green button" onClick="CDN.uploadZip()">上传</div>
            </div>
          </div>
        </div>
        <button class="ui button green" onclick="CDN.newSite(this)">新增CDN站点</button>
        
        <div id="newSite" style="display: none;">
            <div class="ui form" id="cdn">
              <div class="three fields">
                <div class="field">
                  <label>名称</label>
                  <input type="text" name="name" placeholder="输入项目名称">
                </div>
                <div class="field">
                  <label>目录ID</label>
                  <input type="text" name="tenantId" placeholder="租户目录ID">
                </div>
                <div class="field">
                  <label>版本</label>
                  <input type="text" name="version" placeholder="输入项目版本">
                </div>
              </div>
              <div class="two fields">
                <div class="field">
                  <label>访问地址</label>
                  <input type="text" name="homePage" placeholder="输入访问地址首页">
                </div>
                <div class="field">
                  <label>授权页地址</label>
                  <input type="text" name="authPage" placeholder="输入中间授权页地址">
                </div>
              </div>
              <div class="field">
                <label>资源上传地址</label>
                <div class="ui left labeled input">
                  <div class="ui dropdown label">
                    <div class="text">https://res.exexm.com/</div>
                    <i class="dropdown icon"></i>
                    <div class="menu">
                      <div class="item">https://res.exexm.com/</div>
                      <div class="item">https://eftcdn.exexm.com/</div>
                    </div>
                  </div>
                  <input type="text" name="resource" placeholder="输入项目资源上传最终地址">
                </div>         
              </div>
              <div class="field">
                <label>版本替换规则</label>
                <input type="text" name="rule" placeholder="正则表达式">
              </div>
              <button class="ui button" type="submit" onclick="CDN.createCdn()">提交</button>
            </div>
        </div>

        <div class="ui mini modal" id="deleteSite">
            <div class="header">警告</div>
            <div class="content">
                <p>删除后不可恢复，是否要删除该租户？</p>
            </div>
            <div class="actions">
              <div class="ui button" onclick="CDN.hideDeleteModal()">取消</div>
              <div class="ui red button" onclick="CDN.deleteCdn()">删除</div>
            </div>
        </div>
    </div>
  </body>
  <script>
    $(document).ready(function () {
        CDN.init();
    })
  </script>
</html>