var autocomplete;
var place;
var placeLat;
var placeLng;
var trails;
var weatherArray = [];
var currentTrailWeather;
alert("hello from trails js")
function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode'],
      componentRestrictions: {'country': 'us'}
      });
};

function getCoordinates() {
  // Get the place details from the autocomplete object.
  place = autocomplete.getPlace();
  placeLat = place.geometry.location.lat();
  placeLng = place.geometry.location.lng();
};

$("#inputForm").on("submit", function getTrails(e) {
  e.preventDefault();
  $(".bg").animate({opacity: 0}, 750);
  weatherArray = [];
  if (autocomplete.getPlace()) {
    getCoordinates();
    var hikingAPIKey = "200583144-74f526f47bf91dadd7add272542d8019";
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + placeLat + "&lon=" + placeLng + "&maxDistance=30&maxResults=5&key=" + hikingAPIKey
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(trailsRetrieved) {
      console.log(trailsRetrieved);
      trails = trailsRetrieved.trails;
      console.log(trails);
      getWeather(trails);
    });
  }
});

function getWeather(trails) {
  var weatherAPIKey = "bef3bd0c3ea4da917953e027b5dc2d91";
  for (var i = 0; i < trails.length; i++) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + trails[i].latitude + "&lon=" + trails[i].longitude + "&units=imperial&appid=" + weatherAPIKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(currentTrailWeatherResult) {  
      console.log(currentTrailWeatherResult);
      weatherArray.push(currentTrailWeatherResult);
      console.log(weatherArray);
      renderTrails();
    });
  }
  initAutocomplete();
};

function renderTrails() {
  if(weatherArray.length === trails.length) {
    $("#trails").empty();
    for (var i = 0; i < trails.length; i++) {
        var difficultyDesc;
        var difficultyImage;
        console.log(trails[i].difficulty);
        switch (trails[i].difficulty) {
            case "green": 
                difficultyDesc = " Easy: walking with no obstacles and low grades";
                difficultyImage = "assets/images/green.svg";
                break;
            case "greenBlue":
                difficultyDesc = " Easy/Intermediate: few obstacles, less than 10% grade";
                difficultyImage = "assets/images/greenBlue.svg";
                break;
            case "blue":
                difficultyDesc = " Intermediate: 10% grade, small rocks and roots, easy scrambling";
                difficultyImage = "assets/images/blue.svg";
                break;
            case "blueBlack":
                difficultyDesc = " Intermediate/Difficult: 12% grade, medium-sized obstacles with some scrambling";
                difficultyImage = "assets/images/blueBlack.svg";
                break;
            case "black":
                difficultyDesc = " Difficult: 15% grade, large obstacles, possible scrambling or climbing";
                difficultyImage = "assets/images/black.svg";
                break;
            case "dblack":
                difficultyDesc = " Extremely Difficult: 20% grade, 15+ inch obstacles, many harder sections";
                difficultyImage = "assets/images/dblack.svg";
                break;
        };
        var newRow =  "<div class='trail-wrapper'>" +
        
        "<div class='heading-wrapper'>" +
            "<div class='trail-name-wrapper'>" +
                "<h2>" + trails[i].name + "</h2>" +
            "</div>" +
            "<div class='button-wrapper'>" +
                "<a class='btn btn-light' href=" + trails[i].url + "role='button' target='_blank'>" + "Learn More" + "</a>" +
            "</div>" +
        "</div>" +

        "<div class='information-wrapper'>" +
            "<div class='image-wrapper'>" +
            "<img src=" + trails[i].imgSqSmall + ">" +
            "</div>" +
            "<div class='trail-info-wrapper'>" +
                "<div>" +
                    "<div class='summary'>" +
                        "<p>" + trails[i].summary +
                        "</p>" + 
                    "</div>" +
                    "<hr>" +
                    "<div class='skill-level'>" +
                    "<img src='" + difficultyImage + "' class='difficultyImage'>" + difficultyDesc + "." +
                    "<hr>" + "Distance: " + trails[i].length + " miles" +
                "</div>" +
            "</div>" +
              "</div>" +  
              "<div class='weather-wrapper'>" +
                "<div class='temp-wrapper'>" +
                    "<div class='temp-value-wrapper'>" + Math.round(weatherArray[i].main.temp) + "&#176" +
                "</div>" +
                "<div class='icon-wrapper'>" +
                "<img src='http://openweathermap.org/img/w/" + weatherArray[i].weather[0].icon + ".png'>" +
                "</div>" +
                "<div class='wind-wrapper'>" +
                    "<div class='cloud-icon-wrapper'>" +
                        "<img src='assets/images/wind.png' alt=''>" +
                    "</div>" +
                    "<div class='wind-data-wrapper'>" +
                        "<p>" + Math.round(weatherArray[i].wind.speed) +" mph" + "</p>" +
                    "</div>" +
                "</div>" +    
                    "<div class='conditions-wrapper'>" +
                        "<p>" + "Current conditions: " + "<br>" + weatherArray[i].weather[0].main + "." + "</p>" +
                    "</div>" +
                "</div>";
     $("#trails").append(newRow);
    }
  }
}