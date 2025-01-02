//Heolocation API gets the current cordinates of a user

// navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     error => console.log(error)
// );

//promisifying the geolocation promise
let getLocaion = function() {
    return new Promise(function (sucess, error) {
        navigator.geolocation.getCurrentPosition(
            sucess,
            error
        );
    });
}
getLocaion()
.then((data) => {
    let {latitude: lat, longitude: lng} = data.coords;
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
})
.then((response) => response.json())
.then((data) => {
    return fetch(`https://restcountries.com/v3.1/name/`+data.country)
})
.then((response) => response.json())
.then((data) => console.log(data))
.catch((err) => console.log(err.message));




