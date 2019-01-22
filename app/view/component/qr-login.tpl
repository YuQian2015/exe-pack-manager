{% macro field(type='text') %}
<div id="qrCodeLogin"> <div class="use-account" onclick="showLoginForm(this)"><i class="arrow left icon"></i>账号登录</div> 使用职行力App扫码登录 <br /><br /><img src='' style="display: none;" /> </div>
<script>
    $(document).ready(function () {
        getAppId();
    });
</script>
{% endmacro %}