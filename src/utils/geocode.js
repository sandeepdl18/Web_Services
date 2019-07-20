const request = require('request')

//Geocoding
//Location to lat,long

const geocodeToLtLong = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGFudWphLWJvbGlzZXR0eSIsImEiOiJjank4MXYxeDUwNWt0M25vNTBpZG9obWtmIn0.RTB0_Dq82blI-4YaIJzB1g';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to collect location information', undefined);
        }else if(body.features && !body.features.length){
            callback('Unable to find location', undefined);
        }else{
            const latittude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            callback(undefined, 
                {'latittude': body.features[0].center[1],
                'longitude': body.features[0].center[0],
                'location' : body.features[0].place_name
                });

        }
   })
}

module.exports = geocodeToLtLong;