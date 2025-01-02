
// we can avoid the hell callback using the return promise of json, and
//chaining another promise,

function getCountry(country1, country2, country3) {
    fetch('https://restcountries.com/v3.1/name/'+country1)
    .then((response) => response.json())
    .then((data) => {  
        console.log(data[0])
        return fetch('https://restcountries.com/v3.1/name/'+country2)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data[0]);
        return fetch('https://restcountries.com/v3.1/name/'+country3)
    })
    .then((response) => response.json())
    .then((data) => console.log(data[0]))
    .catch((err) => console.log('Error Ocurred'+err));
}
getCountry('usa','brasil','germany')