const request = require('request')

const geocode = (address, callback) =>
{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiMmlzdGVkYW5pbWF0b3IiLCJhIjoiY2p1MGM1ZGVhMHBuYjQzbWcwMXQwNmFteSJ9.ru3NJCgcVBpzLrKx2CGJ1A&limit=1`
    request({ url, json: true }, (error, {body:data}) =>
    {
        if(error)
        {
            callback('Unable to connect to geocoding service!')
        }
        else if(!data.features.length)
        {
            callback('No results.')
        }   
        else
        {            
            const place =  data.features[0]            
            const result = {latitude: place.center[1], longitude: place.center[0], location: place.place_name}

            callback(undefined, result)
        }
    
    })
}

module.exports = geocode