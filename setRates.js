// modifty the table
$('#tablepress-1 tr td').each(function () {
    $(this).html(this.parentElement.className + " : " + this.className);
});

// selector to get/set html inner
// lets use this to set rates and imgs from the JSON API 
// $("#tablepress-1 > tbody > tr.row-2 > td.column-1").html()

// get the json from api

$.getJSON("https://wallet-api.celsius.network/util/interest/rates").success(
    function (data) {
        var timeIn = new Date().getTime();
        console.log("Called API: " + timeIn);
    }).then(
    function (data) {
        var timeOut = new Date().getTime();
        console.log("API Responsed at:" + timeOut);
        data = data['interestRates'];
        sortJson(data , "rate", "float", false);

        var half_length = Math.ceil(data.length / 2);    

        var leftSide = data.splice(0,half_length);
        var rightSide = data;

        console.log("Left Side: \n");
        console.log(leftSide)
        console.log("Right Side: \n");
        console.log(data);
    });


    function sortJson(element, prop, propType, asc) {
        switch (propType) {
          case "int":
            element = element.sort(function (a, b) {
              if (asc) {
                return (parseInt(a[prop]) > parseInt(b[prop])) ? 1 : ((parseInt(a[prop]) < parseInt(b[prop])) ? -1 : 0);
              } else {
                return (parseInt(b[prop]) > parseInt(a[prop])) ? 1 : ((parseInt(b[prop]) < parseInt(a[prop])) ? -1 : 0);
              }
            });
            break;
          default:
            element = element.sort(function (a, b) {
              if (asc) {
                return (a[prop].toLowerCase() > b[prop].toLowerCase()) ? 1 : ((a[prop].toLowerCase() < b[prop].toLowerCase()) ? -1 : 0);
              } else {
                return (b[prop].toLowerCase() > a[prop].toLowerCase()) ? 1 : ((b[prop].toLowerCase() < a[prop].toLowerCase()) ? -1 : 0);
              }
            });
        }
      }