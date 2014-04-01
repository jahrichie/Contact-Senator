$(function() {  
  //   USER CLICKS ON A BUTTON we send addy
  $( ".get-geolocation" ).click(function() {
    var address  =  $("#address-lookup").val()
        fetchLatLong(address)
  });

  // take addy and turn into lat long
  function fetchLatLong(address) {
    var _url = "http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=true";
    $.getJSON( _url, function( data ) {
      afterResponse(data)
    });
  }

  // do stuff with gep location response
  function afterResponse(data) {
    var lat = data.results[0].geometry.location.lat,
        lng = data.results[0].geometry.location.lng;
    fetchSenator(lat,lng)
  }

  // do stuff with gep location response
  function fetchSenator(lat,lng) {
    $.ajax({
        url: "http://openstates.org/api/v1/legislators/geo/?lat="+lat+"&long="+lng+"&apikey=YOUR_API_KEY&chamber=upper",
        jsonp: "callback",
        dataType: "jsonp",
        // work with the response filter out lower chamber
        success: function( response ) {
          // we only want upper senators, reject lower
          var arr  = response;
            for (var i = arr.length; i--;) {
                if (arr[i].chamber === 'lower') {
                    arr.splice(i, 1);
                }
            };
            // console.log(JSON.stringify(arr));

            senateData = response;
            populateSenateResults(senateData) 
        }
    });
  }

  //416 e7rd st new york, ny
  function populateSenateResults(senateData) {
    var hbData = {senators : senateData}
    var source   = $("#show-senators").html();
    var template = Handlebars.compile(source);
    $("#content-placeholder").html(template(hbData));
    initCsClicks(senateData)
  }// populate the data with handlebars


  function initCsClicks(senateData) {
    
    $( ".ask-for-number-modal" ).click(function() {  
      // console.log(senateData)
      // console.log(senateData[0].offices[0])

      var fullName = $(this).data("full-name"),
          number = prompt("Please enter your number and we'll connect you to your senator "+fullName+" .","222 222 2222");
      if (number !=null && number != "222 222 2222" ) {
        console.log("good: ", senateData )
       
        var senator    =  senateData[0].full_name,
            senPhone   =  senateData[0].offices[1].phone,
            _url       =  "/make_calls?senator="+senator+"&senPhone="+senPhone+"&userPhone="+number
        window.location.href = _url

      }  else {
        console.log("bad")
    
      }
    });

  }// clicks for hbars code

});// ready