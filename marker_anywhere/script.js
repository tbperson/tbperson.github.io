let platform = new H.service.Platform({
    apikey: 'XK5A-ktpolhuDh2J_f1bHGYKRC8E_AspFlvBbGC08lU'
});
let defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1
    }
);
window.addEventListener('resize', () => map.getViewPort().resize());

let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

let ui = H.ui.UI.createDefault(map, defaultLayers);


let LocationOfMarker = { lat: 19.741755, lng: -155.844437 };

let pngIcon = new H.map.Icon('marker.png', { size: { w: 56, h: 56 } });

let marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });

map.addObject(marker);


map.setCenter(LocationOfMarker)

map.setZoom(10)

function updateMarker() {
    var lat = parseFloat(document.getElementById('lat').value);
    var lng = parseFloat(document.getElementById('lng').value);
    var newLocation = { lat: lat, lng: lng };
    marker.setGeometry(newLocation);
    map.setCenter(newLocation);
    map.setZoom(8);
}
function toggle_site() {
    var x = document.getElementById("search");
    if (x.style.display === "none") {
    x.style.display = "block";
    } else {
    x.style.display = "none";
    }
}
function makeSearchBarDraggable() {
    let searchBar = document.getElementById('search');
    let offsetX, offsetY;

    searchBar.onmousedown = function(event) {
        offsetX = event.clientX - searchBar.getBoundingClientRect().left;
        offsetY = event.clientY - searchBar.getBoundingClientRect().top;
        document.onmousemove = onMouseMove;
        document.onmouseup = onMouseUp;
    };

    function onMouseMove(event) {
        searchBar.style.left = event.clientX - offsetX + 'px';
        searchBar.style.top = event.clientY - offsetY + 'px';
    }

    function onMouseUp() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

makeSearchBarDraggable();