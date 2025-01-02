//This is a simple way to log an array and the array inside of each array
let person = [
    ['John', 28, 'teacher'],
    ['Mery', 24, 'designer'],
    ['Mark', 30, 'lawyer']
]; 
//neasted loop example
for (let i = 0; i < person.length; i++) {
    let arr = person[i];
    for(j = 0; j < arr.length; j++){
        console.log(arr[j]);
    }
}