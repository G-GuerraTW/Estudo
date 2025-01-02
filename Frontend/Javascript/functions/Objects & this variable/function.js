//Javascript Objects and methods
function greetings(){
    console.log('Have a nice day!');
}
//calling a property through the this variable
let person = {
    name: 'John',
    birthYear: 1990,
    job: 'Teacher',
    calculateAge: function(){
        return 2023 - this.birthYear;
    },
    greet: greetings
}
console.log(person.calculateAge());
person.greet();

let john = {
    name: 'John',
    age: 28,
    greeting: function () {
        console.log('Hi, my name is '+this.name+' and i am '+this.age+' years old.');
    }
}

let mark = {
    name: 'mark',
    age: 30
}

mark.greeting = john.greeting;
john.greeting();
mark.greeting();