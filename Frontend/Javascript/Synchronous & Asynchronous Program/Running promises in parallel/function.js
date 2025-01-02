
async function getLocation(url, err = 'Something went, wrong: ') {
    return await fetch(url).then((data) => {
        if(!data.ok)
            throw new Error(err + data.status)
        else {
            return data.json();
        }
    })
} 
//this is a better way to use promise ALL to fetch at once all the ajax requestes
async function getCountry() {
    //promise.all Takes array of promise and return then, but if only one get rejected, all get the caught
    let responseData = await Promise.all([
        getLocation('https://restcountries.com/v3.1/name/usa'),
        getLocation('https://restcountries.com/v3.1/name/brazil'),
        getLocation('https://restcountries.com/v3.1/name/germany')
    ])
    console.log(responseData.map(x => x[0].name.common +' '+ x[0].capital));
}
getCountry();

//Promise.race
//1. take an array of promise
//2. returns the first settle promise, it can be reject or resolve, the first will come first
// Promise.race([
//     Promise.reject('data 1'),
//     Promise.reject('data 2'),
//     Promise.resolve('data 3'),
// ])
// .then(data => console.log(data))
// .catch(err => console.log('error: ' + err));

//real example of race method, 
//with ajax request with time out, case time is passed the race promise get rejected
let timeout = function(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error('Request took too long!'))
        },(ms))
    });
}
//returns the first settled promise
Promise.race([
    getLocation('https://restcountries.com/v3.1/name/usa'),
    timeout(10)
])
.then(data => console.log(data))
.catch(err => console.log(err))
// on this case, with promise.race will run 2 functions, getLocation and timeout,
//and the timeout function will return rejecte error case the fetch cant be fetched after the 
//timeout function


//Promise.allSettled
//1. Takes an array of promises
//2. returns an array of all settled promise
//INtroduced in ES2020
Promise.allSettled([
    Promise.reject('data 1'),
    Promise.reject('data 2'),
    Promise.resolve('data 3'),
])
.then(data => console.log(data))
.catch(err => console.log('error: ' + err));

//comparing with Promise.all method, it only return resolve if all promise is resolved
Promise.all([
    Promise.reject('data 1'),
    Promise.reject('data 2'),
    Promise.resolve('data 3'),
])
.then(data => console.log(data))
.catch(err => console.error(err));

//Promise.any - ES2021
//1. Takes an array of promises
//2. Returns the first resolved promise data
Promise.any([
    Promise.reject('data primeiro'),
    Promise.resolve('data segundo'),
    Promise.resolve('data terceiro'),
])
.then(data => console.log(data))
.catch(err => console.error(err));