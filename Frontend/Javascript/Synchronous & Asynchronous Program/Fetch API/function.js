//The fetch API
function getCountry(country) {
    //Make AJAX request
    let promise1 = fetch('https://restcountries.com/v3.1/name/'+country);
    promise2 = promise1.then(function(response) {
        return response.json();
    });

    promise2.then(function(data) {
        console.log(data[0]);
    })
}

getCountry('usa')

//If the prommise is resolved
//1. The then method attached to that promise will be called
//2. To the callback function of then method, promise will pass the resolved data
//3. callback function of the then method is executed

//we can use a promise with a short way, look this code below

function pesquisarPais(pais) {
    fetch('https://restcountries.com/v3.1/name/' + pais, {method: 'GET'})
    .then((r) => r.json())
    .then((data) => console.log(data[0]))
    .catch((r) => console.log('AN ERROR OCURRED'+r))
};
pesquisarPais('brasil')