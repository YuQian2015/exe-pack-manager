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
        <div class="active section">打包列表</div>
    </div>

    <div class="ui right floated button mini"><a href="/pack"><i class="boxes icon"></i>打包</a></div>
    <div class="ui divider"></div>
    {% for item in list.list %}
    <div class="pack-box">
        <div class="ui middle aligned divided list">
          <div class="item" style="padding-right: 10px;">
            <div class="right floated content">
                {% if item.active %}
                    <div class="ui right floated button disabled basic green  mini" onClick="activePack(this)"  data-id="{{ item._id }}">
                        <i class="coffee icon"></i>打包中
                    </div>
                    <div class="ui right floated blue button basic  mini" onClick="cancelPack(this)"  data-id="{{ item._id }}">
                        <i class="reply icon"></i>取消
                    </div>
                {% else %}
                    {% if item.testing != true %}
                        <div class="ui right floated green button basic  mini" onClick="activePack(this)"  data-id="{{ item._id }}">
                            激活打包
                        </div>
                        <div class="ui right floated red button basic  mini" onClick="deletePack(this)"  data-id="{{ item._id }}">
                            <i class="trash alternate outline icon"></i>删除
                        </div>
                        <div class="ui right floated violet button basic  mini" onClick="testPack(this)"  data-id="{{ item._id }}">
                            加入测试
                        </div>
                        {% if item.complete != true %}
                            <div class="ui right floated button basic  mini" onClick="completePack(this)"  data-id="{{ item._id }}">
                                <i class="arrow down icon"></i>加入历史
                            </div>
                        {% endif %}
                    {% endif %}
                    {% if item.testing == true %}
                        <div class="ui right floated button basic  mini" onClick="removeTestPack(this)"  data-id="{{ item._id }}">
                            移出测试
                        </div>
                    {% endif %}
                {% endif %}
            </div>
            <div class="content">
                <h3 class="ui header">【{{ helper.getPackType(item.type) }}】{{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;{{helper.formatTime(item.createDate)}} </h3>
            </div>
          </div>
        </div>
        <div class="pack-tenants">
            <div class="ui divider"></div>
            {% if item.note %}
                <div class="pack-note">
                    <div class="note-header">备注</div>
                    <div class="note-content">{{item.note}}</div>
                </div>
            {% endif %}
            <div class="pack-count">{{ item.tenants.length }}个租户</div>
            {% for t in item.tenants %}
                <div class="pack-tenant-name">
                    <img src="{% if t.icon %}{{t.icon}}{% else %}http://exe.moyufed.com/1545874424004.png{% endif %}?imageView2/5/w/40/h/40" />
                    <p>{{ t.appName }}</p>
                </div>
            {% endfor %}
        </div>
        <pre class="pack-tenant-code"><code class="plaintext">[{% for t in item.tenants %}"{{ t.tenantId }}",{% endfor %}]</code></pre>
    </div>
    {% endfor %}

        {% if list.count > 0 %}
            <div class="ui right floated primary button disabled">
              历史打包&nbsp;&nbsp;&nbsp;&nbsp;{{list.count}}条<i class="right chevron icon"></i>
            </div>
        {% endif %}
        <br />

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