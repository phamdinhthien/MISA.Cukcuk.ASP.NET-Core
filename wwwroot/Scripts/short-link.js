$(document).ready(function () {
    link = new Link();
});

class Link {
    constructor() {
        $(document).on('click', '.btn-copy, .btn-copy-edit', this.copyLink);
        $(document).on('click', '[data-target="#addShortLink"]', this.focusFieldModal);
        $(document).on('keydown', this.hotKeyShortLink);
        $(document).on('keydown', 'input,textarea', (event) => { event.stopPropagation(); });
        $(document).on('focus', '#editShortLink .short-link-edit .short-link-title', this.focusPathOfURL.bind(this));
        $(document).on('focus', '.link-shorted', this.focusDomain.bind(this));
        $(document).on('keyup keydown', '#original-url', this.validateOriginalURLTextarea);
        $(document).on('click', '#addShortLink a', this.changeInputDropdown);
        $(document).on('load', this.generateMainQRCode());
        $(document).on('load', this.autoGenerateQRCode());
        $(document).on('keyup', '.input-field--input.link-shorted', this.debounce(this.autoGenerateQRCode.bind(this), 800));
        //$(document).on('click', '.modal-body a[rel=popover] .custom-qrcode', this.openTemplateQRCode);
        //$(document).on('click', '.modal-body a[rel=popover]', this.generateTemplateQRCode.bind(this));
        $(document).on('mouseleave', '.popover-content', this.hideModal);

        this.clearInputOnClose();
    }



    /**
    * Focus vào trường bắt buộc trong modal
    * Created by: NMHung 18/12/2019
    */
    focusFieldModal() {
        setTimeout(() => {
            $('.on-focus').focus();
        }, 500);
    }

    /**
     * Hàm xóa dữ liệu khi đóng form thêm mới
     * Created by: HGVinh 16/12/2019
     */
    clearInputOnClose() {
        $('#addShortLink').on('hidden.bs.modal', function (e) {
            $(this)
                .find("textarea")
                .val('')
                .end();
        });
    }


    /**
    * Thực hiện gọi modal tạo shortlink khi nhấn phím M
    * Created by: NMHung (12/12/2019)
    * @param {UIEvent} event
    */
    hotKeyShortLink(event) {
        if (event.keyCode === 77) {
            event.preventDefault();
            $('[data-target="#addShortLink"]').click();
            if ($('#editShortLink').hasClass('show')) {
                $('[data-target="#editShortLink"]').click();
            }
        }

        if (event.keyCode === 69 && event.ctrlKey === true) {
            event.preventDefault();
            $('[data-target="#editShortLink"]').click();
            if ($('#addShortLink').hasClass('show')) {
                $('[data-target="#addShortLink"]').click();
            }
        }
    }

    /* ------------------------------------------
    * Hàm sao chép link rút gọn
    * Created by: HGVinh (12/11/2019)
    * Modified by: NMHung (18/11/2019)
    **/
    copyLink() {
        var tab = $(this).parents('.short-link');
        var $temp = $("<input>");
        $(tab).append($temp);
        $temp.val($(tab).find('.text-link').eq(0).text().trim()).select();
        document.execCommand("copy");
        $temp.remove();
        tab.find('.text-link').eq(1).addClass('copied');
        setTimeout(function () {
            tab.find('.text-link').eq(1).removeClass('copied');
        }, 1000);


    }

    /* ------------------------------------------
     * Hàm bôi đen title khi focus vào ô input
     * Created by: LTAnh (12/12/2019)
     * */
    focusPathOfURL() {
        var url = $('#editShortLink .short-link-edit .short-link-title');
        url.select();
    }

    /* ------------------------------------------
     * Hàm bôi đen link custom
     * created by: LTAnh (16/12/2019)
     * */
    focusDomain() {
        $('.input-field--input.link-shorted').select();
    }

