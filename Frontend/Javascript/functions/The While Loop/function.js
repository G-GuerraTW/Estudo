//the basic concept of the while loop
let i = 1;//1st step - initialization

while (i <= 10) {
    console.log(i);//2nd step - condiction
    i++;//3nd step - incremement/decrement
    //body for while loop 
}

//problem: create an array with size 5 and which will have
//rnadom numeric elements between 1 and 10. the elements
//of the array should be generated at run time.
let randomArray = [];

//how to genarate a random number
while (randomArray.length <= 4) {
    randomArray.push(Math.floor(Math.random() * 10) + 1);
}
console.log(randomArray);