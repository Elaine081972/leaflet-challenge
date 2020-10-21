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
  // give each feature a popup describing the magnitude, location and depth of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<hr>Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2] + "</hr>");
  }
  
  // create GeoJSON layer containing the features array on the earthquakeData object
  
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
  });
  //  create function for different colors depending on earthquake depth (greater the depth to appear darker in color)
  function getColor(d) {
    return d > 90 ? '#800026' :
           d > 70 ? '#BD0026' :
           d > 50 ? '#E31A1C' :
           d > 30 ? '#FC4E2A' :
           d > 10 ? '#FD8D3C' :
                    '#FEB24C' ;
  }
  // run the onEachFeature function once for each piece of data in the array
  let mags = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: (feature, latlng) => {
      return new L.Circle(latlng, {
        radius: feature.properties.mag*30000,
        color: "white",
        fillColor: getColor(feature.geometry.coordinates[2]),
        stroke: false,
        fillOpacity: 0.7
      });
    }
  });
  // sending our earthquakes layer to the createMap function
  createMap(earthquakes, mags);
}

function createMap(earthquakes, mags) {

  let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  let darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });
   // define a baseMaps object to hold our base layers
   let baseMaps = {
     "Street Map": streetmap,
     "Dark Map": darkmap
   };

   // Create overlay object to hold our overlay layer
   let overlayMaps = {
    Earthquakes: earthquakes,
    Magnitudes: mags
  };

// Create a map, giving it the streetmap and earthquakes layers to display on load
let myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
    layers: [darkmap, mags]
  });

// Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
