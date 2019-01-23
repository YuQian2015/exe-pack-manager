{% macro field(id='imageSelector') %}
    <div class="imageSelector" id="{{id}}">
        浏览图片
    </div>
    <input style="display: none;" onchange="imageSelectorChange(this)" id="{{id}}Holder" type="file" accept="image/*" />
    <input type="hidden" name="icon" id="{{id}}Filed" />

    <div class="ui large modal imageCropperModal" id="{{id}}CropperModal">
        <div class="header">图片裁剪</div>
        <div class="content">
          <div class="ui grid">
            <div class="twelve wide column"><img class="imageCropper" id="{{id}}Cropper" /></div>
            <div class="four wide column">
              <div class="ui card">
                <a class="image">
                  <img id="{{id}}Result">
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="actions"></div>
    </div>

    <div class="ui large modal" id="{{id}}Modal">
        <div class="header">图片选择</div>
            <div class="content">
                <div id="{{id}}Content" class="ui six cards image-selector-content"></div>
            </div>
        <div class="actions" id="{{id}}Actions"></div>
    </div>

    <script>
        $(document).ready(function () {
            bindImageSelector('{{id}}');
        });
    </script>
{% endmacro %}