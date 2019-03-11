var PACK_LIST = {
    page: 1,
    pageSize: 10
};

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
        requestHandler(
            'DELETE',
            "/api/v1/packs/" + id,
            {},
            function (data) {
                $('.mini.modal#deletePack').modal('hide');
                $(dom).parents(".pack-box").remove();
            });
    }
}

function activePack(dom) {
    var id = $(dom).data('id');
    requestHandler(
        'PUT',
        "/api/v1/packs/" + id,
        {
            active: true
        },
        function (data) {
            var html = '<div class="ui right floated button disabled basic mini green" onClick="activePack(this)"  data-id="'+id+'">' +
                '                        <i class="coffee icon"></i>打包中' +
                '                    </div>' +
                '                    <div class="ui right floated blue button basic mini" onClick="cancelPack(this)"  data-id="'+id+'">' +
                '                        <i class="reply icon"></i>取消' +
                '                    </div>';
            $(dom).parent(".right.floated.content").html(html);
        });
}

function testPack(dom) {
    var id = $(dom).data('id');
    requestHandler(
        'PUT',
        "/api/v1/packs/" + id,
        {
            testing: true
        },
        function (data) {
            var html = '<div class="ui right floated button basic  mini" onClick="removeTestPack(this)"  data-id="'+id+'">' +
                '移出测试' +
                '</div>';
            $(dom).parent(".right.floated.content").html(html);
        });
}

function removeTestPack(dom) {
    var id = $(dom).data('id');
    requestHandler(
        'PUT',
        "/api/v1/packs/" + id,
        {
            testing: false
        },
        function (data) {
            var html = '<div class="ui right floated green button basic  mini" onClick="activePack(this)"  data-id="'+id+'">' +
                '                        激活打包' +
                '                    </div>' +
                '                    <div class="ui right floated red button basic  mini" onClick="deletePack(this)"  data-id="'+id+'">' +
                '                        <i class="trash alternate outline icon"></i>删除' +
                '                    </div>' +
                '                    <div class="ui right floated violet button basic  mini" onClick="testPack(this)"  data-id="'+id+'">' +
                '                        加入测试' +
                '                    </div>' +
                '                    <div class="ui right floated button basic  mini" onClick="completePack(this)"  data-id="'+id+'">' +
                '                            <i class="arrow down icon"></i>加入历史' +
                '                        </div>';
            $(dom).parent(".right.floated.content").html(html);
        });
}

function cancelPack(dom) {
    var id = $(dom).data('id');
    requestHandler(
        'PUT',
        "/api/v1/packs/" + id,
        {
            active: false
        },
        function (data) {
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
        });
}

function completePack(dom) {
    var id = $(dom).data('id');
    requestHandler(
        'PUT',
        "/api/v1/packs/" + id,
        {
            complete: true
        },
        function (data) {
            $(dom).parents(".pack-box").remove();
        });
}

