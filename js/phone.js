document.getElementById('error-message').style.display = 'none';

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').innerText = 'Please Write Something to search Phone';
    }
    else {
        // load data 
        const url = ` https://openapi.programming-herooo.com/api/phones?search=${searchText}`;
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
    // console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent='';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-50 h-75" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phone.name}</h5>
        <p class="card-text">${phone.brand}</p>
        <p class="card-text">${phone.releaseDate}</p>
    </div>
    `;
    phoneDetails.appendChild(div);
}