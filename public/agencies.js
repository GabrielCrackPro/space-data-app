const API_URLS = {
 agencies: "https://lldev.thespacedevs.com/2.2.0/agencies/?limit=273",
 astronauts: "https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=400",
 events: "https://lldev.thespacedevs.com/2.2.0/event/?limit=304",
 launches: "https://lldev.thespacedevs.com/2.2.0/launch/?limit=100&is_crewed=false&include_suborbital=true&related=false",
 locations: "https://lldev.thespacedevs.com/2.2.0/location/?limit=43",
 iss: "https://lldev.thespacedevs.com/2.2.0/spacestation/?limit=15",
 updates: "https://lldev.thespacedevs.com/2.2.0/updates/?limit=100"
}

const agenciesContainer = document.querySelector('.agencies-container')

const getData = async (url) => {
let data = await fetch(url).then(response => response.json())
return data.results
}

window.onload = async () => {
let agencies = await getData(API_URLS.agencies)
agencies.forEach(agency => {

if(agency.type == null) agency.type = 'No provided'
if(agency.description == null) agency.description = 'No provided'
if(agency.founding_year == null) agency.founding_year = 'No provided'
if(agency.spacecraft == '') agency.spacecraft = 'None'

agenciesContainer.innerHTML += `
<div class="card mb-3 mt-3">
  <div class="row g-0">
    <div class="col-md-12">
      <div class="card-body">
        <h4 class="card-title fw-bold space-color">${agency.name} - ${agency.abbrev}</h4>
	<h6 class="card-text"><span class="fw-bold space-color">Type</span> ${agency.type}</h6>
	<h6 class="card-text"><span class="fw-bold space-color">Spacecraft</span> ${agency.spacecraft}</h6>
	<h6 class="card-text"><span class="fw-bold space-color">Country</span> ${agency.country_code}</h6>
	<h6 class="card-text"><span class="fw-bold space-color">Year</span> ${agency.founding_year}</h6>
        <p class="card-text"><span class="fw-bold space-color">Description</span> ${agency.description}</p>
	<a href="${agency.url}" target="blank" class="btn space-bg text-white">More Info <i class="fas fa-external-link-alt"></i></a>
      </div>
    </div>
  </div>
</div>
`
})
}
