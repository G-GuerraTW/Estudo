/*********************************************
 * CREATING MAPS FROM ARRAYS AND OBJECTS
 *********************************************/
//ON THIS EXAMPLE LET'S PUT SEVERAL ENTRIES AT ONCE ON THE MAP

//THIS EXAMPLE IS ADDING ENTRIES LINE BY LINE
let userTeste = new Map();
userTeste.set('name', 'John')
.set('age', 28);
console.log(userTeste);

//THIS EXAMPLE IS ADDING SEVERAL AT ONCE
let user = new Map([
    ['name', 'John'], 
    ['age', 28], 
    ['city', 'London']
]);
console.log(user);

//HOW TO CONVERT AN OBJECT INTO A MAP
let customer = {
    id: 101,
    name: 'Mark',
    gender: 'Male',
    city: 'London',
}
//THIS IS THE WAY, FIRST USING OBJECT.ENTRIES METHOD TO RETURN PAIRS OF
//PROPERTY KEY - VALUE
let mapCustomer = new Map(Object.entries(customer))
console.log(mapCustomer);

//CONVERTING A MAP INTO AN ARRAY
let x = [...mapCustomer];
console.log(x);

//CONVERTING ONLY A MAP KEY INTO VALUES
let y = [...mapCustomer.keys()];
let z = [...mapCustomer.values()];
console.log(z);
console.log(y);

//ONLY ENTRIES
let u = [...mapCustomer.entries()];
console.log(u);


//LOOPING OVER MAPS
for (const [key, value] of mapCustomer) {
    console.log(`Value for key ${key} is ${value}`);
}
