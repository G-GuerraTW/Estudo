//Javascript Arrays
//creating an array
//these values on array, are called as elements
let persons = ['john', 'mark', 'mery', 'steve']
console.log(persons);
//using array constructor
let years = new Array(1990, 1979, 2007, 1995);
console.log(years);

//Array is a zero based index
console.log(persons[1]);
console.log(persons[0]);
console.log(persons[2]);
console.log(persons[3]);

//modify array elements data value
persons[0] = 'steve'
console.log(persons[0]);

//getting a total cont of array
console.log(persons.length);

let arr = []
arr[50] = 'test'
console.log(arr);

//truncating the array size it not be reversed
let num = [12 ,24 ,15, 37, 18]
num.length = 2;
console.log(num);
num.length = 5;
console.log(num);
