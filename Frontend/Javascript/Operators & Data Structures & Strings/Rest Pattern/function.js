/************************************
 * THE REST PATTERN AND REST PARAMETER
 ************************************/
//SPREAD OPERATOR
let arr = [10, 20, 30,];
console.log(arr);

//DESTRUCTURING OF ARRAYS
let numbers = [10, 15, 20, 25, 30];
let [a, b, ...others] = numbers;//REST PATTERN ON ARRAY
console.log(a, b, others);

//REST PATTERN ON OBJECT
let num = {x: 10, y: 12, z: 13, u: 17};
let{x, y, ...obj} = num;
console.log(x, y, obj);

//REST PARAMETER
function addNumber(...num) {
    let sum = 0;
    for(let i = 0; i < num.length; i++) {
        sum += num[i];
    }
    return sum;
}
console.log(addNumber(20, 30, 40, 50));

//REST PARAMETER CAN STORE A NUMBER AN ELEMENT INSIDE AN ARRAY
//REST PARAMETERS IS ALWAYS ON THE LEFT SIDE OF THE '='
//REST PARAMETERS NEED BE EVER THE LAST ARGUMENT 