// Always start with document ready
$(document).ready(function () {
    let haveFun = document.getElementById('output-header')
    function newDate() {
        haveFun.style.display = "block";
        dateContainer.style.display = "block";
    };
    let dateContainer = document.getElementById("container2")
    let generate = $('.date-btn')
    // create an event listener that will populate the page with data from the API about the user's input
    generate.on('click', function (event) {
        event.preventDefault();
        newDate();
        let personDate = $('.name').val();
        let dateName = $('<h1> Hey ' + personDate + ', let\'s go on a date!<h1>')
        $('.output').append(dateName);
        // Here we are building the URL we need to query the database
        let city = $('.city').val(); // here we need to make the city the user input 
        console.log(city);
        // String.city.capitalize = function() {
        //     return city.charAt(0).toUpperCase() + city.slice(1);
        // }
        // capitalize();
        let APIKey = '9175113e8a32d9a37cbf34e734be2884' // link your specific api key
        // declare a variable containing the entire api, generate query, and key
        let urlBase = "http://api.openweathermap.org/data/2.5/"
        let currentWeatherURL = urlBase + "weather?q=" + city + "&appid=" + APIKey;
        console.log(currentWeatherURL);
        // declare var for latitiude and longitude, bc they will be needed for other api calls
        //use ajax to call your object
        $.ajax({
            url: currentWeatherURL,
            method: "GET"
        }).then(function (response) {
            // declare a var that converts kelvin to farenheight 
            let faren = Math.floor(response.main.temp - 273.5) * 1.80 + 32
            //Create divs for city name, temp, wind, and humidity
            let cityName = $('<div>' + city + '</div>');
            let tempDiv = $('<div> Temperature: ' + faren + "°F" + '</div>') // replace response with your farenheight var
            let humDiv = $('<div> Humidity: ' + response.main.humidity + "%" + "</div>")
            $('.temp').append(cityName, tempDiv, humDiv);
        });
    });
});