class CommonJS {
    static formatStringDate(dateString) {
        let newDateString = new Date(dateString);
        let date = newDateString.getDate();
        let month = newDateString.getMonth() + 1;
        let year = newDateString.getFullYear();
        
        date = date < 10 ? "0" + date : date;
        month = month < 10 ? "0" + month : month;
        return date + "/" + month + "/" + year;
    }

    static formatCurrency(currencyString) {
        return currencyString.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
}