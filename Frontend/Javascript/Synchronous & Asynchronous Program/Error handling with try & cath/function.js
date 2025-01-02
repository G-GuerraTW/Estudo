//error handling with try...catch

try {
    let x = 10
    const y = 'hello, world'
    y = 100;
}catch(err) {
    console.log('Error: ' + err);
}

//handling async function with try, catch error
let getcountryinfo = async function () {
    try {
        let response = await fetch('https://restcountries.com/v3.1/name/brasil')
        let responseData = await response.json();
        console.log(responseData[0]);
    }catch(err) {
        console.log('This is the error' + err);
    }
}
getcountryinfo()

//handling a async function with catch method.

//handling async function with try, catch error
let getcountryinfo1 = async function () {
    let response = await fetch('https://restcountries.com/v3.1/name/brasil')
    let responseData = await response.json();
    console.log(responseData[0]);
}
getcountryinfo1()
.catch(err => console.log('you got some error: ' + err.message));
