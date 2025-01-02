function getCountry(country1, country2, country3) {
    fetch('https://restcountries.com/v3.1/name/'+country1)
    .then((response) => verifyError(response))
    .then((data) => {  
        console.log(data[0])
        return fetch('https://restcountries.com/v3.1/name/'+country2)
    })
    .then((response) => verifyError(response))
    .then((data) => {
        console.log(data[0]);
        return fetch('https://restcountries.com/v3.1/name/'+country3)
    })
    .then((response) => verifyError(response))
    .then((data) => console.log(data[0]))
    .catch((err) => console.log('Um Erro Inesperado: '+err))
}//the throw statement will return the error to the catch method

function clique() { 
getCountry('usa','brasil','germany')
}

//this is a function to tratament of Errors
function verifyError(response) {
    if(!response.ok)//at this point the response cointais some values with can be checked the status
        throw new Error(`Country not found status error ${response.status}`)
    return response.json()
    // here case the response.ok is not OK the throw statement can except an Error Object,
    // with can hold the response.status with this is an specific error
}