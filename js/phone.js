const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.data))
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = ''
    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 w-75 ">
                <img src="${phone.image}" class="card-img-top img-fluid mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand} <span>${phone.phone_name}</span> </h5>
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
        .then(data => console.log(data));
    
}