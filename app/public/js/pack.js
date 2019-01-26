

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

function activePack(dom) {
    var id = $(dom).data('id');
    $.ajax({
        type: 'PUT',
        url: "/api/v1/packs/" + id,
        contentType: 'application/json',
        data: JSON.stringify({
            active: true
        }),
        success: function (res) {
            if (res && res.success) {
                var html = '<div class="ui right floated button disabled basic mini green" onClick="activePack(this)"  data-id="'+id+'">' +
                    '                        <i class="coffee icon"></i>打包中' +
                    '                    </div>' +
                    '                    <div class="ui right floated blue button basic mini" onClick="cancelPack(this)"  data-id="'+id+'">' +
                    '                        <i class="reply icon"></i>取消' +
                    '                    </div>';
                $(dom).parent(".right.floated.content").html(html);
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}


function cancelPack(dom) {
    var id = $(dom).data('id');
    $.ajax({
        type: 'PUT',
        url: "/api/v1/packs/" + id,
        contentType: 'application/json',
        data: JSON.stringify({
            active: false
        }),
        success: function (res) {
            if (res && res.success) {
                var html = '<div class="ui right floated green button basic mini" onClick="activePack(this)"  data-id="'+id+'">' +
                    '                        激活打包' +
                    '                    </div>' +
                    '                    <div class="ui right floated red button basic mini" onClick="deletePack(this)"  data-id="'+id+'">' +
                    '                        <i class="trash alternate outline icon"></i>删除' +
                    '                    </div>' +
                    '       <div class="ui right floated button basic mini" onClick="completePack(this)"  data-id="'+ id +'">' +
                    '           <i class="arrow down icon"></i>加入历史' +
                    '       </div>';
                $(dom).parent(".right.floated.content").html(html);
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

function completePack(dom) {
    var id = $(dom).data('id');
    $.ajax({
        type: 'PUT',
        url: "/api/v1/packs/" + id,
        contentType: 'application/json',
        data: JSON.stringify({
            complete: true
        }),
        success: function (res) {
            if (res && res.success) {
                $(dom).parents(".pack-box").remove();
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

function getPackList(dom) {
    $.ajax({
        type: 'GET',
        url: "/api/v1/packs?"+$(dom).data('type')+"=true",
        contentType: 'application/json',
        data: '',
        success: function (res) {
            if (res && res.success) {
                console.log(res)
                var html = '';
                var selectedHtml = '';
                $.each(res.data, function (i, item) {
                    var icon = item.icon?item.icon:"http://exe.moyufed.com/1545874424004.png";
                    html += '<tr>' +
                        '<td class="center aligned" data-label="icon">' +
                        '   <img src="'+icon+'?imageView2/5/w/20/h/20" />' +
                        '</td>' +
                        '<td data-label="tenantId">'+ item.tenantId +'</td>' +
                        '<td data-label="appName">'+ item.appName +'</td>' +
                        '<td data-label="tenantName">'+ item.tenantName +'</td>' +
                        '<td class="center aligned" data-label="check">' +
                        '   <div class="ui checkbox add-pack" data-tenant-name="'+ item.tenantName +'" data-tenant-id="'+item.tenantId+'">' +
                        '       <input type="checkbox">' +
                        '   </div>' +
                        '</td>' +
                    '</tr>';
                    selectedHtml +=
                        '<div class="item" id="pack-'+item.tenantId+'" data-id="'+item._id+'" style="display:none" >' +
                        '   <div class="content">' +
                        '       <div class="header">'+ item.appName +' ('+ item.tenantId +')</div>' +
                        '   </div>' +
                        '</div>';
                });
                $("#packList").html(html).find('.ui.checkbox').checkbox();
                $("#selectedList").html(selectedHtml);
                $(dom).removeClass('basic').siblings().addClass('basic');
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

$(document).ready(function () {
    $('body').delegate('.add-pack', 'click', function (e) {
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
    }).delegate('.add-all-pack', 'click', function (e) {
        if($(this).find('[type="checkbox"]')[0].checked){
            $('[id^="pack-"]').slideDown(200);
            $(".pack-table tr").addClass('active checked').find('[type="checkbox"]').prop('checked',true);
        } else {
            $('[id^="pack-"]').slideUp(200);
            $(".pack-table tr").removeClass('active').find('[type="checkbox"]').prop('checked', false);
        }
    });

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