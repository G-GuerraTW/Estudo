/********************************************
 * JAVASCRIPT OF...OF LOOP
 *******************************************/

let students = ['John', 'Merry', 'Steve', 'Mark', 'Sarah', 'Mike']

let str = 'Hello from JavaScript';

//SYNTAX OF FOR...OF LOOP 
// for (const iterator of object) {
    
// }

//LOOP OVER AN ARRAY USING FOR...OF
for (const item of students) {
    console.log(item);
}

let teste = {name : 'abc', age: 18, city : 'London'};

for (const s of str) {
    console.log(s);
}


//EXAMPLE OF COUNT A STRING WITHOUT USE A .LENGHT
function countString(str) {
    let tot = 0;
    for (const s of str) {
        tot++
    }
    console.log(tot);
}
countString(str);