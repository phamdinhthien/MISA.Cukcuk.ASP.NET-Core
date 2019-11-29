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
    /******************************************************************/

    /**
     * init event :
     * add, update, save
     * */
    initEvent() {
        $('.add').on('click', this.addCustomer.bind(this));
        $('.update').on('click', this.updateCustomer.bind(this));
        $('.reload-data').on('click', this.reloadData.bind(this));
    }
    /******************************************************************/

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
    /******************************************************************/

    /**
     * reset style for all required inputs
     * */
    resetStyleInputs() {
        $('input').val(''); // remove all values
        let inputs = $('input[required]');
        inputs.next('.error-icon').css('display', 'none'); // hide icon error
        inputs.removeClass('border-red'); // reset border
    }
    /******************************************************************/

    /**
     * init form dialog
     * */
    initForm() {
        let self = this;
        // khoi tao dialog
        this.FormDetail = $('.dialog-add-edit-customer').dialog({
            modal: true,
            autoOpen: false,
            minWidth: 652,
            minHeight: 345
        })

        $('.ui-dialog .ui-dialog-title').prepend('Khách Hàng');

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
     * handle when click 'Nạp'
     * */
    reloadData() {
        let self = this;
        $(this.TableID).find('tbody').html('<tr style="text-align:center"><td colspan="12">loading...</td></tr>');
        setTimeout(function () {
            self.loadData()
        }, 1000);
    }
    /******************************************************************/

    /**
     * add customer func
     * */
    addCustomer() {
        this.resetStyleInputs(); // reset style inputs
        this.FormDetail.Mode = "add"; // set mode
        this.FormDetail.dialog('open');
    }
    /******************************************************************/

    /**
     * update customer func
     * */
    updateCustomer() {
        let self = this;
        this.resetStyleInputs(); // reset style inputs
        $.getJSON("/Contents/data/data.json", function (data) {
            let customer = data.Customers[self.FormDetail.rowID];
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
        this.FormDetail.Mode = "update"; // set mode
        this.FormDetail.dialog('open');
    }
    /******************************************************************/

    /**
     * save changes func
     * */
    saveCustomer() {
        var mode = this.FormDetail.Mode;
        switch (mode) {
            case "add":
                break;
            case "update":
                break;
            default:
        }
    }
    /******************************************************************/

}
