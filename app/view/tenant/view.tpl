<html>
  <head>
    <title>租户详情</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

    {% include "../component/menu.tpl" %}


    <div class="ui container">
        <div class="ui breadcrumb">
            <a href="/home" class="section">首页</a>
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
                        <span class="date">创建于: {{ helper.formatTime(tenant.createDate) }}</span>
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


                <h3>主题设置</h3>
                <div id="themeSetting">
                    <input type="hidden" name="tenantId" value="{{ tenant._id }}" />
                    品牌颜色
                    {% import "../component/color-picker.tpl" as color %}
                    {{ color.field('brand', value=tenant.theme.brand, type='text') }}<br />
                    主要颜色
                    {% import "../component/color-picker.tpl" as color %}
                    {{ color.field('primary', value=tenant.theme.primary, type='text') }}<br />
                    次级颜色
                    {% import "../component/color-picker.tpl" as color %}
                    {{ color.field('secondary', value=tenant.theme.secondary, type='text') }}<br /><br />
                    <div class="ui button blue attached" onClick="setColor(this)" data-theme-id="{{tenant.theme._id}}">
                        确定
                    </div>
                </div>
            </div>
            <div class="twelve wide column">
                <div class="ui segment">
                    <h1 class="ui header" style="color:{{tenant.theme.brand}}">{{ tenant.tenantName }}</h1>
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
                <div class="ui grid">
                    <div class="nine wide column">
                        <p>{{ tenant.description }}</p>
                        {% import "../component/timeline.tpl" as editor %}
                        {{ editor.field(id='editor', tenantId=tenant._id) }}
                    </div>
                    <div class="seven wide column">
                        {% import "../component/preview.tpl" as iphone %}
                        {{ iphone.field(brand=tenant.theme.brand, primary=tenant.theme.primary, secondary=tenant.theme.secondary) }}
                    </div>
                </div>
            </div>
        </div>
        <div class="ui mini modal" id="deleteTenant">
            <div class="header">警告</div>
            <div class="content">
                <p>删除后不可恢复，是否要删除该租户？</p>
            </div>
            <div class="actions">
            </div>
        </div>
        <div class="ui mini modal" id="abateTenant">
            <div class="header">警告</div>
            <div class="content">
                <p>是否作废该租户？</p>
            </div>
            <div class="actions">
            </div>
        </div>
    <div>
  </body>
</html>
