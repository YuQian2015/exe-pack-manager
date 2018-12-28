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
            <a href="/tenant/add" class="section">添加</a>
            <div class="divider"> / </div>
            <div class="active section">{{ tenant.appName }}</div>
        </div>
        <div class="ui divider"></div>
        <div class="ui grid">
            <div class="four wide column">
                <div class="ui card">
                    <div class="image">
                        <img src="{% if tenant.icon %}{{tenant.icon}}{% else %}http://exe.moyufed.com/1545874424004.png{% endif %}">
                    </div>
                    <div class="content">
                        <a class="header">{{ tenant.appName }}（{{ tenant.tenantId }}）</a>
                        <div class="meta">
                        <span class="date">创建于: {{ tenant.createDate }}</span>
                        </div>
                        <div class="description">
                        {{ tenant.tenantName }}
                        </div>
                    </div>
                    <div class="extra content"><i class="map marker alternate icon"></i>{{ tenant.address }}</div>
                    {% if tenant.isLocked %}
                    <div class="ui button bottom attached disabled">
                        已锁定
                    </div>
                    {% else %}
                    <div class="ui buttons bottom attached">
                        <button class="ui button blue" onClick="editTenant('{{ tenant._id }}')">修改</button>
                        <button class="ui button" onClick="abateTenant(this)" data-id="{{ tenant._id }}">作废</button>
                        <button class="ui button red" onClick="deleteTenant(this)" data-id="{{ tenant._id }}">删除</button>
                    </div>
                    {% endif %}
                </div>
            </div>
            <div class="twelve wide column">
                <div class="ui segment">
                    <h1 class="ui header">{{ tenant.tenantName }}</h1>
                </div>
                {% if tenant.isCommon %} <a class="ui blue label">通用包</a> {% endif %}
                {% if tenant.isCustomized %} <a class="ui blue label">定制包</a> {% endif %}
                {% if tenant.app %} <a class="ui teal tag label">App版</a> {% endif %}
                {% if tenant.wx %} <a class="ui green tag label">微信版</a> {% endif %}
                {% if tenant.workWx %} <a class="ui blue tag label">企业微信版</a> {% endif %}
                {% if tenant.dd %} <a class="ui violet tag label">钉钉版</a> {% endif %}
                {% if tenant.inlay %} <a class="ui red tag label">内嵌版</a> {% endif %}
                {% if tenant.pc %} <a class="ui brown tag label">PC版</a> {% endif %}
                <div class="ui divider"></div>
                <p>{{ tenant.description }}</p>
            </div>
        </div>
    <div>
  </body>
</html>