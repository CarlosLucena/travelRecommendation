function search() {
  const searchText = document.getElementById('searchText').value.toLowerCase();
  if (!searchText.trim()) return;

  removeSearchResults()
  const resultDiv = document.getElementById('searchResults');
  resultDiv.setAttribute("class", "resultDiv")

  resultHeader = document.createElement("h1")
  resultHeader.textContent = "Results"
  resultDiv.appendChild(resultHeader)

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      const allCities = data.countries.flatMap(country => country.cities);
      const filterCities = allCities.filter(city => city.description.toLowerCase().includes(searchText));

      filterCities.forEach(city => {
        resultItemDiv = document.createElement("div")
        resultItemDiv.setAttribute("class", "resultItem")

        table = document.createElement("table")

        imageTr = document.createElement("tr")
        imageTd = document.createElement("td")
        imageTd.innerHTML=`<img src="./images/${city.imageUrl}">`
        imageTr.appendChild(imageTd)
        table.appendChild(imageTr)

        cityTr = document.createElement("tr")
        cityTd = document.createElement("td")
        cityTd.appendChild(document.createTextNode(city.name))
        cityTr.appendChild(cityTd)
        table.appendChild(cityTr)

        descTr = document.createElement("tr")
        descTd = document.createElement("td")
        descTd.appendChild(document.createTextNode(city.description))
        descTr.appendChild(descTd)
        table.appendChild(descTr)

        resultItemDiv.appendChild(table)
        resultDiv.appendChild(resultItemDiv)
      })
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    })
}

function reset() {
    const searchText = document.getElementById('searchText');
    searchText.value=''

    removeSearchResults()
}

function removeSearchResults() {
    const resultDiv = document.getElementById('searchResults');
    while(resultDiv.firstChild) {
      resultDiv.removeChild(resultDiv.lastChild)
    }
}
