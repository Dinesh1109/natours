
//DOM elements
const mapBox = document.getElementById('map');


//Delegation
if(mapBox){
  
  const locations = JSON.parse(mapBox.dataset.locations);
  console.log(locations);
    
  mapboxgl.accessToken =
  'pk.eyJ1IjoiZGluZXNoMTEiLCJhIjoiY2xrYXJldHNxMGFlYjNmbzRuZm5rbXlvaCJ9.Zbc9FeAdSO0ss5Po5X-3Iw';

  const map = new mapboxgl.Map({
  container: 'map', // container ID
  scrollZoom: false,
  style: 'mapbox://styles/dinesh11/clkatzjpj00p001qj7wgmc73d', // style URL
  center: [-118.113491, 34.111745], // starting position [lng, lat]
  zoom: 9, // starting zoom
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
  //Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  //Add the marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //Add popup
  new mapboxgl.Popup({
    offset:30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p> Day ${loc.day} : ${loc.description}</p>`)
    .addTo(map);

  //Extend the map boundsto include current location
  bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
  });

}
  
