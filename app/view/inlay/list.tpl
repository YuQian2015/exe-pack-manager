<html>
  <head>
    <title>内嵌版</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

  {% import "../component/menu.tpl" as menu %}
  {{ menu.field('/inlay') }}
    <div class="ui container">
        <div class="ui breadcrumb">
            <a href="/home" class="section">首页</a>
            <div class="divider"> / </div>
            <div class="active section">内嵌版</div>
        </div>
        <div class="ui divider"></div>

        <h1>内嵌版对接</h1>
        <div class="inlay-table">
        <div class="slogan">
            <img src="http://exe.moyufed.com/eft.png?imageView2/5/w/60/h/60" />
            <div class="slogan-text">
                <div class="title">职行力大前端</div>
                <div class="description">每个字母都相比前一个字母少一笔，我们团队的目标是所开发的“产品”能化繁为简，简约而不简单。</div>
            </div>
        </div>
        <div id="featureList" class="feature-list"></div>
        <div id="newInlay" class="feature-list"></div>
        </div>
        <button class="ui button green" id="createInlay" onclick="createInlay()">新增平台</button>
        <button class="ui button blue" style="display: none" id="saveInlay" onclick="saveInlay()">保存</button>
        <button class="ui button" style="display: none" id="cancelInlay" onclick="cancelInlay()">取消</button>

              <div class="ui action input">
                <input id="featureName" type="text" placeholder="输入对接的功能">
                <button class="ui button" onclick="saveFeature()">保存</button>
              </div>
    </div>
  </body>
</html>