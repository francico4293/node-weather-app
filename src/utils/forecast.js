const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fd5689417fd047ab78559bfb0eea60ed&query=${longitude},${latitude}&units=f`;
    request({url: url, json: true}, (error, data) => {
        if (error) {
            callback('[-] Unable to use weather stack services', null);
        } else if (data.body.error) {
            callback('[-] Location not found', null);
        } else {
            callback(null, `${data.body.current.weather_descriptions[0]}. It is currently ${data.body.current.temperature} degrees out. It feels like ${data.body.current.feelslike} degrees out.`);
        }
    })
}

module.exports = forecast;