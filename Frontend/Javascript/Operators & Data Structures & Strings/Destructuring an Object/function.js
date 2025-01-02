//DESTRUCTURING OBJECTS
let employee = {
    name: 'Steve',
    age: 28,
    gender: 'Male',
    Area: ['London', 'UK'],
    workDetails:{Experience: 5, company: 'Google'},
}

 //DESTRUCTURING SYNTAX FOR OBJECTS
 let{name, age, gender} = employee;
 console.log(name, age, gender);

 //HOW TO CREATE VARIABLES NAMES DIFFERENT OF THE PROPERTY NAME
 //WE CAN PROVIDE ALIAS NAME FOR THE VARIABLES
 //BUT WE STILL NEED TO REFERENCE THE POPERTY WHICH WE WANT TO DESTRUCTURE 
 let {name: firstName, age: a, gender: gen} = employee;
 console.log(firstName, a, gen);

 //DESTRUCTURING NEASTED OBJECT
 let {workDetails: {Experience, company}} = employee;
 console.log(Experience, company);

 //MUTATING VARIABLE VALUE
 let x = 110;
 let y = 120;

 let obj = {x: 10, y: 20};
 
 ({x, y} = obj);
 console.log(x, y);

 //DESTRUCTURING OBJECT RETURNED BY A FUNCTION
 function returnObj() {
    return {id: 101, userName: 'JS'}
}

let{id: i, userName: un} = returnObj();
console.log(i, un);

//DESTRUCTURING NESTED ARRAY OF AN OBJECT
let{Area: [city6, country6]} = employee;

console.log(city6, country6);