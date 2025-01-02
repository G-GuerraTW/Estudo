let user = {
    name: 'John',
    age: 20,
    occupation: 'Teacher',
    gender: 'Male '
}

//LOOPING OVER OBJECT PROPERTY NAMES 
//KEYS METHOD WILL RETURN AN ARRAY
//THAT ARRAY WILL CONTAIN ALL THE PROPERTIES OF PASSED OBJECT AS ITS ELEMENTS
let arr = Object.keys(user);

console.log(arr);
//FOR LOOP OVER EACH OBJ PROPERTIES 
for(let prop of arr) {
    console.log(prop);
}
//FOR LOOP OVER EACH OBJ VALUES
let values = Object.values(user);
for (const i of values) {
    console.log(i);
}

//LOOP OVER THE ARRAY BOTH PROPERTIE NAME AND VALUE
let ent = Object.entries(user)
console.log(ent);

for (const [key, value] of ent) {
    console.log(key, value);
}