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

    $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
        $('SECTION.places').append(data.map(place => {
        return `<article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guests</div>
                        <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                    </article>`;
        }));
    }
    });
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
