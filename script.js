// Always start with document ready
$(document).ready(function () {
    let time = moment();
    let todaysDate = time.format('YYYY-MM-DD');
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
        newDate();
        // NAME OUTPUT HEADER
        let personDate = $('.name').val();
        let dateName = $('<h1> Hey ' + personDate + ', let\'s go on a date!<h1>')
        dateName.addClass('capitalize') // this adds capitalization
        $('.output').append(dateName);
        // CITY VALUE 
        let city = $('.city').val(); // here we need to make the city the user input 
        console.log(city);
        // WEATHER API
        let weatherAPIKey = '9175113e8a32d9a37cbf34e734be2884' // link your specific api key
        // declare a variable containing the entire api, generate query, and key
        let weatherurlBase = "http://api.openweathermap.org/data/2.5/"
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
            let faren = Math.floor(response.main.temp - 273.5) * 1.80 + 32;
            //Create divs for city name, temp, wind, and humidity
            let cityName = $('<div>' + city + '</div>');
            cityName.addClass('capitalize');
            let iconImage = $('<img src=\"http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png\"/>');
            let tempDiv = $('<div> Temperature: ' + faren + "°F" + '</div>') // replace response with your farenheight var
            let humDiv = $('<div> Humidity: ' + response.main.humidity + "%" + "</div>");
            // reassign values to these var, which will be plugged into the following api calls
            lon = response.coord.lon;
            lat = response.coord.lat;
            $('.temp').append(cityName, iconImage, tempDiv, humDiv);

            // // FOOD ZOMATO API 
            // let cuisines = $('.food').val();
            // let american = $('#american');
            // let chinese = $('#chinese');
            // let indian = $('#italian');
            // let italian = $('# italian');
            // let mexican = $('#mexican');
            // option conditonal 
            let foodDiv = $('.food');
            let american = "1";
            let zomatoAPIKey = '39b38f787a78434f68f944a8c81c8440';
            let zomatoURLBase = ' https://developers.zomato.com/api/v2.1/search?';
            let zomatoURL = zomatoURLBase + "lat=" + lat + "&lon=" + lon + '&cuisines=' + american + '&sort=rating&order=asc&count=1' + "&apikey=" + zomatoAPIKey;
            console.log(zomatoURL);
            $.ajax({
                url: zomatoURL,
                method: "GET",
                headers: { "user-key": zomatoAPIKey, "Accept": "application/json" }
            }).then(function (response) {
                console.log(response.restaurants[0].restaurant.name);
                console.log(response.restaurants[0].restaurant.location.address);


                let americanNameDiv = $('<div> Eat Here: ' + response.restaurants[0].restaurant.name + '</div>');
                let americanLocDiv = $('<div>' + response.restaurants[0].restaurant.location.address + '</div>');
                foodDiv.append(americanNameDiv, americanLocDiv);
                

            });

            let eventAPIKey = 'KVbg12JNLMULu5Dll753u1MVTIcuZhL1'; // link your specific api key
            // declare a variable containing the entire api, generate query, and key
            let eventurlBase = "https://app.ticketmaster.com/discovery/v2/events.json?";
            let eventURL = eventurlBase + "&city=" + city + "&sort=random&size=1" + "&apikey=" + eventAPIKey;
            console.log(eventURL);
            $.ajax({
                url: eventURL,
                method: "GET",
            }).then(function (response) {
                console.log(response)
                let eventHeader = $('<h2>Take Them Here</h2>')
                let eventImageDiv = $('<img src="' + response._embedded.events[0].images[0].url + '"/>');
                eventImageDiv.addClass('event-images')
                console.log(eventImageDiv);
                let eventDiv = $('<a target=\'blank\' href=' + response._embedded.events[0].url + '>' + response._embedded.events[0].name + '</a>')
                $('.event').append(eventHeader, eventImageDiv, eventDiv);

            }).catch(function (error) {
                debugger;
            });
        });
        // ENTERTAINMENT APIs
        $('#clear-btn').click(function () {
            $('#date-name').val("")
            $('#date-city').val("")
            $('#date-food').val("")
            $('#date-entertainment').val("")
        });
    });
    let easyBtn = $('#easy-btn')
    //let easyDateImg = document.getElementById('easy-image');
    let modal = document.getElementById('modal-id');
    let modalClose = document.getElementById('exit');

    easyBtn.on("click", function (event) {
        event.preventDefault();
        $('#modal-id').addClass('active');
        // newDate();
        // easyDateImg.style.display = "block";
        // console.log(easyDateImg)
    });

});