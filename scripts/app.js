console.log("working");

let map = L.map("map", { zoomControl: false });
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const ip = document.getElementById("ip");
const loc = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const input = document.getElementById("form-input")
const form = document.getElementById("form")
const loadingScreen = document.querySelector('.loading-screen')


form.onsubmit = (e) => {
  e.preventDefault()
  loadingScreen.style.display = "inline"
  removeMarker()
  viewData(input.value)
}


const fetchApi = async (query) => {
  const url = `https://ipapi.co/${query}/json/`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

const viewData = async (query) => {
  const data = await fetchApi(query)
  const center = [data.latitude, data.longitude]

  input.value = data.ip

  ip.innerHTML = data.ip;
  loc.innerHTML = `${data.city}, ${data.region}`
  timezone.innerHTML = data.timezone
  isp.innerHTML = `${data.postal}, ${data.country}`
  loadingScreen.style.display = "none"
  map.setView(center, 10)
  addMarker(center)
  

//Testing purposes

  //console.log(data.lat)
  //console.log(data.lon)
  //console.log(data)
}

const addMarker = (center) => {
  const marker = L.marker(center)
  marker.addTo(map)
}

const removeMarker = () => {
  const marker = document.querySelector('.leaflet-marker-icon')

  if(marker){
    marker.remove()
    document.querySelector('.leaflet-marker-shadow').remove()
  }
}


viewData("")