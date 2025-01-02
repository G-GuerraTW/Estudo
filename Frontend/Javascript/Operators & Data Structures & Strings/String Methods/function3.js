/****************************************************
 * JAVASCRIPT STRING METHODS & PROPERTIES - PART 3
 ****************************************************/
let myString = 'JavaScript is the best'
let anotherString = 'This-is-another-string'

//Split() - SPLIT A STRING INTO MUULTIPLE STRINGS BASED ON A DEVIDER
//AND RETURNS AN ARRAY YOF STRING
console.log('------SPLIT()--------');
let strArray = myString.split(' ')
console.log(strArray);
let anotherArray = anotherString.split('-');
console.log(anotherArray);

//GET USERS FIRSTNAME, MIDDLENAME & LASTNAME FROM HIS FULLNAME
function printNames(fullName) {
 let [fName, mName, lName] = fullName.split(' ')
 console.log(fName, mName, lName);
}
printNames('Gabriel Fernando Guerra');
printNames('Marco Antonio Abile')


//JOIN() - JOINS THE STRIN ELEMENTS OF AN ARRAY INTO SINGLE STRING
console.log('-----JOIN()-------');
let strArrayJoin = ['My', 'name' , 'is', 'John']
console.log(strArrayJoin.join(' '));//THIS ARGUMENT IS A SEPARATE OF THE JOIN,

//FORMAT THE FIRST LETTER OF EACH NAME IN UPPER CASE

console.log('-------EXAMPLE---------');
function formatName(fullName) {
    let nameArr = fullName.toLocaleLowerCase().split(' ')
    let storedName = [];
    let jointName = '';

    for (const name of nameArr) {
        storedName.push(name[0].toUpperCase() + name.slice(1));
    }
    jointName = storedName.join(' ')
    return jointName;
}
console.log(formatName('gabriel FERNADO dos santos guerra'));



//PADDING METHODS - padStart() & padEnd()
//PADDING METHODS ADD A NUMBER OF CHARACTER TO A STRING UNTIL
//THE STRING HAS A CERTAIN DESIRED LENGTH
console.log('------PADSTART()--------');
console.log(myString.length);
console.log(myString.padStart(30, '*'));//FIRST ARGUMENT IS DESIRE LENGHT,
console.log(myString.padEnd(30, '*'));//THE SECCOND ARGUMENT IS THE CHARACTER YOU WANT TO COMPLETY

//USE CASE MASK THE C REDIT/DEBIT CARD DETAILS
console.log('------USE CASE------');
function maskNumber(fullNumber) {
    let maskedNumber = fullNumber.slice(11).padStart(15 ,'*** ')
    return maskedNumber
}

console.log(maskNumber('123 456 789 101'));
console.log(maskNumber('234 906 228 711'));

//REPEAT - REPEATS A STRING FOR A GIVEN NUMBER OF TIMES
console.log('------REPEATS()-------');
console.log('Hello'.repeat(5));

//CONCAT - CONCATENATES TWO STRINGS
console.log('----CONCAT()------');
let concat1 = 'Hello';
let concat2 = 'World';
let concatened = concat1.concat(concat2);
console.log(concatened);
