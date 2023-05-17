const request = require('postman-request')
const forecast = (latitude,longitude,callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=4bcf1377fff1163914c9e3cc6d7a1f76&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=s'
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect', undefined)
    } else if (response.body.error) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      callback(undefined, response.body.current.weather_descriptions[0])
    }
  })
}
module.exports=forecast