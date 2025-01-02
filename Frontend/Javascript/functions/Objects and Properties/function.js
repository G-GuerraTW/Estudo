//there are two syntax to create an Object in Javascript
// 1. Object Literal: {}
// 2. Object Constructor: new Object()`

let person = {
    name: 'John',
    birthYear: 1990,
    job: 'Teacher',
    'Is Married': false
}
console.log(person);

//There are two ways to acess an Object`s propery: And Modify they
// 1. Dot Notation
//object.property
console.log(person.name);

// 2. Square bracket notation
//object['property']
console.log(person['Is Married']);


//Modify Values
person.name = 'Mark'
person['Is Married'] = true;

console.log(person);
console.log(person['Is Married']);

//Adding a New Property for the object
person.gender = 'male'
console.log(person);
person['city'] = 'Barra Bonita'
console.log(person);