let user = {
    name: 'John',
    age: 28,
    gender: 'Male',
    hobbies: null,
    contact: {
        phone: 9988776655,
        email: 'john@somemail.com',
        adress: {
            street: '10th Main Street',
            area: 'Abey Wood',
            city: 'London',
            country: 'UK'
        }
    }
}
console.log(user.name);
console.log(user.birthYear);
console.log(user.contact.phone);
console.log(user.contact.city?.name);


// if(user.contact.city === null || user.contact.city === undefined) {
//     console.log(undefined);
// }else {
//     console.log(user.concat.city.name);
// }

let text = document.querySelector('h2')?.innerText;
console.log(text);