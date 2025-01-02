 //AJAX request to web API
 function getCountry(countyName) {
    //1st step create an XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    //2nd step create'https://restcountries.com/v3.1/name/' the request
    xhr.open('GET', +countyName, true);

    //3rd. send the request
    xhr.send();
    
    //Convert The JSON to javascript OBJECT
    xhr.onload = (e) => {
        let response = JSON.parse(xhr.responseText)
        let countryData = response[0];
    console.log(countryData);

        //another way to Destucture the array
        let [data] = JSON.parse(xhr.responseText)
    }


}
getCountry('brasil');
getCountry('usa');
getCountry('germany');