var location;
var city, country, lat, lon, address;
var city1 = "madrid";

// App initialization
if (window.FlowingFreeApp === undefined) {
    window.FlowingFreeApp = {};
}

FlowingFreeApp.init = function() {
    console.log('FlowingFreeApp online!!!');

}
$(window).on('load', function() {

});
$(document).on('ready page:load', function() {
    FlowingFreeApp.init();
    $('.news-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
    });
    if (city === undefined) {
        FlowingFreeApp.getLocation();
    } else {
        $('.current-city').text(city);
        FlowingFreeApp.getPlacesByPosition(lat, lon);
        FlowingFreeApp.getVenuesByLocation(lat, lon);
        FlowingFreeApp.getImageBackgroundByLocation(lat, lon);
        FlowingFreeApp.getNewsByLocation(city);
        FlowingFreeApp.getGigsByLocation(city);
        FlowingFreeApp.getWeather(city, country);
    }

    $('#city-form').on('click', '.search-button-city', function() {
        address = $('#search-input-city').val();
        city1 = $('#search-input-city').val();
        address != 'undefined' ? address : address = 'madrid';
        var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false";
        FlowingFreeApp.ajaxRequest(url, function(response) {
            lat = response.results[0].geometry.location.lat;
            lon = response.results[0].geometry.location.lng;
            var cityArrayPosition = response.results[0].address_components.length - 1;
            city = response.results[0].address_components[0].short_name;
            country = response.results[0].address_components[cityArrayPosition].long_name;

            $('.current-city').text(city);
            FlowingFreeApp.getPlacesByPosition(lat, lon);
            FlowingFreeApp.getVenuesByLocation(lat, lon);
            FlowingFreeApp.getImageBackgroundByLocation(lat, lon);
            FlowingFreeApp.getNewsByLocation(city);
            FlowingFreeApp.getGigsByLocation(city);
            FlowingFreeApp.getWeather(city, country);
        });
    });

    $('#places-holder').on('click', 'a', function() {
        var name = $(this).attr("data-name");
        var price = $(this).attr("data-price");
        var rating = $(this).attr("data-rating");
        var locationAddress = $(this).attr("data-location-address");
        var locationCity = $(this).attr("data-location-city");
        FlowingFreeApp.printModalContent(name, locationAddress, locationCity)
    });

    $('#gigs-holder').on('click', 'a', function() {
        var name = $(this).attr("data-name");
        var venue = $(this).attr("data-gig-venue");
        var date = $(this).attr("data-gig-date");
        var city = $(this).attr("data-gig-city");
        var follow_url = $(this).attr("data-gig-follow-url");
        FlowingFreeApp.printModalContent(name, date, venue, city);
    });

    $('#venues-holder').on('click', 'a', function() {
        var name = $(this).attr("data-name");
        var type = $(this).attr("data-venue-type");
        var town = $(this).attr("data-venue-town");
        var urlimg = $(this).attr("data-venue-img");
        FlowingFreeApp.printModalContent(name, type, town);
    });

    $('#events-day').on('click', function() {
        FlowingFreeApp.getDayEvents(city1, country);
    });

    $('#events-week').on('click', function() {
        FlowingFreeApp.getWeekEvents(city1, country);
    });

    $('#events-month').on('click', function() {
        FlowingFreeApp.getMonthEvents(city1, country);
    });

});

// Regular Ajax Request
FlowingFreeApp.ajaxRequest = function(urlEnd, successFunction) {
    $.ajax({
        url: urlEnd,
        dataType: 'json',
        data: {},
        success: successFunction
    });
}

// Success Ajax Functions
FlowingFreeApp.successGigs = function(response) {
  
    for (var i = 0; i <= response[1].length - 1; i += 1) {
        $('#gigs-holder').append("<a data-name='" + response[1][i].name +
            "' data-gig-date='" + response[1][i].eventdate +
            "'data-gig-venue='" + response[1][i].venue +
            "'data-gig-city='" + response[1][i].city +
            "'data-gig-follow-url='" + response[1][i].follow_url +
            "' '>" + response[1][i].name +
            "</a></br>");
    }
}

FlowingFreeApp.successVenue = function(response) {

    for (var i = 0; i <= response.results.length - 1; i += 1) {
        $('#venues-holder').append("<a data-name='" + response.results[i].name +
            "' data-venue-type='" + response.results[i].type +
            "' data-venue-town='" + response.results[i].town +
            "' data-venue-img='" + response.results[i].imageurl +
            "' '>" + response.results[i].name +
            "</a></br>");
    }
}

