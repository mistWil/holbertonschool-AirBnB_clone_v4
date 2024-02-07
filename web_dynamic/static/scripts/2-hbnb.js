fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(data => {
        const statusApi = document.getElementById('api_status');
        if (data.status === 'OK') {
            statusApi.classList.add('available');
        } else {
            statusApi.classList.remove('available');
        }
    })
    .catch(error =>  {
        console.log(error);
    });

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
