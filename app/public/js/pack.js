

function deletePack(dom) {
    var cancelDom = $('<div class="ui button">取消</div>');
    var deleteDom = $('<div class="ui red button">删除</div>');
    $('#deletePack .actions').html("").append(cancelDom, deleteDom);
    $('.mini.modal#deletePack').modal('show');
    cancelDom.click(function () {
        $('.mini.modal#deletePack').modal('hide');
    });
    deleteDom.click(function () {
        deletePackFunc($(dom).data('id'))
    });



    function deletePackFunc(id) {
        $.ajax({
            type: 'DELETE',
            url: "/api/v1/packs/" + id,
            contentType: 'application/json',
            data: {},
            success: function (res) {
                if (res && res.success) {
                    $('.mini.modal#deletePack').modal('hide');
                    $(dom).parents(".pack-box").remove();
                }
            },
            error: function (error) {
                alert(error.msg);
            }
        });
    }
}


$(document).ready(function () {
    $(".add-pack").click(function(e) {
        var tenantId = $(this).data('tenant-id');
        var $listItem = $(this).parents('tr');
        $listItem.toggleClass('active');
        // e.preventDefault();
        if($listItem.hasClass('active')) {
            $('#pack-'+tenantId).slideDown(200);
        } else {
            $('#pack-'+tenantId).slideUp(200);
            $(".add-all-pack").find('[type="checkbox"]').prop('checked', false);
        }
    });

    $(".add-all-pack").click(
        function () {
            if($(this).find('[type="checkbox"]')[0].checked){
                $('[id^="pack-"]').slideDown(200);
                $(".pack-table tr").addClass('active checked').find('[type="checkbox"]').prop('checked',true);
            } else {
                $('[id^="pack-"]').slideUp(200);
                $(".pack-table tr").removeClass('active').find('[type="checkbox"]').prop('checked', false);
            }
        }
    );

    $("#submitPack").click(function () {
        var tenants = [];
        $.each($('[id^="pack-"]:visible'), function (i,item) {
            tenants.push($(item).data('id'));
        });
        var type = parseInt($("#packType").val());
        var title = $("#packTitle").val();
        var note = $("#packNote").val();
        $.ajax({
            type: 'POST',
            url: "/api/v1/packs/",
            contentType: 'application/json',
            data: JSON.stringify({
                "type": type,
                "tenants": tenants,
                "title": title,
                "note": note
            }),
            success: function (res) {
                if (res && res.success) {
                    window.location.href = "pack/list";
                }
            },
            error: function (error) {
                alert(error.msg);
            }
        });

    });
});