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
    sortJson(data, "rate", "float", false);

    var half_length = Math.ceil(data.length / 2);

    var leftSide = data.splice(0, half_length);
    var rightSide = data;

    console.log("Left Side: \n");
    console.log(leftSide);
    console.log("Right Side: \n");
    console.log(data);

    for (var i = 0; i < leftSide.length; i++) {
      $("#tablepress-1 > tbody > tr.row-" + (i + 2) + " > td.column-1").html('<img src="' + leftSide[i].currency.image_url + '" alt="" width="80" height="80" class="alignnone size-full wp-image-400">' + leftSide[i].coin);
      $("#tablepress-1 > tbody > tr.row-" + (i + 2) + " > td.column-2").html((parseFloat(leftSide[i].rate) * 100).toFixed(2) + "%");
      $("#tablepress-1 > tbody > tr.row-" + (i + 2) + " > td.column-3").html((parseFloat((leftSide[i].rate) * 1.30) * 100).toFixed(2) + "%");
    }
    for (var i = 0; i < rightSide.length; i++) {
      $("#tablepress-1 > tbody > tr.row-" + (i + 2) + " > td.column-4").html('<img data-attachment-id="400" data-permalink="https://celsians.wpcomstaging.com/3408/" data-orig-file="https://celsians.wpcomstaging.com/wp-content/uploads/2019/09/3408.png" data-orig-size="128,128" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="3408" data-image-description="" data-medium-file="https://celsians.wpcomstaging.com/wp-content/uploads/2019/09/3408.png" data-large-file="https://celsians.wpcomstaging.com/wp-content/uploads/2019/09/3408.png" src="' + rightSide[i].currency.image_url + '" alt="" width="80" height="80" class="alignnone size-full wp-image-400">' + rightSide[i].coin);
      $("#tablepress-1 > tbody > tr.row-" + (i + 2) + " > td.column-5").html((parseFloat(rightSide[i].rate) * 100).toFixed(2) + "%");
      $("#tablepress-1 > tbody > tr.row-" + (i + 2) + " > td.column-6").html((parseFloat((rightSide[i].rate) * 1.30) * 100).toFixed(2) + "%");
    }
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