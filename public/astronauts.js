const API_URLS = {
 agencies: "https://lldev.thespacedevs.com/2.2.0/agencies/?limit=273",
 astronauts: "https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=400",
 events: "https://lldev.thespacedevs.com/2.2.0/event/?limit=304",
 launches: "https://lldev.thespacedevs.com/2.2.0/launch/?limit=100&is_crewed=false&include_suborbital=true&related=false",
 locations: "https://lldev.thespacedevs.com/2.2.0/location/?limit=43",
 iss: "https://lldev.thespacedevs.com/2.2.0/spacestation/?limit=15",
 updates: "https://lldev.thespacedevs.com/2.2.0/updates/?limit=100"
}

const astronautsContainer = document.querySelector('.astronauts-container')

const getData = async (url) => {
let data = await fetch(url).then(response => response.json())
return data.results
}
const formatDate = (date) => {
if(date == null) return 'No date provided'
return new Date(date).toLocaleString().split(' ')[0]
}

window.onload = async () => {
let astronauts = await getData(API_URLS.astronauts)
astronauts.forEach(astronaut => {
astronautsContainer.innerHTML += `
<div class="card mb-3 mt-3">
  <div class="row g-0">
  <div class="col-md-4">
      <img src="${astronaut.profile_image}" height="100%" width="100%" class="img-fluid rounded-start" alt="profile-img">
   </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title space-color fw-bold">${astronaut.name} - ${astronaut.status.name}</h5>
	<h5 class="card-subtitle space-color fw-bold">${astronaut.agency.name} - ${astronaut.agency.abbrev}</h5>
	<p class="card-text"><span class="space-color fw-bold">Nationality</span> ${astronaut.nationality}</p>	
	<p class="card-text"><span class="space-color fw-bold">Birth</span> ${formatDate(astronaut.date_of_birth)} <span class="space-color fw-bold">Death</span> ${formatDate(astronaut.date_of_death)}</p>
        <p class="card-text"><span class="space-color fw-bold">First flight</span> ${formatDate(astronaut.first_flight)} <span class="space-color fw-bold">Last flight</span> ${formatDate(astronaut.last_flight)}</p>
        <p class="card-text"><span class="space-color fw-bold">Bio</span> ${astronaut.bio}</p>
	<div class="btn-group">
	 <a href="${astronaut.url}" target="blank" class="btn space-bg text-white me-2">More Info <i class="fas fa-external-link-alt"></i></a>
	 <a href="${astronaut.wiki}" target="blank" class="btn space-bg text-white">Wikipedia <i class="fab fa-wikipedia-w"></i></a>
	</div>
      </div>
    </div>
  </div>
</div>
`
})
console.log(astronauts[0])	
}
