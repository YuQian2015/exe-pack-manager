<html>
  <head>
    <title>打包历史</title>
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
        <div class="active section">打包历史</div>
    </div>
    <div class="ui divider"></div>
    <div id="packHistory"></div>
    <div class="load-more" onclick="loadMorePacks()">加载更多</div>
  <div>
  <script>
      $(document).ready(function () {
          initPackHistory();
      })
  </script>
  </body>
</html>
