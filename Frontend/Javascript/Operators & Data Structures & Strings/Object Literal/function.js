let workingDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

let shift = {
    [workingDays[0]]: '10AM - 7PM',
    [workingDays[1]]: '10AM - 7PM',
    [workingDays[2]]: '10AM - 7PM',
    [workingDays[3]]: '10AM - 7PM',
    [workingDays[4]]: '10AM - 7PM',
}

// let shift = {
//     Mon: '10AM - 7PM',
//     Tue: '10AM - 7PM',
//     Wed: '10AM - 7PM',
//     Thu: '10AM - 7PM',
//     Fri: '10AM - 7PM',
// }

//VARIABLE ARE ASSIGNED IMPLICITELY TO THE PROPERTIED WITH SAME NAME
//IF WE ARE NOT ASSIGNING ANY VALUE TO THAT PROPERT EXPLICITELY

//ENHACEMENT IN THE WAY WE CREATE METHODS FOR AN OBJECT

//3. JAVASCRIPT R
let employee = {
    id: 101,
    name: 'John',
    birthYear: 1990,
    workingDays,
    shift,

    calculateAge() {
        let age = 2021 - this.birthYear;
        console.log(age);
    }
}
console.log(employee);
employee.calculateAge();

