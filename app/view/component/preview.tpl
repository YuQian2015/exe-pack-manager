
{% macro field(brand,  primary='#CCCCCC',  secondary='#CCCCCC') %}
<div class="preview-mode">
    <img class="iphone" src="/public/image/iPhoneX.png" />
    <div class="preview-page">
        <div class="preview-header" style="background: {{primary}}"></div>
        <div class="preview-content" style="background: #FFFFFF"></div>
        <div class="preview-footer tabs">
            <div class="tab"><i class="iconfont exe-tab-home" style="color: {{secondary}}"></i><p style="color: {{secondary}}">首页</p></div>
            <div class="tab"><i class="iconfont exe-tab-study-o" style="color: {{secondary}}"></i><p>学习</p></div>
            <div class="tab"><i class="iconfont exe-tab-found-o" style="color: {{secondary}}"></i><p>发现</p></div>
            <div class="tab"><i class="iconfont exe-tab-me-o" style="color: {{secondary}}"></i><p>我的</p></div>
        </div>
    </div>
</div>
{% endmacro %}
