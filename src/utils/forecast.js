const request = require('request')



const forecast = (latitude, longitude, callback) =>
{
    const url = `https://api.darksky.net/forecast/9bcdaffe007a7b7a1ef493077faa1963/${latitude},${longitude}?units=si&lang=ru`

    request({ url, json: true }, (error, {body:data}) =>
    {
        if(error)
        {
            callback('Unable to connect to weather service!')
        }
        else if(data.error)
        {
            callback(`Unable to find location: ${error.body.error}`)
        }
        else
        {
            callback(undefined, data)
        }
    })
}

module.exports = forecast
