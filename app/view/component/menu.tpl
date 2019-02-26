
{% macro field(href) %}
<div class="ui borderless menu">
    <div class="ui container">
        <div class="header item"><img class="logo" src="/public/image/logo@2x.png">&nbsp;&nbsp;职行力租户信息管理系统</div>
        <a href="/pack/list" class="item {% if href=='/pack/list' %}active{% endif %}">打包列表</a>
        <a href="/file" class="item {% if href=='/file' %}active{% endif %}">文件浏览</a>
        <a href="/native" class="item {% if href=='/native' %}active{% endif %}">原生</a>
        <a href="/ui" class="item {% if href=='/ui' %}active{% endif %}">UI</a>
        <a href="/management" class="item {% if href=='/management' %}active{% endif %}">用户/权限</a>
        <a class="ui right floated dropdown item" id="userMenu"><span>游客</span> <i class="dropdown icon"></i>
            <div class="menu">
                <div class="item">用户信息</div>
                <div class="item" onclick="logout()">退出</div>
            </div>
        </a>
    </div>
</div>

<script>
    $(document).ready(function () {
        getMenuUser();
    })
</script>

{% endmacro %}

