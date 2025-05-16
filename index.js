var map = L.map('map').setView([52.520, 13.404], 10);
map.locate({setView: true, maxZoom: 16});

//52.520008, and the longitude is 13.404954
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);





L.geoJSON(bezirke, {
}).addTo(map);

function onLocationFound(e) {
    var radius = e.accuracy;

    L.circle(e.latlng, {radius: radius/3, fill: true}).addTo(map)
    L.circle(e.latlng, radius).addTo(map); 
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);