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

    /**
    * init form dialog
    * */
    static initForm() {
        let self = this;
        // khoi tao dialog
        this.FormDetail = $('.dialog-add-edit-customer').dialog({
            modal: true,
            autoOpen: false,
            minWidth: 652,
            minHeight: 345
        })

        $("#Birthday").datepicker({
            dateFormat: "dd/mm/yy"
        });
        $('.daypicker-btn').click(function () {
            $("#Birthday").focus();
        });

        $('.form-btns #form-cancel-btn').click(function () {
            self.FormDetail.dialog('close');
        })
    }
    /******************************************************************/

    /**
    * check required values of input tags
    * */
    static checkValue() {
        let inputs = $('input[required]');
        $(inputs).blur(function () {
            let val = $(this).val();
            if (!val) {
                $(this).addClass('border-red');
                $(this).next().css('display', 'inline').attr('title', 'bạn chưa nhập dữ liệu');
            } else {
                $(this).removeClass('border-red');
                $(this).next().css('display', 'none');
            }
        })
    }
    /******************************************************************/

    /**
     * reset style for all required inputs
     * */
    static resetStyleInputs() {
        $('input').val(''); // remove all values
        let inputs = $('input[required]');
        inputs.next('.error-icon').css('display', 'none'); // hide icon error
        inputs.removeClass('border-red'); // reset border
    }
    /******************************************************************/
}