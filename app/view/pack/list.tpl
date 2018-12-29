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
    <div class="pack-box">
        <div class="ui middle aligned divided list">
          <div class="item">
            <div class="right floated content">
                <!--<div class="ui right floated primary button">
                  查看历史打包<i class="right chevron icon"></i>
                </div>-->
                <div class="ui right floated red button" onClick="deletePack(this)"  data-id="{{ item._id }}">
                    <i class="trash alternate outline icon"></i>删除
                </div>
            </div>
            <div class="content">
                <h2 class="ui header">【{{ helper.getPackType(item.type) }}】{{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;{{helper.formatTime(item.createDate)}} </h2>
            </div>
          </div>
        </div>
        <div class="ui divider"></div>
        {{item.note}} 共打包 {{ item.tenants.length }} 个租户, 分别为
        <br />
        {% for t in item.tenants %}
            <div class="ui basic pink label" style="margin-top: 10px;">{{ t.appName }}</div>
        {% endfor %}
        <br />
        <pre><code class="plaintext">[{% for t in item.tenants %}"{{ t.tenantId }}",{% endfor %}]</code></pre>
    </div>
    {% endfor %}


        <div class="ui mini modal" id="deletePack">
            <div class="header">警告</div>
            <div class="content">
                <p>是否删除这笔打包？</p>
            </div>
            <div class="actions">
            </div>
        </div>
  <div>
  </body>
</html>