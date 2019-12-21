class Base {
    constructor() {

    }
    /**
     * Hàm load dữ liệu cho danh sách link
     * Created by: HGVinh 12/12/2019
     * */
    loadDataList() {
        let data = [];
        let me = this;
        $.ajax({
            method: 'GET',
            url: me.Url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
                if (res.Success) {
                    data = res.Data;
                    $(me.TableName).find('ul').empty();
                    let lengthData = data.length;
                    for (var i = 0; i < lengthData; i++) {
                        var liA = "";
                        var liHTML = $('<li class="list-group-item"></li>');
                        if(i === 0)
                            liA = $('<a class="nav-link show active" data-toggle="tab" href="#tab-detail"></a >');
                        else
                            liA = $('<a class="nav-link " data-toggle="tab" href="#tab-details"></a >');
                        var liDiv1 = $('<div></div>');
                        liDiv1.append('<small class="float-right text-muted">' + data[i]["CreatedDate"] + '</small>');
                        liDiv1.append(' <div class="link-list-title"><strong>' + data[i]["Title"] + '</strong> </div >');

                        var liDiv2 = $('<div class="m-t-xs"></div>');
                        liDiv2.append('<p class="link-list-encode">http://misa.vn/<span class="link-encode">' + data[i]["Data"]["ShortCode"] + '</span> </p>');
                        liDiv2.append('<p class="m-b-none"><i class="fa fa-map-marker"></i>' + "Việt Nam" + ' </p>');

                        lia.append(liDiv1);
                        liA.append(liDiv2);
                        liHTML.append(liA);
                        $(me.TableName).find('ul').append(liHTML);
                    }
                }
            },
            error: function (res) {
                alert("Lỗi!");
            }
        })

    }

    /**
     * Hàm load dữ liệu chi tiết cho một link
     * @param {any} id: id của link cần hiển thị
     */
    loadDataDetail(id) {
        let data = {};
        let me = this;
        $.ajax({
            method: 'GET',
            url: me.Url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
                if (res.Success) {
                    data = res.Data;
                    //$("#tab-detail").find(".link-info .text-muted").append('Thứ 4, 12 tháng 12 2019, 3:25 SA');
        //$("#tab-detail").find(".link-info h1").append('Thiết kế hệ thống URL Shortening giống Bit.ly chịu tải 6 tỷ click 1 tháng | Tech Talk');
        //$("#tab-detail").find(".link-info h5").append('https://techtalk.vn/thiet-ke-he-thong-url-shortening-giong-bit-ly-chiu-tai-6-ty-click-1-thang.html?fbclid=IwAR3ZykioyGME1TmGN2BXxxX2oI-YB1_bdgWZIwMmnh7_AJj90_Kl5o3BODM');
        //$("#tab-detail").find(".link-info .short-link #text").append('<a href="http://misa.vn/8GOPeS" target="_blank">http://misa.vn/<span class="link-encode">8GOPeS</span></a>'); 
        //$("#tab-detail").find(".link-info .short-link .text-link").eq(1).append('<a href="http://misa.vn/8GOPeS" target="_blank">http://misa.vn/<span class="link-encode">8GOPeS</span></a>'); 
                    }
                }
            ,
            error: function (res) {
                alert("Lỗi!");
            }
        })
    }
}   