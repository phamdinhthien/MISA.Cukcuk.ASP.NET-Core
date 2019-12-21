$(function () {
    var lineData = {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
        datasets: [

            {
                label: "Dữ liệu 1",
                backgroundColor: 'rgba(26,179,148,0.5)',
                borderColor: "rgba(26,179,148,0.7)",
                pointBackgroundColor: "rgba(26,179,148,1)",
                pointBorderColor: "#fff",
                data: [28, 48, 40, 19, 86, 27, 90]
            }, {
                label: "Dữ liệu 2",
                backgroundColor: 'rgba(220, 220, 220, 0.5)',
                pointBorderColor: "#fff",
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };

    var lineOptions = {
        responsive: true
    };

    var ctx = document.getElementsByClassName("lineChart");
    $.each(ctx, function (index, item) {
        var ctxItem = item.getContext("2d");
        new Chart(ctxItem, { type: 'line', data: lineData, options: lineOptions });
    })

    var barData = {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        datasets: [
            {
                label: "Số lần click",
                backgroundColor: 'rgba(26,179,148,0.5)',
                borderColor: "rgba(26,179,148,0.7)",
                pointBackgroundColor: "rgba(26,179,148,1)",
                pointBorderColor: "#fff",
                data: [28, 48, 40, 19, 86, 27, 90, 52, 20, 40, 89, 31]
            }
        ]
    };

    var barOptions = {
        responsive: true
    };

    var ctx2 = document.getElementsByClassName("barChart");
    $.each(ctx2, function (index, item) {
        var ctxItem = item.getContext("2d");
        new Chart(ctxItem, { type: 'bar', data: barData, options: barOptions });
    })
    var polarData = {
        datasets: [{
            data: [
                300, 140, 200
            ],
            backgroundColor: [
                "#1ab394", "#dedede", "#ff8500"
            ],
            label: [
                "My Radar chart"
            ]
        }],
        labels: [
            "App", "Software", "Laptop"
        ]
    };

    var polarOptions = {
        segmentStrokeWidth: 2,
        responsive: true

    };


    var ctx3 = document.getElementsByClassName("polarChart");
    $.each(ctx3, function (index, item) {
        var ctxItem = item.getContext("2d");
        new Chart(ctxItem, { type: 'polarArea', data: polarData, options: polarOptions });
    })

    var doughnutData = {
        labels: ["App", "Software", "Laptop"],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: ["#1ab394", "#dedede", "#ff8500"]
        }]
    };


    var doughnutOptions = {
        responsive: true
    };



    var ctx4 = document.getElementsByClassName("doughnutChart");
    $.each(ctx4, function (index, item) {
        var ctxItem = item.getContext("2d");
        new Chart(ctxItem, { type: 'doughnut', data: doughnutData, options: doughnutOptions });
    })

    var radarData = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgba(220,220,220,0.2)",
                borderColor: "rgba(220,220,220,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                backgroundColor: "rgba(26,179,148,0.2)",
                borderColor: "rgba(26,179,148,1)",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };

    //var radarOptions = {
    //    responsive: true
    //};


    var ctx5 = document.getElementsByClassName("radarChart");
    $.each(ctx5, function (index, item) {
        var ctxItem = item.getContext("2d");
        new Chart(ctxItem, { type: 'radar', data: radarData, options: radarOptions });
    })

});