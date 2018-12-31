{% macro  field(id='editor', tenantId,  placeholder='输入内容，记录信息') %}
<div class="record-editor" id="{{id}}">
</div>
<button data-tenant-id="{{tenantId}}" class="ui button blue" id="timeline-button">保存</button>

<div id="timeline" class="timeline-container">
</div>

<script>
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],

      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'font': [] }],
      // [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    Quill.register('modules/markdownShortcuts', MarkdownShortcuts)

    Quill.prototype.getHtml = function() {
        return this.container.firstChild.innerHTML;
    };
    var quill = new Quill('#{{id}}', {
        modules: {
            toolbar: toolbarOptions,
            markdownShortcuts: {},
        },
        theme: 'snow',
        placeholder: '{{placeholder}}',
    });

    var customButton = document.querySelector('#timeline-button');
    customButton.addEventListener('click', function() {
      var html = quill.getHtml();
      var text = quill.getText();
        if(!$.trim(text)) {
            alert('请输入内容');
            return;
        }
      saveTimeline(html, $(this).data('tenant-id'), function(data) {
        console.log(data);
        var html = '';
        html += '<div class="create-date">'+moment(data.createDate).format('YYYY-MM-DD HH:mm:ss')+'</div>' +
        '<div class="timeline-content">'+data.content+'</div>';
        $("#timeline").prepend(html);
        quill.setText('');
      })
    });

    $(document).ready(function () {
        loadTimeline('{{tenantId}}');
    });
</script>
{% endmacro %}
