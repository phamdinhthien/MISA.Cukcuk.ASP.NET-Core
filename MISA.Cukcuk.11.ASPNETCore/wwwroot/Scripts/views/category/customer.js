$(document).ready(function () {
    customerJS = new CustomerJS();
})

class CustomerJS extends Base {
    constructor() {
        super();
        this.init();
        this.loadData();
        this.initForm();
        this.initEvent();
        this.checkValue();
    }

    /**
     * init table to insert data
     * */
    init() {
        this.TableID = "#tbCustomers";
        this.EntityName = "Customers";
    }
    /**
     * init event :
     * add, update, save
     * */
    initEvent() {
        $('.add').on('click', this.addCustomer.bind(this));
        $('.update').on('click', this.updateCustomer.bind(this));
    }

    /**
     * check required values of input tags
     * */
    checkValue() {
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

    /**
     * reset style for all required inputs
     * */
    resetStyleInputs() {
        $('input').val(''); // remove all values
        let inputs = $('input[required]');
        inputs.next('.error-icon').css('display', 'none'); // hide icon error
        inputs.removeClass('border-red'); // reset border
    }
    /**
     * init form dialog
     * */
    initForm() {
        // khoi tao dialog
        this.FormCustomerDetail = $('.dialog-add-edit-customer').dialog({
            modal: true,
            autoOpen: false
        })

        $('.ui-dialog .ui-dialog-title').prepend('Khách Hàng')
    }
    /**
     * add customer func
     * */
    addCustomer() {
        this.resetStyleInputs(); // reset style inputs
        this.FormCustomerDetail.Mode = "add"; // set mode
        this.FormCustomerDetail.dialog('open');
    }

    /**
     * update customer func
     * */
    updateCustomer() {
        let self = this;
        this.resetStyleInputs(); // reset style inputs
        $.getJSON("/Contents/data/data.json", function (data) {
            let customer = data.Customers[self.FormCustomerDetail.rowID];
            let inputs = $('.dialog-add-edit-customer  input');
            $.each(inputs, function (index, input) {
                let fieldName = $(input).attr('fieldName');
                let format = $(input).attr('format');
                let fieldValue = customer[fieldName];
                if (fieldValue != null) {
                    switch (format) {
                        case "Date":
                            fieldValue = CommonJS.formatStringDate(fieldValue);
                            break;
                        default:
                            break;
                    }
                    $('.dialog-add-edit-customer #' + fieldName).val(fieldValue);
                }
            })
        });
        this.FormCustomerDetail.Mode = "update"; // set mode
        this.FormCustomerDetail.dialog('open');
    }

    /**
     * save changes func
     * */

    saveCustomer() {
        var mode = this.FormCustomerDetail.Mode;
        switch (mode) {
            case "add":
                break;
            case "update":
                break;
            default:
        }
    }
}
