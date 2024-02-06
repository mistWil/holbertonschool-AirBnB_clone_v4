$(document).ready(function () {
  let amenitiesChecked = {};

  $('input[type=checkbox]').change(function () {
    let amenityID = $(this).closest('li').data('id');
    let amenityName = $(this).closest('li').data('name');

    if ($(this).is(':checked')) {
      amenitiesChecked[amenityID] = amenityName;
    } else {
      delete amenitiesChecked[amenityID];
    }

    updateAmenitiesList();
  });

  function updateAmenitiesList() {
    let h4Tag = $('div.amenities h4');
    const amenList = Object.values(amenitiesChecked).join(', ');
    h4Tag.text(amenList);
  }
});
