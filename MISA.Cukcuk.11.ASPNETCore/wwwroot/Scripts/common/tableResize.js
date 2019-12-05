$(document).ready(function () {
    tbResize();
})

/**
 * handle when resize table
 * */
function tbResize() {
    var startX, startWidth, $handle, $table, pressed = false;
    
    // mousedown event
    $('.table-resizable .resize-bar').on('mousedown', function (event) {

        // find index of 'td' in 'tr'
        let index = $(this).parent().index();
        // find 'th' according to index value
        $handle = $(this).parents('.table-resizable').find('th').eq(index);
        pressed = true;
        startX = event.pageX;
        startWidth = $handle.width();
        $table = $handle.closest('.table-resizable').addClass('resizing');
    });

    // mousemove event
    $('.table-resizable th, .table-resizable td').on('mousemove', function (event) {
        if (pressed) {
            $handle.css('min-width', startWidth + (event.pageX - startX));
        }
    });

    // mouseup event
    $('.table-resizable th, .table-resizable td').on('mouseup', function () {
        if (pressed) {
            $table.removeClass('resizing');
            pressed = false;
        }
    });

    // reset column width
    //$('.table-resizable thead').on('dblclick', function () {
    //    // Reset column sizes on double click
    //    $(this).find('th').css('width', '');
    //});
}

/******************************************************************/