FlowingFreeApp.successPlaces = function(response) {

    for (var i = 0; i <= response.response.groups[0].items.length - 1; i += 1) {
        $('#places-holder').append("<a data-name='" + response.response.groups[0].items[i].venue.name +
            //   "'data-price='" + response.response.groups[0].items[i].venue.price.message +
            // "'data-rating'" + response.response.groups[0].items[i].venue.rating +
            "'data-location-address='" + response.response.groups[0].items[i].venue.location.address +
            "'data-location-city='" + response.response.groups[0].items[i].venue.location.city +
            " '>" + response.response.groups[0].items[i].venue.name +
            "</a></br>");
    }
}

FlowingFreeApp.successVenuePhotos = function(i, response) {
    console.log("photos");
    console.log(event);
    console.log(i);
    var url = response.response.photos.items[0].prefix + "120x120" + response.response.photos.items[0].suffix;
    $('.place-img').attr('src', url);
}

FlowingFreeApp.successWeather = function(response) {
    var celsius = FlowingFreeApp.convertTemperature(response.list[0].main.temp);
    $('#weather-description').text(" " + response.list[0].weather[0].description);
    $('#weather-humidity').text(" ,Humidity: " + response.list[0].main.humidity + "%");
    $('#weather-temperature').text(" ,Temperature: " + celsius + "C.");
}

FlowingFreeApp.successEvents = function(response) {
    //  $('#day-events-holder').html("");

    for (var i = 0; i <= response.length - 1; i += 1) {

        $('#day-events-holder').append("<div class='medium-6 columns end'><div class='card'><div class='content'><span class='title'>" + response[i].artists[0].name + "<img id='chin' src='http://us.cdn2.123rf.com/168nwm/limbi007/limbi0071111/limbi007111100013/11506992-3d-ilustracion-de-la-chincheta-de-color-naranja-sobre-fondo-blanco-pinang.jpg'></img>" +
            "</span><p> Date: " + response[i].datetime.replace("T", " ") +
            "</p><p> Ticket Status: " + response[i].ticket_status +
            "</p><p> Venue Name: " + response[i].venue.name +
            "</p><p> City: " + response[i].venue.city +
            "</p><p>" + response[i].venue.country +
            "</div>  <div class='action'>" +
            "<a href=''>Buy Tickets</a>" +
            "<a href='#'>Add</a>" +
            "</div></div>"
        );
    }
}

// Get Data Functions
FlowingFreeApp.getDayEvents = function(city, country) {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newDate = year + "-" + "0" + month + "-" + day;
    if (month.length == 3) {
        month.substring(1);
    }
    var url = "http://api.bandsintown.com/events/search.json?location=" + city + "," + country + "&date=" + newDate + ""
    FlowingFreeApp.ajaxRequest(url, FlowingFreeApp.successEvents);
}

FlowingFreeApp.getWeekEvents = function(city, country) {
    var dateObj = new Date();
    var month = "0" + dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var day2 = dateObj.getUTCDate() + 7;
    var year = dateObj.getUTCFullYear();
    if (month.length == 3) {
        month.substring(1);
    }
    newDate = year + "-" + month + "-" + day;
    newDate2 = year + "-" + month + "-" + day2;

    var url = "http://api.bandsintown.com/events/search.json?location=" + city + "," + country + "?date=" + newDate + "," + newDate2 + "";
    FlowingFreeApp.ajaxRequest(url, FlowingFreeApp.successEvents);
}

FlowingFreeApp.getMonthEvents = function(city, country) {

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var month2 = dateObj.getUTCMonth() + 2;

    if (month.length == 3) {
        month.substring(1);
    }

    if (month2.length == 3) {
        month2.substring(1);
    }
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newDate = year + "-" + "0" + month + "-" + day;
    newDate2 = year + "-" + "0" + month2 + "-" + day;
    var url = "http://api.bandsintown.com/events/search.json?location=" + city + "," + country + ""
    FlowingFreeApp.ajaxRequest(url, FlowingFreeApp.successEvents);
}

