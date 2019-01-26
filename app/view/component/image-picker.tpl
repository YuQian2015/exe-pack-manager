{% macro field(url='', id='imageSelector') %}
    <div class="imageSelector" id="{{id}}">
        {% if url %}
            <img class="resultImagePrev" src="{{url}}">
        {% else %}
            浏览图片
        {% endif %}
    </div>
    <input style="display: none;" onchange="imageSelectorChange(this)" id="{{id}}Holder" type="file" accept="image/*" />
    <input type="hidden" name="icon" id="{{id}}Filed" value="{{url}}" />

    <div class="ui large modal imageCropperModal" id="{{id}}CropperModal">
        <div class="header">图片裁剪</div>
        <div class="content">
          <div class="ui grid">
            <div class="twelve wide column" id="{{id}}CropperContainer"></div>
            <div class="four wide column">
              <div class="ui card">
                <a class="image">
                  <img id="{{id}}Result">
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="actions">
            <div class="ui cancel button">关闭</div>
            <div class="ui approve blue button">确认</div>
        </div>
    </div>

    <div class="ui large modal" id="{{id}}Modal">
        <i class="close icon"></i>
        <div class="header">图片选择<label class="ui approve blue button right floated" for="{{id}}Holder">添加图片</label></div>
            <div class="scrolling content">
                <div id="{{id}}Content" class="ui six cards"></div>
            </div>
        <div class="actions">
            <div id="pagePagination" class="ui mini basic buttons"></div>
        </div>
    </div>


        <div class="ui mini modal" id="deleteImageConform">
            <div class="header">警告</div>
            <div class="content">
                <p>删除之后不能恢复？</p>
            </div>
            <div class="actions">
                <div class="ui cancel button">取消</div>
                <div class="ui approve red button">删除</div>
            </div>
        </div>

    <script>
        $(document).ready(function () {
            bindImageSelector('{{id}}');
        });
    </script>
{% endmacro %}