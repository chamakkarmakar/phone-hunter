document.getElementById('error-message').style.display = 'none';

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    document.getElementById('error-message').style.display = 'none';

    // clear data
    searchField.value = '';
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').innerText = 'Please Write Something to search Phone';
    }
    else {
        // load data 
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)))
            .catch(error => displayError(error));
    }

}
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-message').innerText = 'Something went wrong. Please Try again later';
}


const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (phones.length == 0) {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').innerText = 'No Result Found';
    }
    phones.forEach(phone => {
        // console.log(phone)

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 w-75 ">
                <img src="${phone.image}" class="card-img-top img-fluid mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name} </h5>
                    <span class="card-text">${phone.brand}</span>
                    <p class="card-text"><button onclick="loadPhoneDetail('${phone.slug}')" class="bg-primary text-white p-2 rounded-2 border-0">Phone Details</button></p>
                </div>
            </div>
            `;
        searchResult.appendChild(div);
    })


}

const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));

}
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
            <p>${phone.releaseDate?phone.releaseDate:'No release Date'}</p>

            <p>
                <h5>MainFeatures:</h5>
                    <strong>Storage:</strong> ${phoneFeatures.storage}
                    <strong>Display Size:</strong> ${phoneFeatures.displaySize}
                    <strong>ChipSet:</strong> ${phoneFeatures.chipSet}
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
                <h5>Others</h5>:
            <strong>Bluetooth:</strong> ${phone.others.Bluetooth?phone.others?.Bluetooth : ''}
            <strong>GPS:</strong> ${phone.others.GPS?phone.others?.GPS:''}
            <strong>NFC:</strong> ${phone.others.NFC?phone.others?.NFC:''}
            <strong>Radio:</strong> ${phone.others.Radio?phone.others?.Radio:''}
            <strong>USB:</strong> ${phone.others.USB?phone.others?.USB:''}
            <strong>WLAN:</strong> ${phone.others.WLAN?phone.others?.WLAN:''}
            </p>
        </div>
    `;
   
}