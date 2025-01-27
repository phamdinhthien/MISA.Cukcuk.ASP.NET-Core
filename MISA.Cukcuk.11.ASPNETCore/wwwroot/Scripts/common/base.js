﻿class Base {
    constructor() {
        this.TableID = "";
        this.EntityName = "";
        this.EntityID = "";
    }

    /**
     * load data for table
     * */
    loadData(isShowIconInTbody) {
        let self = this;
        let tbody = $(self.TableID).find('tbody');
        let layer = $('.layer');

        if (isShowIconInTbody) {
            layer.css('display', 'none');
            tbody.html(`<td colspan="12"  style="background: url('/Contents/images/load-data.gif') no-repeat center; background-size: contain; height: 50px;"></td>`)
        } else {
            layer.css('display', 'flex');
        }
        let ths = $(self.TableID).find('th');
        $.ajax({
            url: '/api/Customers',
            type: 'GET',
            dataType: 'json'
        }).done(function (data) {
            tbody.html('');
            let rows = data;
            layer.css('display', 'none');
            $.each(rows, function (index1, row) {
                let tr = $(`<tr rowID=${row[self.EntityID]}></tr>`);
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
            self.getToolTip();
        }).fail(function (err) { console.log(err) });
    }

    /******************************************************************/

    /**
    * hanlde when row of table clicked
    * */
    clickRow() {
        let self = this;
        let updateBtn = $('.update');
        let deleteBtn = $('.delete');
        let trs = $('tbody tr');
        trs.click(function () {
            updateBtn.attr('disabled', false);
            deleteBtn.attr('disabled', false);
            trs.css('background', 'none'); // reset background for all tr in tbody
            $(this).css('background', '#9bc7e366'); // set background for tr which clicked
            let rowID = $(this).attr('rowID'); // get id customer
            self.FormAddSave.rowID = rowID; // set id
        })
        /******************************************************************/
    }

    /**
     * get tooltip when text in 'td' tag is hidden
     * */
    getToolTip() {
        $('td').bind('mouseenter', function () {
            var $this = $(this);

            if (this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
                $this.attr('title', $this.text());
            }
        });
    }

}