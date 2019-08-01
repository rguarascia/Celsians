var fetch = require('node-fetch');

const url = "https://wallet-api.celsius.network/util/interest/rates";

var data = "";

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    data = json;
  } catch (error) {
    console.log(error);
  }
};

var minutes = 5,
  the_interval = minutes * 60 * 1000;
var data = "";

if (data == "") {
  console.log("Server has restarted. Force pushing, then setting 5 minute timer.");
  getData(url);
  console.log(data);
  // add to Wix DB
}
setInterval(function () {
  console.log("Pulling new interest rates. 5 minutes as past.");
  getData(url);
  console.log(data);
  // add to Wix DB
}, the_interval);