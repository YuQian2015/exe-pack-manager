<html>
  <head>
    <title>租户列表</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

  {% import "../component/menu.tpl" as menu %}
  {{ menu.field('') }}
  

  <div class="ui container">
    <div class="ui menu">
      <div class="item">
        <div class="ui action left icon input">
          <i class="search icon"></i>
          <input type="text" placeholder="输入搜索内容" disabled>
          <button disabled class="ui button">搜索</button>
        </div>
      </div>
      <div class="right menu">
        <a class="item" href="/tenant/add"><i class="plus circle icon"></i>添加</a>
        <a class="item" href="/pack"><i class="boxes icon"></i>打包</a>
      </div>
    </div>

    <div class="ui violet message">通过点击表头可以排序，深色的是通用包租户，灰色的是失效租户，绿色租户是有定制的租户。</div>
    <table class="ui celled small compact sortable table">
      <thead>
        <tr>
        <th></th>
        <th class="sorted descending">租户ID</th>
        <th>应用名</th>
        <th>租户名</th>
        <th class="center aligned">通用包</th>
        <th class="center aligned">定制</th>
        <th class="center aligned" style="color: gray;" >App版</th>
        <th class="center aligned" style="color: gray;" >微信版</th>
        <th class="center aligned" style="color: gray;" >企业微信版</th>
        <th class="center aligned" style="color: gray;" >钉钉版</th>
        <th class="center aligned" style="color: gray;" >内嵌版</th>
        <th class="center aligned" style="color: gray;" >PC版</th>
        <th class="center aligned" style="color: gray;" >操作</th>
        <th class="center aligned" style="color: gray;" >记录</th>
      </tr></thead>
      <tbody>
        {% for item in list %}
          <tr class="{% if item.valid == false %}disabled{% elif item.isCommon%}active{% endif %}">
            <td data-label="icon"> <img src="{% if item.icon %}{{item.icon}}{% else %}http://exe.moyufed.com/1545874424004.png{% endif %}?imageView2/5/w/20/h/20" /></td>
            <td data-label="tenantId" class="{% if item.isCustomized %}positive{% endif %} ">{{ item.tenantId }}</td>
            <td data-label="appName" class="{% if item.isCustomized %}positive{% endif %} ">{{ item.appName }}</td>
            <td data-label="tenantName" class="{% if item.isCustomized %}positive{% endif %} ">{{ item.tenantName }}</td>
            <td class="center aligned" data-label="isCommon"> {% if item.isCommon %} <i class="checkmark icon"></i> {% endif %} </td>
            <td class="center aligned" data-label="isCustomized"> {% if item.isCustomized %} <i class="checkmark icon"></i> {% endif %} </td>
            <td class="center aligned" data-label="app"> {% if item.app %} <i class="checkmark icon"></i> {% endif %} </td>
            <td class="center aligned" data-label="wx"> {% if item.wx %} <i class="checkmark icon"></i> {% endif %} </td>
            <td class="center aligned" data-label="workWx"> {% if item.workWx %} <i class="checkmark icon"></i> {% endif %} </td>
            <td class="center aligned" data-label="dd">{% if item.dd %} <i class="checkmark icon"></i> {% endif %} </td>
            <td class="center aligned" data-label="inlay">{% if item.inlay %} <i class="checkmark icon"></i> {% endif %} </td>
            <td class="center aligned" data-label="pc">{% if item.pc %} <i class="checkmark icon"></i> {% endif %} </td>
            <td class="center aligned" data-label="lock">
              {% if item.isLocked %} <i class="lock icon" onClick="lockTenant('{{ item._id }}', this)" data-content="已锁定，不能修改"></i>{% else %} <i onClick="lockTenant('{{ item._id }}', this)" class="unlock icon" data-content="锁定租户"></i> {% endif %}
            </td>
            <td data-label="province"><div class="ui mini button blue {% if item.valid == false %}disabled{% endif %}"onClick="viewTenant('{{ item._id }}')">查看</div></td>
          </tr>
        {% endfor %}
      </tbody>
    </table>
  <div>
  </body>
</html>