function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            resolve,
            reject
        )
    })
}

//1. the function runs asynchronously
//2. function returns a promise
async function getCountry() {
    try {
        let geoData = await getLocation();
        let {latitude: lat, longitude: lng} = geoData.coords;
        let country = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        let countryResponse = await country.json();
        let getCountry = countryResponse.country;
        let countryData = await fetch(`https://restcountries.com/v3.1/name/${getCountry}`);
        let countryRes = await countryData.json()
        return 'you are staying here :' + countryResponse.city +' '+  countryResponse.country
    }catch(err) {
        throw err;
    }//put this thwrow for the .catch method of this promise
}
//the wrong example of the consuming an return
// console.log('Fetching the information');
// getCountry()
// .then(data => console.log(data))
// .catch(err => console.log(err))
// .finally( () => console.log('user location rendered.')); //do not forget this finnaly can handling an callback to do something

(async function () {
    try{
        console.log('Fetching the information');
        let location = await getCountry();
        console.log(location);
        console.log('user location rendered.');
    }catch(err) {
        console.log(err.message);
    }
})();