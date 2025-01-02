//Function Declaration
function greeteings(){
    console.log('Good morning user. Welcome back');
}

greeteings();

//Function expression
//assign an anonymous function to a variable
//anonymous function is a function which does not have a name
let greet = function(){
    console.log('FE: Good morning user. Welcome back!');
};
greet();
console.log(greet);
//assign the expression function to another variable
let x = greet;
x();

//Difference between function declaration and fucntion expression ?
// Function declaration is a Code Block
//Function Expression is a statement