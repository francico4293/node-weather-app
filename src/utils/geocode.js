const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZnJhbmNpY24iLCJhIjoiY2tzeXJuZHo1Mm00bDMwcGdjOHB6b2pmNSJ9.8XMuQWYyl7wjfCiS2klr3Q&limit=5`;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('[-] Unable to connect to location services.', null);
        } else if (response.body.features.length === 0) {
            callback('[-] Unable to find location. Try another search.', null)
        } else {
            callback(null, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;