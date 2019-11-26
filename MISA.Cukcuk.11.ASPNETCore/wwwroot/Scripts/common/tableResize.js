$(document).ready(function () {
    tbResize();
})

function tbResize() {
    var startX, startWidth, $handle, $table, pressed = false;
    
    // mousedown
    $('.table-resizable .resize-bar').on('mousedown', function (event) {
        /*
            $(this).parent() : td
            $(this).parent().parent() : tr
            $(this).parent().parent().parent() : tbody
            $(this).parent().parent().parent().parent() : table
        */

        // find index of 'td' in 'tr'
        let index = $(this).parent().index();
        // find 'th' according to index value
        $handle = $(this).parent().parent().parent().parent().find('th').eq(index);
        pressed = true;
        startX = event.pageX;
        startWidth = $handle.width();
        $table = $handle.closest('.table-resizable').addClass('resizing');
    });

    // mousemove
    $('.table-resizable th, .table-resizable td').on('mousemove', function (event) {
        if (pressed) {
            $handle.width(startWidth + (event.pageX - startX));
        }
    });

    // mouseup
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