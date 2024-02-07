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
function updateAmenitiesListAndFetch() {
    const amenitiesList = Object.keys(amenitiesChecked);

    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amenities: amenitiesList,
        })
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(place => {
            const placedesc = place.description.replace(/Owner:.*?\n/, '');

            const article = document.createElement('article');
            article.innerHTML = `
                <h2>${place.name}</h2>
                <p>${placedesc}</p>
            `
            placeSection.appendChild(article);
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mySubmit(theForm) {
    theForm = $(theForm).closest("form");
    $.ajax({
        data: $(theForm).serialize(),
        type: $(theForm).attr('POST'),
    });
}

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

    $('#searchButton').click(function () {
        updateAmenitiesList();

        updateAmenitiesListAndFetch();
    });
  });
