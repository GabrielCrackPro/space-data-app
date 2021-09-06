const API_URLS = {
 agencies: "https://lldev.thespacedevs.com/2.2.0/agencies/?limit=273",
 astronauts: "https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=400",
 events: "https://lldev.thespacedevs.com/2.2.0/event/?limit=304",
 launches: "https://lldev.thespacedevs.com/2.2.0/launch/?limit=100&is_crewed=false&include_suborbital=true&related=false",
 locations: "https://lldev.thespacedevs.com/2.2.0/location/?limit=43",
 iss: "https://lldev.thespacedevs.com/2.2.0/spacestation/?limit=15",
 updates: "https://lldev.thespacedevs.com/2.2.0/updates/?limit=100"
}

const issDataContainer = document.querySelector('.iss-data-container')

const getData = async (url) => {
let data = await fetch(url).then(response => response.json())
return data.results
}
const formatDate = (date) => {
if(date == null) return 'No date provided'
return new Date(date).toLocaleString().split(' ')[0]
}
window.onload = async () => {
let issData = await getData(API_URLS.iss)
issData.forEach(mission => {
issDataContainer.innerHTML += `
<div class="card mb-3 mt-3">
  <div class="row g-0">
     <div class="col-md-4">
      <img src="${mission.image_url}" class="img-fluid rounded-start" alt="mission-img" height="200" width="250">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title space-color fw-bold">${mission.name}</h5>
	<p class="card-text"><span class="space-color fw-bold">Orbit Date</span> ${formatDate(mission.founded)} <span class="space-color fw-bold"> Deobirt Date</span> ${formatDate(mission.deorbited)} <span class="space-color fw-bold">Orbit</span> ${mission.orbi}</p>
        <p class="card-text"><span class="space-color fw-bold">Owner</span> ${mission.owners[0].name}</p>
	<p class="card-text"><span class="space-color fw-bold">Status</span> ${mission.status.name}</p>
	<p class="card-text"><span class="space-color fw-bold">Type</span> ${mission.type.name}</p>
	<p class="card-text"><span class="space-color fw-bold">Info</span> ${mission.description}</p>
	<a href="${mission.url}" target="blank" class="btn space-bg text-white">More Info <i class="fas fa-external-link-alt"></i></a>
      </div>
    </div>
  </div>
</div>
`
})
console.log(issData[0])
}
