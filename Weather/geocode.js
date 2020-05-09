import * as key from "./key.js"

const getCoordinates = (address) => {

    return new Promise( (resolve, reject) => {
        var mapUrl = encodeURI("https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?limit=1&access_token="+key.mapBoxApiToken);
        var request = new Request(mapUrl);
    
        fetch(request).then(function(response) {
    
            return response.text();
    
        }).then(function(text) {
            
            var res = JSON.parse(text);
            
            if (res.features.length === 0) {
                return reject('Unable to find location. Try another search.');
            }
            else {
                
                var locationDetail = {
                    latitude: res.features[0].center[1],
                    longitude: res.features[0].center[0],
                    location: res.features[0].place_name
                }
    
                console.log(locationDetail)
                
                return resolve(locationDetail);
            }
        }).catch ((e) => {
            console.log("E" + e)
            return reject("Error Occured");
        }) ;
    })

}


export {getCoordinates}