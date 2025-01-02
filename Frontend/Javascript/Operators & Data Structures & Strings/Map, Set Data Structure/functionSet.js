/***********************************
 * WHAT ARE SETS IN JAVASCRIPT
 ***********************************/
//CREATING A NEW SET
let cities = new Set(['London', 'New York', 'Mubai', 'London', 'Delhi']);
console.log(cities);

let randomData = new Set([12, true, 'Hello', null])
console.log(randomData);

let str = new Set(new String('Hello'))
console.log(str);

//SIZE() - RETURNS NUMBER OF ENTRIES A SET HAS
console.log(cities.size);

//HAS() - RETURN TRUE IS THE PASSED ITEM IS PRESENT IN SET
console.log(cities.has('London'));

//ADD() - ADD ELEMENTs TO A SET
cities.add('Tokyo');
console.log(cities.has('Tokyo'));

//DELETE - DELETE AN ENTRY FROM THE SET/
cities.delete('Delhi');

//CLEAR - DLEETE ALL ENTRIOES FROM THE SET
randomData.clear();
console.log(cities);

//LOOPING OVER SETS
for (const city of cities) {
    console.log(city);
}

//1. REMOVE DUPLICATE VALUES FROM AN ARRAY
let names = ['John', 'Mark', 'Merry', 'Mark', 'Steve', 'John'];
let namesSet = new Set(names);
console.log(namesSet);
let uniqArr = [...namesSet];
console.log(uniqArr);

//2. COUNTING NUMBER OF *UNIQUE* CHARACHTERS IN A STRING
let str1 = 'this is a string';
let strSet = new Set(str1);
console.log(strSet.size);