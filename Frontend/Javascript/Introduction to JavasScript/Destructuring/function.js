//Destructuring is a expressin that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
const numerosPares = [2, 4, 6]
const numerosImpares = [1, 3, 5]
// this -> [...] force to extract only the inner values of
const numeros = [...numerosPares, ...numerosImpares]
//[...] on statement side force pack the values to array
const [num1, num2, ...num3] = [1, 2, 3, 4, 5]

 console.log(num1, num2, num3);

//state an default value for array, if the array dont assign an external value
 const [nome1 = 'Ju'] = [1]
 console.log(nome1);

 //to use herança on object
 const pessoa = {
    nome: 'Ju',
    idade: 25 
}

const pessoaComTelefone =
{...pessoa,
    telefone: 123123,
    idade: 35
}

console.log(pessoaComTelefone);