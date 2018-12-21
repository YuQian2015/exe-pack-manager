<input style="display: none;" id="imageUploader" type="file" accept="image/*" />
<input type="hidden" name="icon" id="iconFiled" />
<label class="image-upload" for="imageUploader">
  <i class="plus icon"></i>
  <img id="resultImagePrev">
</label>
<div class="ui large modal" id="imagePickerModal">
    <div class="header">图片裁剪</div>
    <div class="content">
      <div class="ui grid">
        <div class="twelve wide column"><img id="imagePicker" /></div>
        <div class="four wide column">
          <div class="ui card">
            <a class="image">
              <img id="resultImage">
            </a>
          </div>
        </div>
      </div>
      
    </div>
    <div class="actions"></div>
</div>