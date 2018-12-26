$(document).ready(function () {
    $(".add-pack").click(function() {
        $(this).toggleClass('blue').toggleClass('basic');
        if($(this).hasClass('blue')) {
            $(this).html('<i class="minus icon"></i> 移除打包');
            $('#pack-'+$(this).data('tenant-id')).slideDown(200);
            
        } else {
            $(this).html('<i class="plus icon"></i> 加入打包');
            $('#pack-'+$(this).data('tenant-id')).slideUp(200);
        }
    })

    $("#submitPack").click(function () {
        var tenants = [];
        $.each($('[id^="pack-"]:visible'), function (i,item) {
            tenants.push($(item).data('id'));
        });
        var type = parseInt($("#packType").val());
        $.ajax({
            type: 'POST',
            url: "/api/v1/packs/",
            contentType: 'application/json',
            data: JSON.stringify({
                "type": type,
                "tenants": tenants
            }),
            success: function (res) {
                if (res && res.success) {
                    window.location.href = "list";
                }
            },
            error: function (error) {
                alert(error.msg);
            }
        });

    })
});