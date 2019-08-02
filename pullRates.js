import { fetch } from 'wix-fetch';
import wixData from 'wix-data';

var newRates = {};

export function getdata() {
	console.log("API CALLED");

	// Gets data from API
	fetch("https://wallet-api.celsius.network/util/interest/rates", { "method": "get" })
		.then((httpResponse) => {
			if (httpResponse.ok) {
				return httpResponse.json();
			}
		})
		.then(json => {
			console.log("Parsing json");
			newRates = json;
			console.log(newRates);
			// Runs a query to get the current data
			wixData.query("rates")
				.find()
				.then((results) => {
					// go through all new rates
					for (var x = 0; x < newRates.interestRates.length; x++) {
						var found = false;
						var coinChange = "";
						loop1:
							for (var y = 0; x < results.items.length; y++) {
								if (results.items[y] !== null && newRates.interestRates[x] !== null) {
									// if the coin is already in the db
									if (newRates.interestRates[x].coin === results.items[y].coin) {
										found = true;
										coinChange = results.items[y]._id;
										console.log(coinChange);
										break loop1;
									}
								}
							}
						if (found) {
							console.log("Coin already exist. Updating");
							wixData.get("rates", coinChange)
								.then((item) => {
									item.rate = newRates.interestRates[x].rate; // updated new rate
									wixData.update("rates", item);
								})
								.catch((err) => {
									let errorMsg = err;
								});
						} else { // if it is a new coin
							console.log("Coin is new, adding");
							let toInsert = {
								"coin": newRates.interestRates[x].coin,
								"rate": newRates.interestRates[x].rate,
								"name": newRates.interestRates[x].currency.name,
								"url": newRates.interestRates[x].currency.image_url
							};
							wixData.insert("rates", toInsert)
								.then((results2) => {
									let item = results2; // intsert below
								})
								.catch((err) => {
									let errorMsg = err;
								});
						}
					}
					console.log(results.items);
				});

			return "Added new rates";
		})
		.catch(err => console.log(err));
}