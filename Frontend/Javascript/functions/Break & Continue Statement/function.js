//When a continue statement is encountered, it skips the current iteration and start the next iteration.
let years = [1990, 2007, 1989, 1995]
let fullAges = [];
//for skip the iteration code and go to nex interation will need use *continue* statement code
for (let i = 0; i < years.length; i++) {
    let age = 2023 - years[i];
    if(age < 18)
        continue;
    fullAges.push(age);
    
}
console.log(fullAges);

//When a brek statement is encountered, the loop exit immediately
let FullAges = [];
for (let I = 0; I < years.length; I++) {
    let age = 2023 - years[I];
    if(age < 18)
        break;
    FullAges.push(age);
    
}
console.log(FullAges);