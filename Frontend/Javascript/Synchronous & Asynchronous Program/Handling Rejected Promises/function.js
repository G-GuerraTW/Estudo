function getCountry(country1, country2, country3) {
    fetch('https://restcountries.com/v3.1/name/'+country1)
    .then((response) => response.json(),
    (error) => console.log(error))
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
    .catch((err) => console.log('Um Erro Inesperado: '+err))
    .finally(() => (console.log('I always go run, with error, or not.')));
    // Finaly methos it was run no matter it promise was resolved or rejected 
}

function clique() {
getCountry('usa','brasil','germany')
}

