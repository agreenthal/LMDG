// Always start with document ready
$(document).ready(function () {
    let time = moment();
    let todaysDate = time.format('YYYY-MM-DDTHH:mm:ssZ');
    let haveFun = document.getElementById('output-header')
    let dateContainer = document.getElementById("container2")
    function newDate() {
        haveFun.style.display = "block";
        dateContainer.style.display = "block";
    };
    let generate = $('.date-btn')
    // create an event listener that will populate the page with data from the API about the user's input
    generate.on('click', function (event) {
        event.preventDefault();
        $('.output').html('')
        $('.temp').html('');
        $('.event').html('');
        $('.food').html('');
        newDate();
        // NAME OUTPUT HEADER
        let personDate = $('.name').val();
        let goOnDate = 'Hey ' + personDate + ', Let\'s Go On A Date!'
        let dateName = $('<h1>' + goOnDate + '<h1>');
        dateName.addClass('capitalize'); // this adds capitalization
        $('.output').append(dateName);
        // CITY VALUE 
        let city = $('.city').val().trim(); // here we need to make the city the user input 
        console.log(city); 
        
        if(!personDate){
            $('#namespan').text('please input a name!')
        }
        if(!city){
            $('#cityspan').text('please input a city!')
        }

        if(personDate&&city){
              newDate(); 
        }
        // WEATHER API
        let weatherAPIKey = '9175113e8a32d9a37cbf34e734be2884'; // link your specific api key
        // declare a variable containing the entire api, generate query, and key
        let weatherurlBase = "http://api.openweathermap.org/data/2.5/";
        let weatherURL = weatherurlBase + "weather?q=" + city + "&appid=" + weatherAPIKey;
        console.log(weatherURL);
        // declare var for latitiude and longitude, bc they will be needed for other api calls
        let lon;
        let lat;
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            // declare a var that converts kelvin to farenheight 
            let faren = Math.floor((response.main.temp - 273.5) * 1.80 + 32);
            //Create divs for city name, temp, wind, and humidity
            let cityName = $('<h2> Current Weather for ' + city + '</h2>');
            cityName.addClass('capitalize');
            let iconImage = $('<img src=\"http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png\"/>');
            let tempDiv = $('<div> Temperature: ' + faren + "°F" + '</div>') // replace response with your farenheight var
            let humDiv = $('<div> Humidity: ' + response.main.humidity + "%" + "</div>");
            // reassign values to these var, which will be plugged into the following api calls
            lon = response.coord.lon;
            lat = response.coord.lat;
            $('.temp').append(cityName, iconImage, tempDiv, humDiv);
            // // FOOD ZOMATO API 
            let cuisines = document.getElementById('food-select');;
            let zomatoAPIKey = '39b38f787a78434f68f944a8c81c8440';
            let zomatoURLBase = ' https://developers.zomato.com/api/v2.1/search?';
            let randomFood = Math.floor(Math.random() * 50);
            let foodDiv = $('.food');

            let cuisineChoice = function (food) {
                console.log(food);
                let zomatoURL = zomatoURLBase + "lat=" + lat + "&lon=" + lon + "&cuisines=" + food + "&sort=rating&order=asc&count=" + randomFood + "&apikey=" + zomatoAPIKey;
                console.log(zomatoURL);
                $.ajax({
                    url: zomatoURL,
                    method: "GET",
                    headers: { "user-key": zomatoAPIKey, "Accept": "application/json" }
                }).then(function (response) {
                    let randomIndex = Math.floor(Math.random() * randomFood);
                    console.log(randomFood);
                    let foodHeader = ('<h2> Eat Here </h2>');
                    let foodNameDiv = ('<div>' + response.restaurants[randomIndex].restaurant.name + '</div>');
                    let foodLocDiv = ('<div>' + response.restaurants[randomIndex].restaurant.location.address + '</div>');
                    foodDiv.append(foodHeader, foodNameDiv, foodLocDiv);
                });

            };

            cuisineChoice(cuisines.value);
        });
        // EVENT API
        if ($("input[name='choice']:checked").val() === 'entYes') {
            let eventAPIKey = 'KVbg12JNLMULu5Dll753u1MVTIcuZhL1'; // link your specific api key
            // declare a variable containing the entire api, generate query, and key
            let eventurlBase = "https://app.ticketmaster.com/discovery/v2/events.json?";
            let randomEvent = Math.floor(Math.random() * 100);
            let eventURL = eventurlBase + "&city=" + city + "&sort=date,asc&size=" + randomEvent + "&startDateTime=" + todaysDate + "&apikey=" + eventAPIKey;
            console.log(eventURL);
            $.ajax({
                url: eventURL,
                method: "GET",
            }).then(function (response) {
                console.log(response)
                let eventHeader = $('<h2> Event </h2>')
                let eventImageDiv = $('<img src="' + response._embedded.events[0].images[0].url + '"/>');
                eventImageDiv.addClass('event-images');
                console.log(eventImageDiv);
                let eventDiv = $('<a target=\'blank\' href=' + response._embedded.events[0].url + '>' + response._embedded.events[0].name + '</a>');;
                $('.event').append(eventHeader, eventImageDiv, eventDiv);
            }).catch(function (error) {
                debugger;
            });
        }
    });
    // clear button functionality 
    $('#clear-btn').on('click', function () {
        $('#date-name').val("")
        $('#date-city').val("")
        $('#date-food').val("")
        $('#date-entertainment').val("")
    });
});
