<html>
  <head>
    <title>编辑租户</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

  {% import "../component/menu.tpl" as menu %}
  {{ menu.field('') }}

    <div class="ui container">
        <div class="ui breadcrumb">
            <a href="/home" class="section">首页</a>
            <div class="divider"> / </div>
            <div class="active section">编辑</div>
        </div>
        <div class="ui divider"></div>
        <form class="ui form" id="tenantForm">
            <div class="field">
                <label>租户基础信息</label>
                <div class="fields">
                    <div class="four wide field">
                        <input type="text" name="tenantId" disabled value="{{tenant.tenantId}}" placeholder="输入租户ID">
                    </div>
                    <div class="four wide field">
                        <input type="text" name="appName" disabled value="{{tenant.appName}}" placeholder="输入应用名">
                    </div>
                    <div class="eight wide field">
                        <input type="text" name="tenantName" disabled value="{{tenant.tenantName}}" placeholder="输入租户名">
                    </div>
                </div>
            </div>

            <div class="ui segment">
                <div class="field">
                <div class="ui toggle checkbox">
                    <input type="checkbox" name="isCommon"" {% if tenant.isCommon %} checked {% endif %} class="hidden">
                    <label>该租户是否是通用包租户</label>
                </div>
                </div>
            </div>


            <div class="ui segment">
                <div class="field">
                <div class="ui toggle checkbox">
                    <input type="checkbox" name="isCustomized" {% if tenant.isCustomized %} checked {% endif %} class="hidden">
                    <label>是否有定制</label>
                </div>
                </div>
            </div>

            <div class="field">
                <label>租户版本</label>
                <div class="six fields">
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="app" {% if tenant.app %} checked {% endif %} class="hidden">
                            <label>APP</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="wx" {% if tenant.wx %} checked {% endif %} class="hidden">
                            <label>微信版</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="workWx" {% if tenant.workWx %} checked {% endif %} class="hidden">
                            <label>企业微信版</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="dd" {% if tenant.dd %} checked {% endif %} class="hidden">
                            <label>钉钉版</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="inlay" {% if tenant.inlay %} checked {% endif %} class="hidden">
                            <label>内嵌版</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="pc" {% if tenant.pc %} checked {% endif %} class="hidden">
                            <label>PC版</label>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="ui divider"></div>

            <div class="field">
                <label>租户地址信息</label>
                <div class="two fields">
                    <div class="field">
                        <!--<label>省份</label>-->
                        <select class="ui fluid dropdown" name="province">
                            <option value="0" {% if tenant.province == 0 %} selected {% endif %}>省份</option>
                            <option value="1" {% if tenant.province == 1 %} selected {% endif %}>北京</option>
                            <option value="2" {% if tenant.province == 2 %} selected {% endif %}>天津</option>
                            <option value="3" {% if tenant.province == 3 %} selected {% endif %}>河北</option>
                            <option value="4" {% if tenant.province == 4 %} selected {% endif %}>山西</option>
                            <option value="5" {% if tenant.province == 5 %} selected {% endif %}>内蒙古</option>
                            <option value="6" {% if tenant.province == 6 %} selected {% endif %}>辽宁</option>
                            <option value="7" {% if tenant.province == 7 %} selected {% endif %}>吉林</option>
                            <option value="8" {% if tenant.province == 8 %} selected {% endif %}>黑龙江</option>
                            <option value="9" {% if tenant.province == 9 %} selected {% endif %}>上海</option>
                            <option value="10" {% if tenant.province == 10 %} selected {% endif %}>江苏</option>
                            <option value="11" {% if tenant.province == 11 %} selected {% endif %}>浙江省</option>
                            <option value="12" {% if tenant.province == 12 %} selected {% endif %}>安徽</option>
                            <option value="13" {% if tenant.province == 13 %} selected {% endif %}>福建</option>
                            <option value="14" {% if tenant.province == 14 %} selected {% endif %}>江西</option>
                            <option value="15" {% if tenant.province == 15 %} selected {% endif %}>山东</option>
                            <option value="16" {% if tenant.province == 16 %} selected {% endif %}>河南</option>
                            <option value="17" {% if tenant.province == 17 %} selected {% endif %}>湖北</option>
                            <option value="18" {% if tenant.province == 18 %} selected {% endif %}>湖南</option>
                            <option value="19" {% if tenant.province == 19 %} selected {% endif %}>广东</option>
                            <option value="20" {% if tenant.province == 20 %} selected {% endif %}>广西</option>
                            <option value="21" {% if tenant.province == 21 %} selected {% endif %}>海南</option>
                            <option value="22" {% if tenant.province == 22 %} selected {% endif %}>重庆</option>
                            <option value="23" {% if tenant.province == 23 %} selected {% endif %}>四川</option>
                            <option value="24" {% if tenant.province == 24 %} selected {% endif %}>贵州</option>
                            <option value="25" {% if tenant.province == 25 %} selected {% endif %}>云南</option>
                            <option value="26" {% if tenant.province == 26 %} selected {% endif %}>西藏</option>
                            <option value="27" {% if tenant.province == 27 %} selected {% endif %}>陕西</option>
                            <option value="28" {% if tenant.province == 28 %} selected {% endif %}>甘肃</option>
                            <option value="29" {% if tenant.province == 29 %} selected {% endif %}>青海</option>
                            <option value="30" {% if tenant.province == 30 %} selected {% endif %}>宁夏</option>
                            <option value="31" {% if tenant.province == 31 %} selected {% endif %}>新疆</option>
                            <option value="32" {% if tenant.province == 32 %} selected {% endif %}>台湾</option>
                            <option value="33" {% if tenant.province == 33 %} selected {% endif %}>香港特别行政区</option>
                            <option value="34" {% if tenant.province == 34 %} selected {% endif %}>澳门特别行政区</option>
                            <option value="35" {% if tenant.province == 35 %} selected {% endif %}>其他</option>
                        </select>
                    </div>
                    <div class="field">
                        <!--<label>地址</label>-->
                        <input type="text" name="address" value="{{tenant.address}}" placeholder="输入租户地址">
                    </div>
                </div>
            </div>

            <div class="field">
                <label>租户ICON</label>
                <div class="fields">
                    <div class="field">
                        {% import "../component/image-picker.tpl" as imagePacker %}
                        {{ imagePacker.field(tenant.icon) }}
                    </div>
                </div>
            </div>
            
            <div class="field">
                <label>简介/描述</label>
                <textarea name="description" >{{tenant.description}}</textarea>
            </div>
            
            <div class="ui button" onclick="updateTenant('{{tenant._id}}')">提交</div>
            <div class="ui error message"></div>
        </form>
    </div>
  </body>
</html>