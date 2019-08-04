// Ryan Guarascia
// Aug 1st 2019

import { fetch } from 'wix-fetch';
import wixData from 'wix-data';

var newRates = {};

var errorList = "";

export function getdata() {
	console.log("API CALLED");

	var dbData = [];

	// Gets data from API
	fetch("https://wallet-api.celsius.network/util/interest/rates", { "method": "get" })
		.then((httpResponse) => {
			if (httpResponse.ok) {
				return httpResponse.json();
			}
		})
		.then(json => {
			newRates = json;
			console.log(newRates);
			// Runs a query to get the current data
			wixData.query("rates")
				.find()
				.then((results) => {
					// go through all new rates
					var skipList = [];
					for (var x = 0; x < newRates.interestRates.length; x++) {
						var updatedRate = newRates.interestRates[x].rate;
						// checks if the db has the current coin
						var flag = results.items.filter(y => y.coin === newRates.interestRates[x].coin);
						if (flag.length !== 0) { // if it is found
							console.log("Checking: " + newRates.interestRates[x].coin + " w/ rate: " + newRates.interestRates[x].rate);
							console.log("current ID: " + flag[0]._id);
							console.log("Exisiting coin. Checking for update.");
							if (flag[0].rate !== newRates.interestRates[x].rate) {
								console.log("New rate found. Updating");
								updateThis(flag, newRates.interestRates[x].rate);
							} else {
								console.log("Rate is the same. Disregard");
							}
						} else {
							console.log("New coin. Adding: " + newRates.interestRates[x].coin + " to db");
							insertThis(newRates.interestRates[x]);
						}
					}
				});
		})
		.catch(err => console.log(err));
	return "Updated";
}

function updateThis(currentCoin, updateRate) {
	wixData.get("rates", currentCoin[0]._id)
		.then((item) => {
			console.log("found: " + currentCoin[0].coin);
			console.log("New Rate: " + updateRate);
			item.rate = updateRate; // updated w/ new rate
			item.CELrate = (updateRate*1.3).toFixed(4).toString()
			wixData.update("rates", item);
		})
		.catch(err => {
			let errorMsg = err;
			console.log("error: " + err);
		});
}

function insertThis(newCoin) {
	let toInsert = {
		"coin": newCoin.coin,
		"rate": newCoin.rate,
		"CELrate": (newCoin.rate*1.3).toFixed(4).toString(),
		"name": newCoin.currency.name,
		"url": newCoin.currency.image_url,
	};
	wixData.insert("rates", toInsert)
		.then((results2) => {
			let item = results2; // insert below
		})
		.catch((err) => {
			let errorMsg = err;
		});
}