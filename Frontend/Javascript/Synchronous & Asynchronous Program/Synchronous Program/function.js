//Astnchronous Javascript and Ajax
let HelloWorld = function() {
    console.log('Hello, World');;
}

let greetings = function () {
    console.log('Good morning');;
    HelloWorld();
    console.log('Have a good day!');
}

greetings();