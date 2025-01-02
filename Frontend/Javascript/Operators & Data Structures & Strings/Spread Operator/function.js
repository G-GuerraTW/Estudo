/*****************************************
 *  THE SPREAD OPERATOR
 *****************************************/

//EXPANDING ARRAYS
let arr = [10, 20, 30,];

//console.log(arr[0], arr[1], arr[2])
console.log(...arr);

let str = 'Hello';
console.log(...str);

//USE CASE 1: COPYING ARRAY INTO ANOTHER ARRAY
//let newArry = [100, 23, arr[0], arr[1], arr[2]];
let newArry = [100, 23, ...arr]

console.log(newArry);

//PASSING ELEMENTS OF AN ARRAY AS AN ARGUMENT
function addition(num1, num2, num3) {
    return num1 + num2 + num3
}
console.log(addition(...arr))

///USECASE 3 : COMBINING TWO OR MORE ARRAYS INTO A SINGLE ARRAY
let arr1 = [12, 14, 16];
let arr2 = [20, 40];
let arr3 = [...arr1, ...arr2];
console.log(arr3);

