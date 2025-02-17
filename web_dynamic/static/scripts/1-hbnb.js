document.addEventListener("DOMContentLoaded", function() {
  let amenities = {};

  $('input').change(function () {
    let $input = $(this);
    let id_amenity = $input.attr("data-id");
    let name_amenity = $input.attr("data-name");
    console.log(name_amenity);
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
  })
});
