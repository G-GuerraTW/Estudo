'use strict'

//DESTRUCTURING SYNTAX FOR ARRAYS
let person = ['John', 'smith', 28];

let [firstName, lastName, age] = person;

//HOW TO DESTRUCTURE WITH ONLY 2 VALUES OF 3
let [firstName1, ,age1] = person
//The coma is necessary to avoid a specific value.

//Destructuring will not destroy the original array
console.log(firstName, lastName, age);

//Provide a default value for an variable when it dont have value
let [firstName3, lastName3, age3, gender = 'male'] = person;

//WE SHOULD ALWAYS USE A VALID VARIABLE NAME WHILE DESTRUCTURING

//NESTED ARRAYS HOW TO DESTRUCURE
let personNested = ['John', 'Smith', 28, ['London', 'UK']];

let [firstName4, lastName4, age4, [city, country]] = personNested;

console.log(city, country);

//A SIMPLE USE CASE OF ARRAY DESTRUCTURING
function returnTopperStuidents() {
    return ['Mark', 'Steve', 'Mery', 'John', 'Sarah'];
}

let [first, seccond, third] = returnTopperStuidents();
console.log(first, seccond, third);