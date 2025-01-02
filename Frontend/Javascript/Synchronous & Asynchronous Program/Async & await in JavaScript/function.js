//Javascript async await
//Async - Executes a funtion asynchronously & returns a promise
//Awaiy - waits for a promise to get settled


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
    let geoData = await getLocation();
    let {latitude: lat, longitude: lng} = geoData.coords;
    let country = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    let countryResponse = await country.json();
    let getCountry = countryResponse.country;
    let countryData = await fetch(`https://restcountries.com/v3.1/name/${getCountry}`);
    let countryRes = await countryData.json()
    console.log(countryRes[0].subregion)
}
getCountry();
