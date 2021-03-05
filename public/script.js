async function windowAction() {
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const data = await fetch(endpoint);
    const arrayName = await data.json()
  
    function findMatches(wordToMatch, restaurants) {
      return restaurants.filter(place => {
          const regex = new RegExp(wordToMatch, 'gi');
          return place.zip.match(regex) || place.category.match(regex) || place.name.match(regex)
      });
    }
  
    function displayMatches(event) {
      const matchArray = findMatches(event.target.value, restaurants);
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
  
    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
  
  
    searchInput.addEventListener('keyup',  (evt) => { displayMatches(evt) });
    searchInput.addEventListener('change', displayMatches);
  }
  window.onload = windowAction;