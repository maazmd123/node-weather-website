const request = require("request");
const geocode = (address , callback) =>
{
   url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFhem1kMTIzIiwiYSI6ImNrOWEyeW16NzAzc3UzZnAzN2lmZmppNWUifQ.jPjVRUGsXul5d9ojAY9cjw&limit=1`

request({url , json : true}, (error, {body}) => {
    if(error)
    {
        callback('unable to connect to te services', undefined )
    }
    
    else if(body.features.length === 0)
    {
        callback('Invalid location. Please enter a valid location', undefined)
    }
    else {
callback(undefined , {
location: body.features[0].place_name,
longitude: body.features[0].center[0],
latitude: body.features[0].center[1]
})
    }
})}
module.exports = geocode