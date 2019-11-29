$(document).ready(function () {
    $('.ui-dialog .ui-dialog-title').prepend('Khách Hàng');
    customerJS = new CustomerJS();
})

class CustomerJS extends Base {
    constructor() {
        super();
        this.init();
        this.loadData();
        CommonJS.initForm.call(this);
        this.initEvent();
        CommonJS.checkValue.call(this);
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
        $('.add').on('click', this.add.bind(this));
        $('.update').on('click', this.update.bind(this));
        $('.reload-data').on('click', this.reloadData.bind(this));
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
    add() {
        CommonJS.resetStyleInputs(); // reset style inputs
        this.FormDetail.Mode = "add"; // set mode
        this.FormDetail.dialog('open');
    }
    /******************************************************************/

    /**
     * update customer func
     * */
    update() {
        let self = this;
        CommonJS.resetStyleInputs(); // reset style inputs
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
    save() {
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
