/*************************
 * Nullish Coalescing
 *************************/

let a = 100;
let b = 'Height not defined';
let height;

//This is a ternary operator
//height = (a == null || a == undefined) ? b : a;
//console.log(height);

//The SAME THING USING NULLISH COALESCING
//NULLISH COALESCING OPERATOR RETURNS THE VALUE OF ITS FIRST OPERAND
//IF IT NEITHER NULL OR UNDEFINED. OTHERWISE, IT RETURNS THE VALUE OF ITS SECOND OPERAND.

//NULLISH COALESCING IS A BINARY OPERATOR
//IT IS USED TO HANDLE NULL OR UNDEFINED VALUES
let height1 = a ?? b
console.log(height1);