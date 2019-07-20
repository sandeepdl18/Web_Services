const request = require('request')

const latlongToWeather = (latittude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/235e6c3de3b01d4462fe433aecd7931a/' + latittude + ',' + longitude;
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to collect weather information', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined);
        }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently '  
            +  body.currently.temperature + ' degrees out, there is a ' + body.currently.precpitation + ' % chance of rain'
            + ' High temperature today will be: ' + body.daily.data[0].temperatureHigh + ','
            + ' Low temperature today will be: ' + body.daily.data[0].temperatureLow );
        }
    })
}

module.exports = latlongToWeather;