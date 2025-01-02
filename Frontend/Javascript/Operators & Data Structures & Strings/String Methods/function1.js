/************************************************************
 * JAVASCRIPT STRING METHODS & PROPERTIES - PART 1
 ************************************************************/
//STRING IS A SEQUENCE OF CHARACTER, AND EACH CHARACTER HAS A INDEX POSITION
let myString = 'Javascript is the best';
let myString2 = 'Hey there! Are you doing today'

//EXTRACT AN CHARACTER FROM A STRING
console.log('---------Hard Index---------');
console.log(myString[0]);

//GETTING A TOTAL NUMBER OF CHARACTER OF A STRING
console.log('----------.lenght-----------');
console.log(myString.length);

//GETTING A CHARACTER OF POSITION IN A STRING WITH HARDCODE 
console.log('----Hard Length Position----');
console.log('Hello'[2]);
console.log('Hello'.length);

//IndexOf() - RETURNS THE INDEX OF FIRST OCCURANCE OF A CHARACTER (ONLY RETURN FIRST OCCURANCE)
console.log('----------indexOF-----------');
console.log(myString.indexOf('s'));
console.log(myString.indexOf('best'));

//LastIndexOf() - RETURNS THE INDEX OF LAST OCCURRANCE OF A CHARACTER
console.log('---------lasIndexOf---------');
console.log(myString.lastIndexOf('s'));

//SLICE() - EXTRACTS A SUBSTRING FROM A STRING
//THE SLICE ALSO HAS A SECCOND ARGUMENT, THIS IS THE INDEX OF THE LAST SLICED STRING.
//EVER CONSIDER PLUS 1 INDEX TO THE SECCOND ARGUMENT OF SLICE METHOD
console.log('-----------SLICE------------');
console.log(myString.slice(11, 16));
//THE SLICE INDEX CAN ALSO PROVIDE AN NEGATIVE INDEX
console.log('------NEGATIVE SLICE--------');
console.log(myString.slice(-4));


//FIND THE FIRST WORD FROM A STRING  
console.log('-------Find First Word--------');
let index = myString.indexOf(' ')
console.log(myString.slice(0, index));

//FIND THE LAST WORD FROM A STRING
console.log('------Last Word of string-------')
let last = myString2.lastIndexOf(' ') + 1
console.log(myString2.slice(last));

console.log('--------Working with Strings-----------');

let emp1 = {name: 'Gabriel', empCode: 'BLR1122P', gender: 'Male'}
let emp2 = {name: 'Mark', empCode: 'NYC1322C', gender: 'Male'}
let emp3 = {name: 'Merry', empCode: 'LON4321P', gender: 'Female'}

function getLocation(locationCode) {
    let location;

    switch(locationCode) {
        case 'BLR':
            location = 'Bengalore';
            break;
        case 'NYC':
            location = 'New York';
            break;
        case 'LON':
            location = 'London';
            break;
        default:
            location = 'Unknown location'
    }

    return location;
}

function printDetails(emp) {
    let employeeLocation = ''
    employeeLocation = getLocation(emp.empCode.slice(0, 3));
    let employeType = emp.empCode.slice(-1) === 'P' ? 'Permanent' : 'Contractor'
    console.log(`${emp.name} is working from ${employeeLocation} office and he/she is a ${employeType}`);
}

printDetails(emp1)
printDetails(emp2)
printDetails(emp3)


//REVERSE - REVERSES THE ORDER OF AN ELEMENT IN THE ARRAY
console.log('------REVERSE()-------');
let alphabet = ['a', 'b', 'c', 'd', 'e']
console.log(alphabet.reverse());//ALSO UPDATE THE ORIGINALY ARRAY