
async function windowAction() {
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
    const request = await fetch(endpoint);
    const arrayName = request.json()
    console.table(arrayName)

  
    function findMatches(wordToMatch, arrayName) {
      return arrayName.filter(place => {
          const regex = new RegExp(wordToMatch, 'gi');
          return place.zip.match(regex) || place.category.match(regex) || place.name.match(regex)
      });
    }
  
    function displayMatches(event) {

      const matchArray = findMatches(event.target.value, arrayName);
      const html = matchArray.map(place => {
          const regex = new RegExp(event.target.value, 'gi');
          const Name = place.name.replace(regex, `<span class="h1">${event.target.value}</span>`);
          const Category = place.category.replace(regex, `<span class="h1">${event.target.value}</span>`);
          const Address = place.address_line_1.replace(regex, `<span class="h1">${event.target.value}</span>`);
          const City = place.city.replace(regex, `<span class="h1">${event.target.value}</span>`);
          const Zip = place.zip.replace(regex, `<span class="h1">${event.target.value}</span>`);
          return `
              <li>
              <span class = "name">${Name}</span>
              <span class = "category">${Category}</span>
              <span class = "address">${(Address).italics()}</span>
              <span class = "city">${(City).italics()}</span>
              <span class = "zip">${(Zip).italics()}</span>
              </li>
          
          `;
      }).join('');
      suggestions.innerHTML = html.toUpperCase();
    }
  
    const userInputs = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
  
  
    userInputs.addEventListener('keyup', (event) => {
      event.preventDefault()
      displayMatches(event)
   })
    searchInput.addEventListener('change', displayMatches);
  }
  window.onload = windowAction;