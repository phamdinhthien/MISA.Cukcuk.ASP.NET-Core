$(document).ready(function () {
    $('.ui-dialog .ui-dialog-title').prepend('Khách Hàng');
    customerJS = new CustomerJS();
})

class CustomerJS extends Base {
    constructor() {
        super();
        this.init();
        this.loadData(true);
        CommonJS.initForm.call(this);
        this.initEvent();
        this.checkValue.call(this);
    }

    /**
     * init table to insert data
     * */
    init() {
        this.TableID = "#tbCustomers";
        this.EntityName = "Customers";
        this.EntityID = "CustomerID";
    }
    /******************************************************************/

    /**
     * init event :
     * add, update, save
     * */
    initEvent() {
        $('.add').on('click', this.add.bind(this));
        $('.update').on('click', this.update.bind(this));
        $('.delete').on('click', this.delete.bind(this));
        $('.form-save-btn').on('click', this.save.bind(this));
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
     * handle when click 'Nạp'
     * */
    reloadData() {
        let self = this;
        $(this.TableID).find('tbody').html('');
        self.loadData(true);

    }
    /******************************************************************/

    /**
     * add customer func
     * */
    add() {
        $('.ui-dialog-title').text('Thêm khách hàng');
        CommonJS.resetStyleInputs(); // reset style inputs
        this.FormMode = "add"; // set mode
        this.FormAddSave.dialog('open');

    }
    /******************************************************************/

    /**
     * update customer func
     * */
    update() {
        $('.ui-dialog-title').text('Cập nhật khách hàng');
        let self = this;
        CommonJS.resetStyleInputs(); // reset style inputs
        $.ajax({
            url: '/api/Customers/' + self.FormAddSave.rowID,
            type: 'GET',
            dataType: 'json'
        }).done(function (data) {
            let customer = data;
            let inputs = $('.dialog-add-edit  .add-edit-data');
            $.each(inputs, function (index, input) {
                let fieldName = $(input).attr('fieldName');
                let format = $(input).attr('format');
                let fieldValue = customer[fieldName];
                if (fieldName)
                if (fieldValue != null) {
                    switch (format) {
                        case "Date":
                            fieldValue = CommonJS.formatStringDate(fieldValue);
                            break;
                        default:
                            break;
                    }
                    $('.dialog-add-edit #' + fieldName).val(fieldValue);
                }

            });
        })
            .fail()
        this.FormMode = "update"; // set mode
        this.FormAddSave.dialog('open');
    }
    /******************************************************************/


    /**
    * delete customer func
    * */
    delete() {
        $('.ui-dialog-title').text('Xóa khách hàng');
        let self = this;
        CommonJS.resetStyleInputs(); // reset style inputs
        this.FormMode = "delete"; // set mode
        this.FormDelete.dialog('open');
    }
    /******************************************************************/

    /**
     * save changes func
     * */
    save() {
        let self = this;
        let mode = this.FormMode;
        let CustomerID = self.FormAddSave.rowID;
        let data = CommonJS.getDataForm('#form-add-edit-customer');
        switch (mode) {
            case "add":
                $.ajax({
                    url: '/api/Customers',
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).done(function (data) {
                    console.log(data)
                    self.FormAddSave.dialog('close');
                    self.loadData(false);
                }).fail(function (err) {
                    console.log(err)
                })
                break;
            case "update":
                $.ajax({
                    url: '/api/Customers/update/' + CustomerID,
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).done(function (data) {
                    self.FormAddSave.dialog('close');
                    self.loadData(false);
                }).fail(function (err) {
                    console.log(err)
                })
                break;
            case "delete":
                $.ajax({
                    url: '/api/Customers/delete/' + CustomerID,
                    type: "GET"
                }).done(function (data) {
                    self.FormDelete.dialog('close');
                    self.loadData(false);
                }).fail(function (err) {
                    console.log(err)
                })
            default:
        }
    }
/******************************************************************/

}
