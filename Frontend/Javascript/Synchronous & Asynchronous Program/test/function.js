let soma = 0;
function verificaValor (valor){
    return new Promise((resolve, reject) => {
        if(valor %2 == 0) {
            soma += valor;
            resolve (console.log('Valor entrado é Par: ' + valor));
        } else {
            soma -= valor;
            throw new Error('Valor é Impar: ' + valor)
        }
    })
}
verificaValor(2).catch(err => console.log(err));
verificaValor(2).catch(err => console.log(err));
verificaValor(2).catch(err => console.log(err));
verificaValor(2).catch(err => console.log(err));
verificaValor(5).catch(err => console.log(err));


function teste () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve ('Hello World')
        },(2000))
    })
}

console.log(teste().then(data => console.log(data)))

function job(data) {
    return new Promise((resolve, reject) => {
        if(isNaN(data))
            reject("error")
        else {
            if(data % 2 == 0) 
                resolve(timer(2000))
            else 
                resolve(timer(1000))
        }
    })
}

function timer(ms) {
    return new Promise((resolve, reject) => {
        if(ms == 1000) {
            setTimeout(() => {
                resolve ("odd")
            },(ms))
        } else {
            setTimeout(() => {
                reject ("even")
            },(ms))
        }
    })
} 

console.log(job(2));
