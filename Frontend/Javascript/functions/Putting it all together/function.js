function converTo(temperature, unit = 'Fahrenheit'){
    if(unit == 'Fahrenheit')
        return ((temperature * 9/5) + 32);
    else 
        return ((temperature - 32) * 5/9);
}
x = converTo(50, 'Fahrenheit');
console.log(x); 