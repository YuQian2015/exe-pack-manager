$(document).ready(function () {
    $(".add-pack").click(function() {
        $(this).toggleClass('blue').toggleClass('basic');
        if($(this).hasClass('blue')) {
            $(this).html('<i class="minus icon"></i> 移除打包');
            $('#'+$(this).data('tenant-id')).slideDown(200);
            
        } else {
            $(this).html('<i class="plus icon"></i> 加入打包');
            $('#'+$(this).data('tenant-id')).slideUp(200);
        }
    })
});