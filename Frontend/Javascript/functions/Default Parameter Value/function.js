//                 Function Parameters
function greetings(name, timeOfDay){
    //body of function
    console.log('Good '+timeOfDay+' '+name+'. Welcome back');
} 
//        Function Arguments

greetings('Fernando', 'Evening');
greetings('Guerra', 'Afternoon');


// SETTING Default value for a parameter, when the function is called, but the arguements is not supplied
function greetings_02(name = 'Steve', timeOfDay = 'Morning'){
    //body of function
    console.log('Good '+timeOfDay+' '+name+'. Welcome back');
} 
greetings_02('Gabriel');