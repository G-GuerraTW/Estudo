 //AJAX request to web API
 function getCountry(countyName) {
    //1st step create an XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    //2nd step create the request
    xhr.open('GET', 'https://restcountries.com/v3.1/name/'+countyName);
    //3rd. send the request
    xhr.send();

    return xhr
 }
    //Convert The JSON to javascript OBJECT
function getData() {
    let req1 = getCountry('usa')
    req1.onload = (e) => {
        let [data1] = JSON.parse(req1.responseText)
    console.log(data1);

        let req2 = getCountry('brasil')
        req2.onload = (e) => {
            let [data2] = JSON.parse(req2.responseText)
        console.log(data2);

            let req3 = getCountry('germany')
            req3.onload = (e) => {
                let [data3] = JSON.parse(req3.responseText)
            console.log(data3);
            }
        }
    }   
}
getData()
