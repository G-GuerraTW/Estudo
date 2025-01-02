//XMLHttpRequest Object can be used make AJAX calls to request data from the remote server asynchronously.
//THIS WAY CAN BE USED TO REQUEST LOCAL FILES DATA
document.getElementById('btn_Load')
.addEventListener('click', getProducts);

let div = document.querySelector('.container')
let tabela = document.querySelector('.tabela')

function getProducts() {
    //1st step create an XMLHttpRequest Object
    let xhr = new XMLHttpRequest();

    //2nd step create the request
    //parameters - (method, url, asyc/sync, userid, pswd)
    //method GET-POST-DELET
    xhr.open('GET', 'products.json', true);

    //3rd step send the request
    xhr.send();

    //when request is send and data is not completely loaded yet we can use onprogress event.
    xhr.onprogress = function() {
        div.textContent = 'Loading...';
    }

    xhr.onload = function() {
        //THIS DATA BECOME AS JSON FORMAT, TO USE THAT WILL NEED CONVERT TO JAVASCRIPT OBJECT
        //Converting JSON to JS Object
        let response = JSON.parse(xhr.responseText)

        //Destructuring the data
        let {arrayOfProducts} = response
        console.log(arrayOfProducts);

        arrayOfProducts.forEach(element => {
            tabela.innerHTML += 
            `
            <tr>
                <td>${element.name}</td>
                <td>${element.price}</td>
                <td>${element.description}</td>
            </tr>`
        });
    }
}