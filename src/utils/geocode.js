const request = require('postman-request')


const geocode = (address,callback ) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?limit=1&access_token=pk.eyJ1IjoiYmhhZ3lhc2hyZWUwMyIsImEiOiJja3JxZzMxZjQwNzlmMzBvNDM1cXU5eDBhIn0.2H9p2v2N89SpNaulnc1viw'
    request({url, json: true},(error,{body}={})=>{
        if(error)
        {
            callback('unable to connect with location services!',undefined)
        }
        else if(body.features.length===0)
        {
            callback('unable to find location. Search again!',undefined)
        }
        else
       {
        
        callback(undefined,{
            latitude:body.features[0].center[1],
          longitude: body.features[0].center[0],
         location: body.features[0].place_name
        })
       }
    
     
    })
}
module.exports = geocode