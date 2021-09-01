const API_URLS = {
 agencies: "https://lldev.thespacedevs.com/2.2.0/agencies/?limit=273",
 astronauts: "https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=400",
 events: "https://lldev.thespacedevs.com/2.2.0/event/?limit=304",
 launches: "https://lldev.thespacedevs.com/2.2.0/launch/?limit=100&is_crewed=false&include_suborbital=true&related=false",
 locations: "https://lldev.thespacedevs.com/2.2.0/location/?limit=43",
 iss: "https://lldev.thespacedevs.com/2.2.0/spacestation/?limit=15",
 updates: "https://lldev.thespacedevs.com/2.2.0/updates/?limit=100"
}

const eventsContainer = document.querySelector('.events-container')

const getData = async (url) => {
let data = await fetch(url).then(response => response.json())
return data.results
}
const formatDate = (date) => {
if(date == null) return 'No date provided'
return new Date(date).toLocaleString().split(' ')[0]
}

window.onload = async () => {
let events = await getData(API_URLS.events)
events.forEach(event => {
eventsContainer.innerHTML += `
<div class="card mb-3 mt-3">
  <div class="row g-0">
    <div class="col-md-12">
      <div class="card-body">
        <h5 class="card-title fw-bold space-color">${event.name}</h5>
	<p class="card-text"><span class="space-color fw-bold">Date</span> ${formatDate(event.date)}</p>
	<p class="card-text"><span class="space-color fw-bold">Location</span> ${event.location}</p>
	<p class="card-text"><span class="space-color fw-bold">Type</span> ${event.type.name}</p>
        <p class="card-text"><span class="space-color fw-bold">Description</span> ${event.description}</p>
	<div class="btn-group">
         <a href="${event.url}" target="blank" class="btn space-bg text-white me-2">More Info <i class="fas fa-external-link-alt"></i></a>
	 <a href="${event.news_url}" target="blank" class="btn space-bg text-white me-2">News <i class="far fa-newspaper"></i></a>
	 <a href="${event.video_url}" target="blank" class="btn space-bg text-white">Video <i class="fab fa-youtube"></i></a>
	</div>
      </div>
    </div>
  </div>
</div>
`
})
}
