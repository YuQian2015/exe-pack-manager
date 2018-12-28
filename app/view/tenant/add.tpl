<html>
  <head>
    <title>添加租户</title>
    {% include "../component/import.tpl" %}
  </head>
  <body>

  {% include "../component/menu.tpl" %}

    <div class="ui container">
    
        <div class="ui breadcrumb">
            <a href="/home" class="section">首页</a>
            <div class="divider"> / </div>
            <div class="active section">添加</div>
        </div>
        <div class="ui divider"></div>

        <form class="ui form" id="tenantForm" action="/tenant/create" method="post">
            <div class="field">
                <label>租户基础信息（必填）</label>
                <div class="fields">
                    <div class="four wide field">
                        <input type="text" name="tenantId" placeholder="输入租户ID">
                    </div>
                    <div class="four wide field">
                        <input type="text" name="appName" placeholder="输入应用名">
                    </div>
                    <div class="eight wide field">
                        <input type="text" name="tenantName" placeholder="输入租户名">
                    </div>
                </div>
            </div>
            <div class="ui error message"></div>
            <div class="ui segment">
                <div class="field">
                <div class="ui toggle checkbox">
                    <input type="checkbox" name="isCommon"" class="hidden">
                    <label>该租户是否是通用包租户</label>
                </div>
                </div>
            </div>


            <div class="ui segment">
                <div class="field">
                <div class="ui toggle checkbox">
                    <input type="checkbox" name="isCustomized" class="hidden">
                    <label>是否有定制</label>
                </div>
                </div>
            </div>

            <div class="field">
                <label>租户版本（必填）</label>
                <div class="six fields">
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="app" class="hidden">
                            <label>APP</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="wx" class="hidden">
                            <label>微信版</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="workWx" class="hidden">
                            <label>企业微信版</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="dd" class="hidden">
                            <label>钉钉版</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="inlay" class="hidden">
                            <label>内嵌版</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="pc" class="hidden">
                            <label>PC版</label>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="ui divider"></div>

            <div class="field">
                <label>租户地址信息（选填）</label>
                <div class="two fields">
                    <div class="field">
                        <!--<label>省份</label>-->
                        <select class="ui fluid dropdown" name="province">
                            <option value="0">请选择省份</option>
                            <option value="1">北京</option>
                            <option value="2">天津</option>
                            <option value="3">河北</option>
                            <option value="4">山西</option>
                            <option value="5">内蒙古</option>
                            <option value="6">辽宁</option>
                            <option value="7">吉林</option>
                            <option value="8">黑龙江</option>
                            <option value="9">上海</option>
                            <option value="10">江苏</option>
                            <option value="11">浙江省</option>
                            <option value="12">安徽</option>
                            <option value="13">福建</option>
                            <option value="14">江西</option>
                            <option value="15">山东</option>
                            <option value="16">河南</option>
                            <option value="17">湖北</option>
                            <option value="18">湖南</option>
                            <option value="19">广东</option>
                            <option value="20">广西</option>
                            <option value="21">海南</option>
                            <option value="22">重庆</option>
                            <option value="23">四川</option>
                            <option value="24">贵州</option>
                            <option value="25">云南</option>
                            <option value="26">西藏</option>
                            <option value="27">陕西</option>
                            <option value="28">甘肃</option>
                            <option value="29">青海</option>
                            <option value="30">宁夏</option>
                            <option value="31">新疆</option>
                            <option value="32">台湾</option>
                            <option value="33">香港特别行政区</option>
                            <option value="34">澳门特别行政区</option>
                            <option value="35">其他</option>
                        </select>
                    </div>
                    <div class="field">
                        <!--<label>地址</label>-->
                        <input type="text" name="address" placeholder="城市">
                    </div>
                </div>
            </div>

            <div class="field">
                <label>租户ICON</label>
                <div class="fields">
                    <div class="field">
                        {% include "../component/image-picker.tpl" %}
                    </div>
                </div>
            </div>

            <div class="field">
                <label>简介/描述（选填）</label>
                <textarea name="description"></textarea>
            </div>
            
            <div class="ui button" onclick="addTenant()">提交</div>
        </form>
    </div>
  </body>
</html>