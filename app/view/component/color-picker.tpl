
{% macro field(name, value='#CCCCCC', type='text') %}
<div class="color-picker-container" style="background: {{value}}"></div>
<div class="ui input">
    <input class="color-picker" maxlength="7" type="{{ type }}" name="{{ name }}" value="{{ value | escape }}" />
</div>
{% endmacro %}
