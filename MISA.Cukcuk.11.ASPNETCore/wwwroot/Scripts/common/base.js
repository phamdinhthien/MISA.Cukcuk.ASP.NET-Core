class Base {
    constructor() {
        this.TableID = "";
        this.EntityName = "";
    }
    loadData() {
        var self = this;
        $.getJSON("/Contents/data/data.json", function (data) {
            let rows = data[self.EntityName];
            let tbody = $(self.TableID).find('tbody');
            let ths = $(self.TableID).find('th');

            $.each(rows, function (index1, row) {
                let tr = $(`<tr rowID=${index1}></tr>`);
                $.each(ths, function (index2, th) {
                    let fieldName = $(th).attr('fieldName');
                    let format = $(th).attr('format');
                    let fieldValue = row[fieldName] != null ? row[fieldName] : "";
                    
                    if (fieldValue !== "") {
                        switch (format) {
                            case "Money":
                                fieldValue = CommonJS.formatCurrency(fieldValue);
                                break;
                            case "Date":
                                fieldValue = CommonJS.formatStringDate(fieldValue);
                                break;
                            case "Checkbox":
                                fieldValue = '<input type="checkbox" name="" id="" ' + (fieldValue == true ? "checked" : "") + ' >';
                                break;
                            default:
                                break;
                        }
                    }
                    let td = "";
                    let styleType = $(th).attr('style-type');
                    switch (styleType) {
                        case "text-align-center":
                            td = $('<td class="text-align-center">' + fieldValue + '</td>');
                            break;
                        case "text-align-right":
                            td = $('<td class="text-align-right">' + fieldValue + '</td>');
                            break;
                        default:
                            td = $('<td>' + fieldValue + '</td>');
                            break;
                    }
                    
                    tr.append(td);
                })
                tbody.append(tr);
            });
            $('td').append('<div class ="resize-bar"></div>');
            tbResize();
            self.clickRow();
        });
    }

    /**
    * hanlde when row of table clicked
    * */
      clickRow() {
        let self = this;
        let updateBtn = $('.update');
        let trs = $('tbody tr');
        trs.click(function () {
            updateBtn.attr('disabled', false);
            trs.css('background', 'none'); // reset background for all tr in tbody
            $(this).css('background', '#9bc7e366'); // set background for tr which clicked
            let rowID = $(this).attr('rowID'); // get id customer
            self.FormCustomerDetail.rowID = rowID; // set id
        })
    }

}