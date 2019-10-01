// Get state of restFul API
$.ajax({
  url: "http://127.0.0.1:5001/api/v1/status/",
  type: "GET",
  headers: {'Access-Control-Allow-Origin':'*'},
  dataType: "json",
  crossDomain: "true",
  jsonpCallback: 'processJSONPResponse',
  success: function( response ) {
    if (response.status) {
      $(  "#api_status" ).addClass("available");
      console.log( response.status );
    }
  }
});
// Load only when DOM full loaded
document.addEventListener("DOMContentLoaded", function() {
  // Reset checkers
  $('input:checkbox').removeAttr('checked');
  // Manage checkers to State and city search
  let combined = {};
  let states = {};
  let cities = {};

  $('.locations input').change(function () {
    let $input = $(this);

    if ($input.attr('class') === 'check_state') {
      let id_state = $input.attr("data-id");
      let name_state = $input.attr("data-name");
      if ($input.prop( "checked" )) {
        if (!states[id_state]) {
          states[id_state] = name_state.replace(/_/g, " ");
          combined[id_state] = name_state.replace(/_/g, " ");
        }
      } else {
        delete states[id_state];
        delete combined[id_state];
      }
    } else {
      let id_city = $input.attr("data-id");
      let name_city = $input.attr("data-name");
      if ($input.prop( "checked" )) {
        if (!cities[id_city]) {
          cities[id_city] = name_city.replace(/_/g, " ");
          combined[id_city] = name_city.replace(/_/g, " ");
        }
      } else {
        delete cities[id_city];
        delete combined[id_city];
      }
    }
    if (Object.keys(states).length < 1 && Object.keys(cities).length < 1) {
      $( ".locations h4" ).html('&nbsp;');
    } else {
      $( ".locations h4" ).text(Object.values(states));
    }
    console.log(Object.values(combined));
  });
  // Manage checkers to ameneity search
  let amenities = {};

  $('.amenities input').change(function () {
    let $input = $(this);
    let id_amenity = $input.attr("data-id");
    let name_amenity = $input.attr("data-name");
    if ($input.prop( "checked" )) {
      if (!amenities[id_amenity]) {
        amenities[id_amenity] = name_amenity.replace(/_/g, " ");
      }
    } else {
      delete amenities[id_amenity];
    }
    if (Object.keys(amenities).length < 1) {
      $( ".amenities h4" ).html('&nbsp;');
    } else {
      $( ".amenities h4" ).text(Object.values(amenities));
    }
    console.log(Object.values(amenities));
  });
  // Access to restFul API to load places and formating
  $.ajax({
    url: "http://127.0.0.1:5001/api/v1/places_search",
    type: "POST",
    data: "{}",
    headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json'},
    dataType: "json",
    crossDomain: "true",
    jsonpCallback: 'processJSONPResponse',
    success: function( response ) {
      for (i in response) {
        $( "main .places" ).append(
            '<article>'
            + '<div class="title"><h2>'
            + response[i].name +
            '</h2><div class="price_by_night">'
            + response[i].price_by_night +
            '</div></div>'
            + '<div class="information">' +
            '<div class="max_guest">' +
            '<i class="fa fa-users fa-3x" aria-hidden="true"></i><br/>'
            + response[i].max_guest + 'Guests' +
            '</div>'
            +'<div class="number_rooms">'
            +'<i class="fa fa-bed fa-3x" aria-hidden="true"></i><br/>'
            + response[i].number_rooms + 'Bedrooms' +
            '</div>'
            + '<div class="number_bathrooms">' +
            '<i class="fa fa-bath fa-3x" aria-hidden="true"></i><br/>'
            + response[i].number_bathrooms + 'Bathroom' +
            '</div>'
            + '</div>' +
            '<div class="user">' +
            '<strong>Owner:</strong>' +
            '</div>'
            + '<div class="description">'
            + response[i].description +
            '</div>' +
            '</article>');
      }
    }
  });

  // Access to restFul API to load places and formating
  $( 'button' ).click(function() {
    let query = {};
    query["states"] = Object.keys(states);
    query["cities"] = Object.keys(cities);
    query["amenities"] = Object.keys(amenities);
    console.log(JSON.stringify(query));
    $.ajax({
      url: "http://127.0.0.1:5001/api/v1/places_search",
      type: "POST",
      data: JSON.stringify(query),
      headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type':'application/json'},
      dataType: "json",
      crossDomain: "true",
      jsonpCallback: 'processJSONPResponse',
      success: function( response ) {
        console.log(response);
        $( "main .places" ).html('<h1>Places</h1>');
        for (i in response) {
          $( "main .places" ).append(
              '<article>'
              + '<div class="title"><h2>'
              + response[i].name +
              '</h2><div class="price_by_night">'
              + response[i].price_by_night +
              '</div></div>'
              + '<div class="information">' +
              '<div class="max_guest">' +
              '<i class="fa fa-users fa-3x" aria-hidden="true"></i><br/>'
              + response[i].max_guest + 'Guests' +
              '</div>'
              +'<div class="number_rooms">'
              +'<i class="fa fa-bed fa-3x" aria-hidden="true"></i><br/>'
              + response[i].number_rooms + 'Bedrooms' +
              '</div>'
              + '<div class="number_bathrooms">' +
              '<i class="fa fa-bath fa-3x" aria-hidden="true"></i><br/>'
              + response[i].number_bathrooms + 'Bathroom' +
              '</div>'
              + '</div>' +
              '<div class="user">' +
              '<strong>Owner:</strong>' +
              '</div>'
              + '<div class="description">'
              + response[i].description +
              '</div>' +
              '</article>');
        }
      }
    });
  });
});
