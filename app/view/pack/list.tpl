<html>
  <head>
    <title>租户列表</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

  {% include "../component/menu.tpl" %}
  
  <div class="ui container">

    <div class="ui breadcrumb">
        <a href="/home" class="section">首页</a>
        <div class="divider"> / </div>
        <div class="active section">打包</div>
    </div>
    <div class="ui divider"></div>
    {% for item in list %}
        <h4 class="ui header">{{ helper.getPackType(item.type) }}打包租户（ {{helper.formatTime(item.createDate)}} ）</h4>
        <div class="ui divider"></div>
        共打包 {{ item.tenants.length }} 个租户, 分别为
        {% for t in item.tenants %}
            <div class="ui basic mini pink label">{{ t.tenantId }}</div>
        {% endfor %}
    {% endfor %}
  <div>
  </body>
</html>