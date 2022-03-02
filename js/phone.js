document.getElementById('error-message').style.display = 'none';

// Search Phone
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    document.getElementById('error-message').style.display = 'none';

    // clear data
    searchField.value = '';
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').innerText = 'Please Write Something to search Product';
    }

    else {
        // load data 
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.data))
            .catch(error => displayError(error));
    }

}
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-message').innerText = 'Something went wrong. Please Try again later';
}

// Display Search Result 
const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (phones.length === 0) {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').innerText = 'No Result Found';
    }
    else {
        const limitedItem = phones.slice(0, 20);
        limitedItem.forEach(phone => {
            // console.log(phone)
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 w-75 shadow-lg bg-body rounded p-2">
                <img src="${phone.image}" class="card-img-top img-fluid h-75 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <span class="card-text">${phone.brand}</span>
                    <p class="card-text"><button onclick="loadPhoneDetail('${phone.slug}')" class="bg-primary text-white p-2 rounded-2 border-0">Phone Details</button></p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
}
// Load Phone Details 
const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));

}
// Display Phone Details 
const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const phoneFeatures = phone.mainFeatures;
    phoneDetails.innerHTML = `
        <div class="col-md-6 w-25">
            <img src="${phone.image}" alt="">
        </div>
        <div class="col-md-6 w-75">
            <h5>${phone.name}</h5>
            <h5>${phone.brand}</h5>
            <p>${phone.releaseDate ? phone.releaseDate : 'No release Date found'}</p>

            <p>
                <h5>MainFeatures:</h5>
                    <strong>Storage:</strong> ${phoneFeatures.storage} <br>
                    <strong>Display Size:</strong> ${phoneFeatures.displaySize} <br>
                    <strong>ChipSet:</strong> ${phoneFeatures.chipSet} <br>
                    <strong>Memory:</strong> ${phoneFeatures.memory}
            </p>

            <p>
                <h5>Sensors:</h5>
                    <ul>
                        <li>${phoneFeatures.sensors[0]}</li>
                        <li>${phoneFeatures.sensors[1]}</li>
                        <li>${phoneFeatures.sensors[2]}</li>
                        <li>${phoneFeatures.sensors[3]}</li>
                        <li>${phoneFeatures.sensors[4]}</li>
                        <li>${phoneFeatures.sensors[5]}</li>
                    </ul>
            </p>

            <p>
                <h5>Others:</h5>
            <strong>Bluetooth:</strong> ${phone.others ? phone.others.Bluetooth : 'No'} <br>
            <strong>GPS:</strong> ${phone.others ? phone.others.GPS : 'No'} <br>
            <strong>NFC:</strong> ${phone.others ? phone.others.NFC : 'No'} <br>
            <strong>Radio:</strong> ${phone.others ? phone.others.Radio : 'No'} <br>
            <strong>USB:</strong> ${phone.others ? phone.others.USB : 'No'} <br>
            <strong>WLAN:</strong> ${phone.others ? phone.others.WLAN : 'No'} 
            </p>
        </div>
    `;

}