var map = L.map('map').setView([52.520, 13.404], 10);
map.locate({ setView: true, maxZoom: 15 });

//52.520008, and the longitude is 13.404954
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);





L.geoJSON(bezirke, {
}).addTo(map);

L.Control.Button = L.Control.extend({
    onAdd: function(map) {
        var button = L.DomUtil.create('a', "centerButton leaflet-bar leaflet-control");
        

        button.src = '../../docs/images/logo.png';
        

        return button;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.control.button = function(opts) {
    return new L.Control.Button(opts);
}

L.control.button({ position: 'topleft' }).addTo(map);

function setupLocation(e) {
    var circles = onLocationFound(e);

    setInterval(function () {
        console.log("getting new location")
        circles.forEach((cir) => {
            console.log();
            cir.redraw()
        })
    }, 10000)

}


function onLocationFound(e) {
    //console.log(e.latlng);
    var radius = e.accuracy;

    var outer = L.circle(e.latlng, { radius: radius, stroke: false, fillOpacity: 0.4 }).addTo(map);
    var inner = L.circle(e.latlng, { radius: radius / 3, fill: true, fillOpacity: 1, fillColor: "#3388ff", color: "white" }).addTo(map)
    return [inner, outer]
}



map.on('locationfound', setupLocation);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);