    /* ------------------------------------------
    * Tự động điều chỉnh kích thước của textarea
    * Validate trường textarea
    * Created by: NMHung (13/12/2019)
    */
    validateOriginalURLTextarea() {
        $('#addShortLink .modal-footer button').removeAttr('disabled');

        if (this.scrollHeight > $(this).parent()[0].offsetHeight - 154) {
            this.style.overflow = 'auto';
            this.style.border = '1px solid #e5e6e7';

        }
        else {
            this.style.border = '1px solid #e5e6e7';
            this.style.overflow = 'hidden';
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';

        }

        if ($(this).val().length > 2024) {
            this.style.border = '1px solid #ed5565';
            $('#addShortLink .modal-footer button').attr('disabled', 'disabled');
        }

    }

    /* ------------------------------------------
    * bind dữ liệu cho input khi click vào item dropdown
    * Created by: NMHung (13/12/2019)
    */
    changeInputDropdown() {
        $(this).parents('.dropdown-menu').siblings('input').val($(this).text());
    }

    /* ------------------------------------------
     * Hàm sinh QRCode dùng chung
     * Create By: LTAnh (19/12/2019)
     * */
    generateQRCode() {
        //chuỗi ký tự url để convert sang qr code
        var qrstring = arguments[0];
        //logo chèn vào giữa qrcode
        var logo = arguments[1];
        //đối tượng chứa qr code
        var object = arguments[2];
        //chiều dài rộng qr code
        var width = arguments[3];
        var height = arguments[4];
        //2 màu trên qrcode (màu tối colorDark, màu sáng(nền) colorLight)
        var colorDark = arguments[5];
        var colorLight = arguments[6];

        var qrcode = new QRCode(object, {
            //logo: logo,
            width: width,
            height: height,
            logoWidth: undefined,
            logoHeight: undefined,
            logoBackgroundColor: '#ffffff',
            colorDark: colorDark,
            colorLight: colorLight,
            dotScale: 1,
            PI_TL: "#1ab394",
            PI_TR: "#1ab394",
            PI_BL: "#1ab394",
            AI: "#1ab394",
            logoBackgroundTransparent: false
        });

        qrcode.makeCode(qrstring);
    }

    /* ------------------------------------------
     * Hàm sinh mã qrcode cho link trên trang quản lý
     * Created By: LTAnh (18/12/2019)
     * */
    generateMainQRCode() {
        var me = this;
        var qrStr = $.trim($('.tab-pane.active.show #text').text());
        var logo = "/Library/img/logo.png";
        var object = document.getElementById("qrcode");
        var colorDark = "#2f4050";
        var colorLight = "#fff";
        var width = 210;
        var height = 210;
        me.generateQRCode(qrStr, logo, object, width, height, colorDark, colorLight);

    }

    /* ------------------------------------------
     * Hàm tự gen sau 0,8s không nhập chữ ở input custom link trong modal sửa
     * Create by: LTAnh (18/12/2019)
     * */
    autoGenerateQRCode() {
        var me = this;
        $('#custom-qrcode').empty();
        //Sinh qr code cho modal sửa
        var qrStr = "misa.vn/" + $('#custom-link input').val();
        var logo = "/Library/img/logo.png";
        var object = document.getElementById("custom-qrcode");
        var colorDark = "#2f4050";
        var colorLight = "#fff";
        var width = 210;
        var height = 210;
        me.generateQRCode(qrStr, logo, object, width, height, colorDark, colorLight);
        me.validateCustomURL();
    }

