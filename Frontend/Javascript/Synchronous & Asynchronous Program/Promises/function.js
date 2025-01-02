//javaScript promises
/* 
1st declare the promise object
2nd specify the execution function for the object
*/
let promise = new Promise(function(resolved, rejected) {
    console.log('executer function executed!');
    resolved([10, 20, 30, 40])
});
console.log(promise);


//this code is named producing code
let promise_Request = new Promise(function(resolved, rejected) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'data1.txt', true);
    xhr.send();
    xhr.onload = (e) => {
        if(xhr.statusText === 'OK') {
            resolved(xhr.responseText)
        } else {
            rejected("Something wen wrong. please try again later");
        }
    }
});

//consuming code
promise_Request.then(function(data) {
    console.log(data);
}, function(error) { // <--- this seccond function is for the handl the rejected status of the promise
    console.log(error);
});

// other way to handle the eror is calling the catch method
promise.catch(function(error){
    console.log(error);
});