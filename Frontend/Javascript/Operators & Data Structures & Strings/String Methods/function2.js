/************************************************************
 * JAVASCRIPT STRING METHODS & PROPERTIES - PART 2
 ************************************************************/
let myString = 'Javascript is the best';

//toUpperCase() - CONVERTS ALL LETTERS OF A STRING TO UPPERCASE
//toLowerCase() - CONVERTS ALL LETTERS

//SIMPLY CONVERT IT INTO UPPERCASE, BUT DONT CHANGE ORIGINALLY STRING
let toUpper = myString.toUpperCase();
console.log(toUpper);

let toLower = myString.toLocaleLowerCase();
console.log(toLower);

//WRITE A FUNCTION WHICH WILL UPDATE THE LETTER CASE IN A WORD
//1. FIRST LETTER OF THE WORD SHOULD BE IN UPPER CASE
//2. REST ALL OTHER LETTERS SHOULD BE IN LOWER CASE

function firstToUpper(word) {
    let lower = word.toLocaleLowerCase();
    let update = lower[0].toUpperCase() + lower.slice(1);
    return update;
}

console.log(firstToUpper('TEste'));
console.log(firstToUpper('MANGA'));
console.log(firstToUpper('abacate'));

//TRIMING SPACES BEFORE AND AFTER A STRING
let str = '  Hello   '
console.log(str);

//trimStart() - REMOVES SPACES FROM THE START OF A STRING
//trimEnd() - REMOVES SPACES FROM THE END OF A STRING
//trim() - REMOVES SPACES FROM THE START & END OF A STRING
console.log('-----TRIM-----');
console.log(str.trimStart());
console.log(str.trimEnd());
console.log(str.trim());


//REPLACING CHARACTERS / WORDS IN A STRING ( BUT ONLY THE FIRST OCCURANCE)
let greet = 'Hey there. How are you doing today.';
let strReplace = greet.replace('.', '!')
console.log(strReplace);

//REPLACE ALL OCCURANCE let greet = 'Hey there. How are you doing today.';
let strReplace1 = greet.replaceAll('.', '!')
console.log(strReplace1);

let str3 = greet.replace('Hey', 'Hello')
console.log(str3);

//includes(), startsWith(), endsWith(),  <-- this methods return boolean value, if caracter or string is preset.

//includes() - RETURN TRUE IF A CHARACTER OR SUBSTRING IS PRESEN INSIDE A STRING
console.log('---------INCLUDES()---------');
console.log(greet.includes('Hey'));

//startsWith() - RETURN TRUE IF A STRING STARTS WITH A GIVEN CHARACTER OR STRING
console.log('------STARTSWITH()--------');
console.log(greet.startsWith('Hey'));

//endsWith() - RETURN TRUE IF A STRING ENDS WITH A GIVEN CHARACTER OR STRING
console.log('------ENDSWITDH()-------');
console.log(greet.endsWith('today.'));


//USING STRING CONSTRUCTOR AND USE STRING METHODS WITH IT

let strString = 'This is a string';
let strString2 = new String('This is another string!');

console.log(strString);// when a primitive string call an method, this primitive string is parsed to object string
//and this is called of boxing, and after the value is returned from de method de string is converted to primitive again,
//and this is called Unboxing
console.log(strString2.replaceAll());