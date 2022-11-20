$(document).ready(function () {
    jQuery(".profile-email").find("a").contents().unwrap();
    

    jQuery('.input-edited').find('input[name=Name]').prop('required', true);
    jQuery('.input-edited').find('input[name=Category]').prop('required', true);
    jQuery('.input-edited').find('input[name=Estimate]').prop('required', true);

    jQuery('.tsk-section').each(function () {
        if (jQuery(this).find('.date-val').text().trim() == '01/01/0001') {
            jQuery(this).find('.date-val').text('None');
        }
        else {
        }
    });
    
    if (jQuery('.edit_task #DueDate').val() == '0001-01-01') {
        jQuery('.edit_task #DueDate').val('None');
    }
    if (jQuery('.del-date').text().trim() == '1/1/0001 12:00:00 AM') {
        jQuery('.del-date').text('None');
    }
    
    
    //jQuery('#DueDate').rules('remove', 'required');
    //jQuery("input#DueDate").prop('type', 'datetime-local');
    jQuery('.edit-task').text('');
    jQuery(".edit-task").append("<span class='glyphicon glyphicon-edit'></span>");

    jQuery('.delete-task').text('');
    jQuery(".delete-task").append("<span class='glyphicon glyphicon-trash'></span>");

    jQuery('.announcement-bar .ico-times').hide();

    jQuery("#searchtxt").hide();
    jQuery("#search_button").hover(
        function () {
            jQuery("#searchtxt").fadeIn();
        }, function () {
            jQuery("#searchtxt").fadeIn();
        }
    );

    jQuery("#searchtxt").hover(
        function () {
            jQuery("#searchtxt").fadeIn();
        }, function () {
            if (jQuery("#searchtxt").val == "") {
                jQuery("#searchtxt").fadeOut();
            }
            else {
                jQuery("#searchtxt").fadeIn();
            }
        }
    );

    jQuery(".announcement-bar").hover(
        function () {
            jQuery(this).find(".ico-times").fadeIn();
        }, function () {
            jQuery(this).find(".ico-times").fadeOut();
        }
    );
    jQuery(".announcement-bar .ico-times").click(function () {
        jQuery(".announcement-bar").fadeOut();
        jQuery('.announcement-bar-help').fadeIn();
    });
    jQuery('.announcement-bar-help').hide();
    jQuery(".announcement-bar-help .info-sign").click(function () {
        jQuery(".announcement-bar-help").fadeOut();
        jQuery(".announcement-bar").fadeIn();
    });
    jQuery(".dropdown").click(function () {
        jQuery(this).toggleClass('clicked');
        if (jQuery(this).hasClass('clicked')) {
            jQuery(this).find(".dropdown-content").fadeIn();
            jQuery(this).find(".dropdown-content").css("display",'flex');
        }
        else {
            jQuery(this).find(".dropdown-content").fadeOut();
        }
       
    });

    var sortedDivs = jQuery("#ToDo").find(".tsk-section").toArray().reverse(sorter);
    jQuery.each(sortedDivs, function (index, value) {
        jQuery("#ToDo").append(value);
    });

    var sortedDivsDoing = jQuery("#Doing").find(".tsk-section").toArray().reverse(sorter);
    jQuery.each(sortedDivsDoing, function (index, value) {
        jQuery("#Doing").append(value);
    });

    var sortedDivsDone = jQuery("#Done").find(".tsk-section").toArray().reverse(sorter);
    jQuery.each(sortedDivsDone, function (index, value) {
        jQuery("#Done").append(value);
    });

    
});

function sorter(a, b) {
    return a.getAttribute('message_count') - b.getAttribute('message_count');
};

$(".child").draggable({
    revert: true
});

$(".parent").droppable({
    accept: '.child',
    drop: function (event, ui) {
        $(this).append($(ui.draggable));
       // var param = $(ui.draggable).attr('parameters')
       //param_split = param.split('|');

        
        /*var _todos = {};
        _todos.Id = $(ui.draggable).attr('id');
        _todos.Name = param_split[0];
        _todos.Category = param_split[1];
        _todos.Estimate = param_split[2];
        _todos.DueDate = param_split[3];
        _todos.Importance = param_split[4]
        _todos.Status = $(this).attr('id');
        */

        var _todos = {};
        _todos.Id = $(ui.draggable).attr('id');
        _todos.Name = $(ui.draggable).find('.title-val').text();
        _todos.Category = $(ui.draggable).find('.cat-val').text();
        _todos.Estimate = $(ui.draggable).find('.est-val').text();
        _todos.DueDate = $(ui.draggable).find('.date-val').text();
        _todos.Importance = $(ui.draggable).find('.imp-val').text();
        _todos.Status = $(this).attr('id');
        


        $.ajax({
            type: "POST",
            url: '/ToDos/Edit/'+$(ui.draggable).attr('id'),
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(_todos),
            success: function (responce) {

                $.ajax({
                    type: "GET",
                    url: '/ToDos/Index',
                    contentType: "application/json; charset=utf-8",
                    data: '',
                    success: function (responce) {
                    },
                    error: (error) => {
                        console.log(JSON.stringify(error));
                    }
                });

            },
            error: (error) => {
                console.log(JSON.stringify(error));
            }
        });
        
    }
    
});


function replaceText() {

    $("body").find(".highlight").contents().unwrap();

    var searchword = $("#searchtxt").val();
    var custfilter = new RegExp(searchword, "ig");
    console.log(custfilter);
    var repstr = "<span class='highlight'>" + searchword + "</span>";

    if (searchword != "") {
        $('.title-val').each(function () {
            $(this).html($(this).html().replace(custfilter, repstr));
        })
    }
        $('#searchtxt').attr('value', searchword);
 

}


