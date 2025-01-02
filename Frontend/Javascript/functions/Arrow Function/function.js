//Arrow function
let greeting1 = (name, timeOfDay) => {
    console.log('Good '+timeOfDay+' '+name+'. Welcome back');
}
greeting1('gabriel', 'Morning');


// Using an anonymous expression function with no braces returning an value
let greeting2 = (name, timeOfDay) => 'Good '+timeOfDay+' '+name+'. Welcome back';
let msg = greeting2('gabriel', 'Morning');
console.log(msg);