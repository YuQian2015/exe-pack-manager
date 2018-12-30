
{% macro field(name, value='#CCCCCC', type='text') %}
<label class="color-picker-container" style="background: {{value}}">
    <input class="color-picker" type="{{ type }}" name="{{ name }}" value="{{ value | escape }}" />
</label>
{% endmacro %}
