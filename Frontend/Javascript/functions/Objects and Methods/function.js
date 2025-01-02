//Javascript Objects and methods
function greetings(){
    console.log('Have a nice day!');
}

let person = {
    name: 'John',
    birthYear: 1990,
    job: 'Teacher',
    calculateAge: function(birthYear){
        return 2023 - birthYear;
    },
    greet: greetings
}
console.log(person.calculateAge(1994));
person.greet();