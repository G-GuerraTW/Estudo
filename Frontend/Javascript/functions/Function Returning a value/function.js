function greetings(name, timeOfDay){
    //body of function
    console.log('Good ' +timeOfDay+' '+name+'. Welcome back!');
    return 10; 
    // after the return keyword the code will quite from the function, no one code below return will be processed
    //console.log('teste');
}

//calling a function
let x = greetings();
console.log(x);
greetings('Mark');
greetings('Mery', 'Afternoon');

