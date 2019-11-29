$(document).ready(function () {
    CommonJS.initEvent();
})

class CommonJS {

    /**
     * format date for string
     * @param {any} dateString
     */
    static formatStringDate(dateString) {
        let newDateString = new Date(dateString);
        let date = newDateString.getDate();
        let month = newDateString.getMonth() + 1;
        let year = newDateString.getFullYear();

        date = date < 10 ? "0" + date : date;
        month = month < 10 ? "0" + month : month;
        return date + "/" + month + "/" + year;
    }

    /******************************************************************/

    /**
     * format currency for string
     * @param {any} currencyString
     */
    static formatCurrency(currencyString) {
        return currencyString.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }

    /******************************************************************/

    /**
     * init all common event
     * */

    static initEvent() {
        // handle when click account avatar
        $(function () {
            let accountIcon = $('.header-right .account');
            let accountBox = $('.header-right .account-box');

            accountIcon.click(function () {
                event.stopPropagation();
                accountBox.css('display', 'block');
            })

            $(window).click(function () {
                //Hide the menus if visible
                accountBox.css('display', 'none');
            });
        });

        //---------------------------------------------------//

        // custom select dropdown
        $(function () {
            $(".dropdown-custom").selectmenu();
        });
        //---------------------------------------------------//

        //handle when click outside table: disable update button and reset background of tr
        $(function () {
            $('.data-table tbody, .ui-draggable.ui-resizable, .update').click(function () {
                event.stopPropagation();
            })

            $(window).click(function () {
                //Hide the menus if visible
                $('.data-table tbody tr').css('background', 'none');
                let updateBtn = $('.update');
                updateBtn.attr('disabled', true);
            });
        });
        //---------------------------------------------------//
    }

    /******************************************************************/
}