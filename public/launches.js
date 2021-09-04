const API_URLS = {
 agencies: "https://lldev.thespacedevs.com/2.2.0/agencies/?limit=273",
 astronauts: "https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=400",
 events: "https://lldev.thespacedevs.com/2.2.0/event/?limit=304",
 launches: "https://lldev.thespacedevs.com/2.2.0/launch/?limit=100&is_crewed=false&include_suborbital=true&related=false",
 locations: "https://lldev.thespacedevs.com/2.2.0/location/?limit=43",
 iss: "https://lldev.thespacedevs.com/2.2.0/spacestation/?limit=15",
 updates: "https://lldev.thespacedevs.com/2.2.0/updates/?limit=100"
}

const launchesContainer = document.querySelector('.launches-container')

const getData = async (url) => {
let data = await fetch(url).then(response => response.json())
return data.results
}
const formatDate = (date) => {
if(date == null) return 'No date provided'
return new Date(date).toLocaleString().split(' ')[0]
}
const formatTime = (time) => {
return new Date(time).toLocaleString()
}
window.onload = async () => {
let launches = await getData(API_URLS.launches)
launches.forEach(launch => {
if(launch.status.name == 'Launch Successful'){
launch.status.description = 'No Failure'
}
launchesContainer.innerHTML += `
<div class="card mb-3 mt-3">
  <div class="row g-0">
    <div class="col-md-12">
      <div class="card-body">
        <h5 class="card-title space-color fw-bold">${launch.name}</h5>
	<p class="card-text"><span class="space-color fw-bold">Status</span> ${launch.status.name} <span class="space-color fw-bold">Fail Reason</span> ${launch.status.description}</p>
        <p class="card-text"><span class="space-color fw-bold">Launched At</span> ${formatTime(launch.window_start)} <span class="space-color fw-bold">Launched By</span> ${launch.launch_service_provider.name} <span class="space-color fw-bold">Launch Pad</span> ${launch.pad.name}</p>
	<p class="card-text"><span class="space-color fw-bold">Type</span> ${launch.mission.type} <span class="space-color fw-bold">Orbit</span> ${launch.mission.orbit.name}</p>
	<p class="card-text"><span class="space-color fw-bold">Mission</span> ${launch.mission.description}</p>
	<p class="card-text"><span class="space-color fw-bold">Updated At</span> ${formatTime(launch.last_updated)}</p>
	<div class="btn-group">
	 <a href="https://www.google.com/maps/place/${launch.pad.latitude}+${launch.pad.longitude}" target="blank" class="btn space-bg text-white me-2">Launch Pad Location <i class="fas fa-map-marker"></i></a>
	 <a href="" target="blank" class="btn space-bg text-white">More Info <i class="fas fa-external-link-alt"></i></a>
	</div>
      </div>
    </div>
  </div>
</div>
`
})
}
