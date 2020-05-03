const request = require('request')

const forcast = ({latitude,longitude} , callback) => {
url=`http://api.weatherstack.com/current?access_key=c31aec0c7f5a78594c3f28a464d0ddc2&query=${latitude},${longitude}&units=m`
    request({url, json : true}, (error, {body}) => {
        if(error)
{
    callback('Unable to connect to weather servise', undefined)
}

       else{ 
        callback(undefined, {
            forcast : `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out but it feels like it is ${body.current.feelslike} degree out. The humidity is ${body.current.humidity}`
        
 
        })}
            })
}

module.exports = forcast