function getPackList(dom) {
    requestHandler(
        'GET',
        "/pack/tenants?"+$(dom).data('type')+"=true",
        '',
        function (data) {
            var html = '';
            var selectedHtml = '';
            $.each(data, function (i, item) {
                var icon = item.icon?item.icon:"http://exe.moyufed.com/1545874424004.png";
                html += '<tr class="selectable-line">' +
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
            new DragSelect({
                selectables: document.getElementsByClassName('selectable-line'),
                area: document.getElementById('packSelectArea'),
                callback: function (el) {
                    $.each(el, function (index, item) {
                        var tenantId = $(item).find('.add-pack').data('tenant-id');
                        var isChecked = $(item).find('[type="checkbox"]').prop('checked');
                        $('#pack-'+tenantId).slideToggle(200);
                        $(item).find('[type="checkbox"]').prop('checked', !isChecked).parents("tr").toggleClass('active');;
                    });
                }
            });
        });
}

function goToPack() {
    window.location.href = '/pack';
}

function selectPackByCode() {
    try {
        var array = eval($("#selectPackByCode").val());
        $.each(array, function (i, tenantId) {
            $('#pack-' + tenantId).slideDown(200);
            $('.add-pack[data-tenant-id="'+tenantId+'"] [type="checkbox"]').prop('checked', true).parents("tr").addClass('active');
        })
    } catch (e) {
        toast(e, 2000)
    }
}

function showPackHistory() {
    window.location.href = '/pack/history'
}

function changeRemind(dom) {
    if(dom.checked) {
        $("#addRemind").show();
    } else {
        $("#addRemind").hide();
    }
}

function initPacks() {
    // var canvas = document.querySelector('#packSelector'),
    //     readout = document.querySelector('#readout'),
    //     context=canvas.getContext('2d'),
    //     spritesheet=new Image();
    //
    // canvas.width = $(window).width();
    // canvas.height = $(window).height();
    //
    // //将相对于窗口的鼠标坐标转换为canvas坐标
    // function windowToCanvas(canvas,x,y){
    //     /**
    //      在canvas对象上调用getBoundingClientRect()方法，
    //      来获取canvas元素的边界框，
    //      该边界框的坐标是相对于整个窗口的。
    //      然后返回一个对象，该对象的x、y属性分别对应于鼠标在canvas之中的坐标
    //      **/
    //     var bbox=canvas.getBoundingClientRect();
    //     return {x:x-bbox.left*(canvas.width/bbox.width),
    //         y:y-bbox.top*(canvas.height/bbox.height)
    //     };
    // }
    //
    //
    // /*清除画布*/
    // function clear(){
    //     context.clearRect(0,0,canvas.width,canvas.height);
    // }
    //
    // //监听鼠标移动事件
    // var startPoint = {x:0,y:0};
    // var pressed = false;
    // canvas.onmousemove = function(e){
    //     endPoint = windowToCanvas(canvas, e.clientX, e.clientY);
    //     if(pressed) {
    //         clear();
    //         context.beginPath();
    //         context.moveTo(startPoint.x, startPoint.y);//起始位置
    //         context.lineTo(endPoint.x, endPoint.y);//停止位置
    //         context.lineWidth=1;
    //         context.strokeStyle="blue";
    //         context.stroke();
    //         context.stroke();
    //         context.closePath();
    //     }
    //     // var loc=windowToCanvas(canvas,e.clientX,e.clientY);
    //     // console.log('x='+e.clientX+' y='+e.clientY);
    //     // //绘制背景
    //     // drawBackground();
    //     // //绘制图像
    //     // drawSpritesheet();
    //     // //绘制横线和竖线
    //     // drawGuidelines(loc.x, loc.y);
    //     // //更新坐标label
    //     // updateReadout(loc.x, loc.y);
    // };
    //
    //
    // canvas.onmousedown = function(e){
    //     pressed = true;
    //     startPoint = windowToCanvas(canvas, e.clientX, e.clientY);
    //     console.log(startPoint)
    //     // startPoint = [e.clientX,e.clientY];
    //     // var loc=windowToCanvas(canvas,e.clientX,e.clientY);
    //     // console.log('x='+e.clientX+' y='+e.clientY);
    //     // //绘制背景
    //     // drawBackground();
    //     // //绘制图像
    //     // drawSpritesheet();
    //     // //绘制横线和竖线
    //     // drawGuidelines(loc.x, loc.y);
    //     // //更新坐标label
    //     // updateReadout(loc.x, loc.y);
    // };
    //
    // canvas.onmouseup = function() {
    //     clear();
    //     pressed = false;
    // };
    //

    $('body')
    // .delegate('.add-pack', 'click', function (e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     var tenantId = $(this).data('tenant-id');
    //     var $listItem = $(this).parents('tr');
    //     $listItem.toggleClass('active');
    //     if ($listItem.hasClass('active')) {
    //         $('#pack-' + tenantId).slideDown(200);
    //     } else {
    //         $('#pack-' + tenantId).slideUp(200);
    //         $(".add-all-pack").find('[type="checkbox"]').prop('checked', false);
    //     }
    // })
        .delegate('.add-all-pack', 'click', function (e) {
            if ($(this).find('[type="checkbox"]')[0].checked) {
                $('[id^="pack-"]').slideDown(200);
                $(".pack-table tr").addClass('active checked').find('[type="checkbox"]').prop('checked', true);
            } else {
                $('[id^="pack-"]').slideUp(200);
                $(".pack-table tr").removeClass('active').find('[type="checkbox"]').prop('checked', false);
            }
        });

    $("#submitPack").click(function () {
        var tenants = [];
        $.each($('[id^="pack-"]:visible'), function (i, item) {
            tenants.push($(item).data('id'));
        });
        var type = parseInt($("#packType").val());
        var title = $("#packTitle").val();
        var note = $("#packNote").val();
        requestHandler(
            'POST',
            "/api/v1/packs",
            {
                "type": type,
                "tenants": tenants,
                "title": title,
                "note": note
            },
            function (data) {
                window.location.href = "pack/list";
            });
    });

    // https://github.com/ThibaultJanBeyer/DragSelect
    new DragSelect({
        selectables: document.getElementsByClassName('selectable-line'),
        area: document.getElementById('packSelectArea'),
        callback: function (el) {
            $.each(el, function (index, item) {
                var tenantId = $(item).find('.add-pack').data('tenant-id');
                var isChecked = $(item).find('[type="checkbox"]').prop('checked');
                $('#pack-' + tenantId).slideToggle(200);
                $(item).find('[type="checkbox"]').prop('checked', !isChecked).parents("tr").toggleClass('active');
            });
        }
    });
}

function initPackHistory() {
    loadPacks();
}

function loadPacks() {
    function getText(text) {
        return text?text:'';
    }

    requestHandler(
        'GET',
        "/api/v1/packs",
        PACK_LIST,
        function (data) {
            var html = '';
            $.each(data, function (index, item) {
                html += '<div class="ui clearing segment">' + '【' + formatDate(item.createDate) + '】' + ' > ' + getText(item.title)  + ' > ' + getText(item.note) + '<a class="ui teal  circular label" style="float: right">'+item.tenants.length+'</a></div>';
            });
            if(data.length < PACK_LIST.pageSize) {
                $(".load-more").hide();
            }
            if(PACK_LIST.page > 1) {
                $("#packHistory").append(html);
            } else {
                $("#packHistory").html(html);
            }
        });
}


function loadMorePacks() {
    PACK_LIST.page ++;
    loadPacks();
}