FlowingFreeApp.getNewsByLocation = function(cityName) {
    var url = "http://rss2json.com/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Fnews%3Fq%3D" + cityName + "%26output%3Drss";
    FlowingFreeApp.ajaxRequest(url, function(response) {
        for (var i = 0; i <= response.items.length - 1; i += 1) {
            $('#news-slider').slick('slickAdd', "<div>" + response.items[i].title + response.items[i].content + "</div>");
        }
    });
}
FlowingFreeApp.getPlacesByPosition = function(lat, lon) {
    var url = "https://api.foursquare.com/v2/venues/explore?client_id=0TZ131LH3NM0J2YHWECKVWJFQNZG5PVUXLAIUH50NSMVKGPX&client_secret=XSFNVIN12KE5GGI0I4SQA0R5CNX5R2OBDKVLL4HUYDWTM4XU&v=20140806&limit=25&ll=" + lat + "," + lon + "";
    FlowingFreeApp.ajaxRequest(url, FlowingFreeApp.successPlaces);
}

FlowingFreeApp.getGigsByLocation = function(city) {
    var url = "http://api.gigatools.com/city.json?cities[]=" + city + "&api_key=66914487d01411a0c5";
    FlowingFreeApp.ajaxRequest(url, FlowingFreeApp.successGigs);
}

FlowingFreeApp.getVenuesByLocation = function(lat, lon) {
    var radius = 80;
    var url = "http://www.skiddle.com/api/v1/venues?api_key=e002aa50b1b37abff3b0439319aef1fc&radius=" + radius + "&latitude=" + lat + "&longitude=" + lon + "";
    FlowingFreeApp.ajaxRequest(url, FlowingFreeApp.successVenue);
}

FlowingFreeApp.getWeather = function(city, country) {
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + country + "&mode=json&APPID=0604af3fdad4b46899dfd6350fedb1c7";
    FlowingFreeApp.ajaxRequest(url, FlowingFreeApp.successWeather);
}
FlowingFreeApp.getImageBackgroundByLocation = function(lat, lon) {
        var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a7300cddabdc7849ba55eb525f2048e3&lat=" + lat + "&lon=" + lon + "&has_geo=true&content_type=1&format=json&nojsoncallback=1";
        FlowingFreeApp.ajaxRequest(url, function(response) {
            var url = "https://farm" + response.photos.photo[99].farm + ".staticflickr.com/" + response.photos.photo[99].server + "/" + response.photos.photo[99].id + "_" + response.photos.photo[99].secret + ".jpg";
            $('#jumbo').css('background-image', 'url(' + url + ')');
        });
    }
    ///////////  location //////////////////
FlowingFreeApp.getLocation = function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(FlowingFreeApp.showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

FlowingFreeApp.showPosition = function(position) {
    lat = (position.coords.latitude);
    lon = (position.coords.longitude);
    FlowingFreeApp.getVenuesByLocation(lat, lon);
    FlowingFreeApp.getPlacesByPosition(lat, lon);
    FlowingFreeApp.getImageBackgroundByLocation(lat, lon);

    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&sensor=false";
    FlowingFreeApp.ajaxRequest(url, function(data) {
        //  country = data['results'][10].address_components[0].short_name
        $.each(data['results'], function(i, val) {
            $.each(val['address_components'], function(i, val) {
                if (val['types'] == "locality,political") {
                    if (val['long_name'] != "") {
                        $('#city').html(val['long_name']);
                        city = val['long_name'];
                        $('.current-city').text(city);
                    } else {
                        $('#city').html("unknown");
                    }
                }
            });
        });
        console.log('Success');
        FlowingFreeApp.getNewsByLocation(city);
        FlowingFreeApp.getGigsByLocation(city);
        FlowingFreeApp.getWeather(city, country);
    });
}

FlowingFreeApp.convertTemperature = function(temperatureF) {
    var temperatureC = (temperatureF - 32) * 5 / 9;
    return Math.round(temperatureC) / 10;
}

FlowingFreeApp.printModalContent = function(modalTitle, mod1, mod2, mod3, mod4, mod5) {
    $("#modalTitle").text(modalTitle);
    $("#mod-1").text(mod1);
    $("#mod-3").text(mod2);
    $("#mod-4").text(mod3);
    $("#mod-5").text(mod4);
    $("#mod-6").text(mod5);

    $('#input1').attr("value", modalTitle);
    $('#input2').attr("value", mod1);
    $('#input3').attr("value", mod2);
    $('#input4').attr("value", mod3);
    $('#input5').attr("value", mod4);
    var modal = new Foundation.Reveal($('#myModal'));
    modal.open();
}
