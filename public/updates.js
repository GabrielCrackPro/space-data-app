const API_URLS = {
 agencies: "https://lldev.thespacedevs.com/2.2.0/agencies/?limit=273",
 astronauts: "https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=400",
 events: "https://lldev.thespacedevs.com/2.2.0/event/?limit=304",
 launches: "https://lldev.thespacedevs.com/2.2.0/launch/?limit=100&is_crewed=false&include_suborbital=true&related=false",
 locations: "https://lldev.thespacedevs.com/2.2.0/location/?limit=43",
 iss: "https://lldev.thespacedevs.com/2.2.0/spacestation/?limit=15",
 updates: "https://lldev.thespacedevs.com/2.2.0/updates/?limit=100"
}

const updatesContainer = document.querySelector('.updates-container')

const getData = async (url) => {
let data = await fetch(url).then(response => response.json())
return data.results
}
const formatDate = (date) => {
if(date == null) return 'No date provided'
return new Date(date).toLocaleString()
}
window.onload = async () => {
let updates = await getData(API_URLS.updates)
updates.forEach(update => {
updatesContainer.innerHTML += `
<div class="card mb-3 mt-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${update.profile_image}" class="img-fluid rounded-start" alt="profile-img" height="150" width="auto">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title space-color fw-bold">${update.created_by}</h5>
        <p class="card-text"><span class="space-color fw-bold">Message</span> ${update.comment}</p>
	<p class="card-text"><span class="space-color fw-bold">Post Date</span> ${formatDate(update.created_on)}</p>
        <a href="${update.info_url}" target="blank" class="btn space-bg text-white">Source <i class="fas fa-external-link-alt"></i></a>
      </div>
    </div>
  </div>
</div>
`
})
}
