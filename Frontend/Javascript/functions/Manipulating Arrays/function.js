//Manipulatin Arrays
let persons = ['john', 'mery', 'Mark'];

//adding a new element to specific index of array
persons[3] = 'Steve'

//adding a new element to the last index of array
persons.push('sarah'); 

//unshift - adds new elements at the start of the array
persons.unshift('gabriel', 'fernando')

console.log(persons);
//Remove elements from array
//pop - remove the last element of the array and returns it
console.log(persons.pop());

//shift - remove element from start of array and return it
console.log(persons.shift());
console.log(persons);

//indexOf - returns the index of an element in an array
let i = persons.indexOf('john')
console.log(i);