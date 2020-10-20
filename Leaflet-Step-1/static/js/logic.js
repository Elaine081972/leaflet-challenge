// store API inside queryURL
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// perform a GET request to the query URL
d3.json(queryUrl).then(data => {
  console.log(data);
  // once we get a response, send the data.features object to createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // define a function we want to run once for each feature in the features array
  // give each feature a popup describing the magnitude, depth and location of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindpopup("<h3>" + feature.properties.mag + "</h3><hr>" + feature.properties.place + "</p>");
  }

  // create GeoJSON layer containing the features array on the earthquakeData object
  // run the onEachFeature function once for each piece of data in the array
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
  });

  let mags = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: (feature, latlng) => {
      return new L.Circle(latlng, {
        radius: feature.properties.mag*20000,
        fillcolor: "red",
        stroke: false
      });
    }
  });




// Create a map object
let myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
    layers: [streetmap, earthquakes]
  });

// adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
