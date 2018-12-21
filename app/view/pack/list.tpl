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
    <div class="ui tiny buttons">
        <button class="ui red basic button active" disabled>App</button>
        <button class="ui green basic button" disabled>微信版</button>
        <button class="ui teal basic button" disabled>企业微信</button>
        <button class="ui blue basic button" disabled>钉钉版</button>
        <button class="ui yellow basic button" disabled>内嵌版</button>
        <button class="ui brown basic button" disabled>PC版</button>
    </div>
    <div class="ui divider"></div>

    <div class="ui violet message">从以下租户列表选择要打包的租户，点击加入打包。</div>
    <div class="ui grid">
        <div class="three wide column">
            <p>1.选择租户</p>
            <div class="ui mini middle aligned selection celled list">
                {% for item in list %}
                    <div class="item" id="{{item.tenantId}}" style="display:none" >
                        {% if item.icon %} <img class="ui avatar image" src="{{ item.icon }}"> {% else %} <img class="ui avatar image" src="/public/image/logo@2x.png"> {% endif %}
                        <div class="content">
                            <div class="header">{{ item.appName }} {{ item.tenantId }}</div>
                        </div>
                    </div>
                {% endfor %}
            </div>
            <div class="ui divider"></div>
            <p>2.打包版本</p>
            <select class="ui fluid dropdown" name="province">
                <option value="1">App</option>
                <option value="2">微信版</option>
                <option value="3">企业微信</option>
                <option value="4">钉钉版</option>
                <option value="5">内嵌版</option>
                <option value="6">PC版</option>
            </select>
            <div class="ui divider"></div>
            <p>3.打包</p>
            <div class="ui attached bottom button">
                <i class="plus icon"></i> 加入打包
            </div>
        </div>
        <div class="thirteen wide column">
            <div class="ui three cards">
                {% for item in list %}
                    <div class="card">
                        <div class="content">
                            {% if item.icon %} <img class="right floated mini ui image" src="{{ item.icon }}"> {% else %} <img class="right floated mini ui image" src="/public/image/logo@2x.png"> {% endif %}
                            <div class="header">{{ item.appName }}</div>
                            <div class="meta">
                                <span class="date">{{ item.tenantId }}</span>
                            </div>
                            <div class="description">
                                {% if item.isCommon %}<div class="ui basic mini blue label">通用包</div>{% endif %}
                                {% if item.isCustomized %}<div class="ui basic mini pink label">定制</div>{% endif %}
                            </div>
                        </div>
                        <div class="ui bottom attached basic button add-pack" data-tenant-name="{{item.tenantName}}" data-tenant-id="{{item.tenantId}}">
                            <i class="plus icon"></i> 加入打包
                        </div>
                    </div>
                {% endfor %}
            </div>
        </div>
    </div>
    

  <div>
  </body>
</html>