    /* ------------------------------------------
     * Hàm set thời gian đợi 0.8s không nhập chữ khi edit link
     * @param {any} fn biến đại diện hàm cần thực hiện sau mỗi khoảng duration mili giây
     * @param {any} duration khoảng thời gian mili giây
     * Created by: LTAnh (18/12/2019)
     */
    debounce(fn, duration) {
        var timer;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(fn, duration);
        };
    }

    /* ------------------------------------------
     * Hàm sinh các qr code template
     * Create by: LTAnh (18/12/2019)
     * */
    generateTemplateQRCode() {
        var me = this;

        var arr = $('.template-qr');
        $.each(arr, function (index, item) {
            $(item).empty();
            var qrStr = "misa.vn/" + $('#custom-link input').val();
            var logo = "/Library/img/logo.png";
            var object = document.getElementsByClassName("template-qr")[index];
            var colorDark = item.getAttribute("colordark");
            var colorLight = "#fff";
            var width = 70;
            var height = 70;
            me.generateQRCode(qrStr, logo, object, width, height, colorDark, colorLight);
        });

    }

    /* ------------------------------------------
     * Tạo modal chứa các template qr code và bật 
     * Create by LTAnh (18/12/2019)
     * */
    openTemplateQRCode() {
        $("a[rel=popover]").popover({
            trigger: 'manual',
            placement: 'left',

            html: true,
            content: `
                    <div class="container popover-content">
                        <div class="row" >
                            <div class="col-sm-4 template-qr" colorDark="#8162a6" style="margin-top:2px"></div>
                            <div class="col-sm-4 template-qr" colorDark="#9a504d" style="margin-top:2px"></div>
                            <div class="col-sm-4 template-qr" colorDark="#55bd4e" style="margin-top:2px"></div>
                        </div>                                                    
                        <div class="row" >                 
                            <div class="col-sm-4 template-qr" colorDark="#df4204" style="margin-top:2px"></div>
                            <div class="col-sm-4 template-qr" colorDark="#2370c1" style="margin-top:2px"></div>
                            <div class="col-sm-4 template-qr" colorDark="#face3a" style="margin-top:2px"></div>
                        </div>   
                        <div class="row" >                 
                            <div class="col-sm-4 template-qr" colorDark="#d80100" style="margin-top:2px"></div>
                            <div class="col-sm-4 template-qr" colorDark="#08c2e3" style="margin-top:2px"></div>
                            <div class="col-sm-4 template-qr" colorDark="#ef9604" style="margin-top:2px"></div>
                        </div> 
                        <div class="row">                 
                            <div class="col-sm-4 template-qr" colorDark="#ff49ff" style="margin-top:2px"></div>
                            <div class="col-sm-4 template-qr" colorDark="#93a899" style="margin-top:2px"></div>
                            <div class="col-sm-4 template-qr" colorDark="#000000" style="margin-top:2px"></div>
                        </div>                                                    
                    </div>
                `
        });
        $('a[rel=popover]').popover('show');
    }

    /* ------------------------------------------
     * Hàm tắt modal template qrcode khi mouse leave khỏi modal template
     * Created by: LTAnh (19/12/2019)
     * */
    hideModal() {
        $('a[rel=popover]').popover('hide');
    }

    /* ------------------------------------------
     * Hàm kiểm tra url có hợp lệ hay không
     * @param {string} userInput url người dùng nhập vào
     * Created by: LTAnh (19/12/2019)
     */
    isURLValid(userInput) {
        var res = userInput.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g);
        if (res === null)
            return false;
        else
            return true;
    }

    /* ------------------------------------------
     * Hàm kiểm tra path url hợp lệ
     * @param {string} userInput path url
     * Created by: LTAnh (19/12/2019)
     */
    isPathValid(userInput) {
        var res = userInput.match(/^[\w-_]+$/g);
        if (res === null)
            return false;
        else
            return true;
    }

    /* ------------------------------------------
     * Hàm cảnh báo nếu url custom chưa hợp lệ
     * Created by: LTAnh (19/12/2019)
     * */
    validateCustomURL() {
        var me = this;
        var qrPathStr = $('#custom-link input').val();
        if (!me.isPathValid(qrPathStr)) {
            $('#custom-link').css("border-color", "#ff0000!important");
        }

    }
}