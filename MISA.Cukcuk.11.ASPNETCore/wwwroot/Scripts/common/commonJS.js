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
    * format date to datetime type
    * @param {any} dateString
    */
    static changeStringToDateTime(dateString) {
        let arrDate = dateString.split('/');
        let day = arrDate[0];
        let month = arrDate[1];
        let year = arrDate[2];
        let dateTime = year + '-' + month + '-' + day + 'T00:00:00';
        return dateTime;
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
            $('.data-table tbody, .ui-draggable.ui-resizable, .update, .delete').click(function () {
                event.stopPropagation();
            })

            $(window).click(function () {
                //Hide the menus if visible
                $('.data-table tbody tr').css('background', 'none');
                let updateBtn = $('.update');
                updateBtn.attr('disabled', true);
                let deleteBtn = $('.delete');
                deleteBtn.attr('disabled', true);
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
        this.FormAddSave = $('.dialog-add-edit').dialog({
            modal: true,
            autoOpen: false,
            minWidth: 652,
            minHeight: 350
        })

        $("#Birthday").datepicker({
            dateFormat: "dd/mm/yy"
        });
        $('.daypicker-btn').click(function () {
            $("#Birthday").focus();
        });

        $('.form-btns #form-cancel-btn').click(function () {
            self.FormAddSave.dialog('close');
        })

        this.FormDelete = $('.dialog-delete').dialog({
            modal: true,
            autoOpen: false
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

    /**
     * get all data from dialog form
     * */
    static getDataForm(tableID) {
        var fieldNames = $(tableID + ' [fieldName]');
        var object = {};
        $.each(fieldNames, function (index, item) {
            var fieldName = item.getAttribute('fieldName');
            var fieldValue = $(item).val();
            if (fieldName === "Birthday") {
                fieldValue = fieldValue ? CommonJS.changeStringToDateTime(fieldValue) : null;
            } else if (fieldName == "GroupCustomerID") {
                fieldValue = fieldValue ? fieldValue : null;
            }
            object[fieldName] = fieldValue;
        });
        return object;
    }
    /******************************************************************/

    /**
     * delete one row of table
     * */

    static deleteRowTable(code) {
        let rowsTable = $('.data-table tbody tr');
        $.each(rowsTable, function (index, row) {
            let firstTdText = $(row).children("td:first-child").text();
            if (firstTdText === code) {
                $(row).remove();
            }
        })
    }
    /******************************************************************/

}