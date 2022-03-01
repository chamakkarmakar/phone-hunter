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
            console.log(phone)
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="loadPhoneDetail(${phone.slug})" class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand} <span>${phone.phone_name}</span> </h5>
                    <p class="card-text">Phones Details</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
    })
}