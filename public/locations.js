const API_URLS = {
 agencies: "https://lldev.thespacedevs.com/2.2.0/agencies/?limit=273",
 astronauts: "https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=400",
 events: "https://lldev.thespacedevs.com/2.2.0/event/?limit=304",
 launches: "https://lldev.thespacedevs.com/2.2.0/launch/?limit=100&is_crewed=false&include_suborbital=true&related=false",
 locations: "https://lldev.thespacedevs.com/2.2.0/location/?limit=43",
 iss: "https://lldev.thespacedevs.com/2.2.0/spacestation/?limit=15",
 updates: "https://lldev.thespacedevs.com/2.2.0/updates/?limit=100"
}

const locationsContainer = document.querySelector('.locations-container')

const getData = async (url) => {
let data = await fetch(url).then(response => response.json())
return data.results
}
const formatDate = (date) => {
if(date == null) return 'No date provided'
return new Date(date).toLocaleString().split(' ')[0]
}
window.onload = async () => {
let locations = await getData(API_URLS.locations)
locations.forEach(location => {
locationsContainer.innerHTML += `
<div class="card mb-3 mt-3">
  <div class="row g-0">
    <div class="col-md-12">
      <div class="card-body">
        <h5 class="card-title space-color fw-bold">${location.name}</h5>
        <p class="card-text"><span class="space-color fw-bold">Country</span> ${location.country_code}</p>
        <p class="card-text"><span class="space-color fw-bold">Launches</span> ${location.total_launch_count}</p>
        <p class="card-text"><span class="space-color fw-bold">Landings</span> ${location.total_landing_count}</p>
	<a href="${location.map_image}" target="blank" class="btn space-bg text-white">Map Image <i class="fas fa-map-marked-alt"></i></a>
	<a href="${location.url}" target="blank" class="btn space-bg text-white">More Info <i class="fas fa-external-link-alt"></i></a>
      </div>
    </div>
  </div>
</div>
`
})
}
