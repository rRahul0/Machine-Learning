const baseUrl = `http://127.0.0.1:5000`

function getBathValue() {
    const uiBathrooms = document.getElementsByName("uiBathrooms");
    for (let i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) return parseInt(i) + 1;
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    const uiBHK = document.getElementsByName("uiBHK");
    for (let i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) return parseInt(i) + 1;
    }
    return -1; // Invalid Value
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    const sqft = document.getElementById("uiSqft").value;
    const bhk = getBHKValue();
    const bathrooms = getBathValue();
    const location = document.getElementById("uiLocations").value;
    const estPrice = document.getElementById("uiEstimatedPrice");

    const url = `${baseUrl}/api/predict_price`

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sqft: (sqft),
            bhk: bhk,
            bath: bathrooms,
            location: location
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.estimated_price);
            estPrice.innerHTML = `<h2>${data.estimated_price.toString()} Lakh</h2>`;
        })
        .catch(error => console.error('Error:', error));
}


function onPageLoad() {
    console.log("document loaded");
    const url = `${baseUrl}/api/locations`; // Use this if you are using nginx. i.e tutorial 8 and onwards
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("got response for get_location_names request");
            if (data) {
                const locations = data.locations;
                const uiLocations = document.getElementById("uiLocations");
                uiLocations.innerHTML = ""; // Clear existing options

                locations.forEach(location => {
                    let opt = document.createElement("option");
                    opt.value = location;
                    opt.innerHTML = location;
                    uiLocations.appendChild(opt);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

window.onload = onPageLoad;