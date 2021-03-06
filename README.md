# leaflet-challenge

This assignment provides a new set of tools for the United States Geological Survery (USGS). The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply relevant information about the Earth and its processes. 

This new set of tools for the USGS involves developing a program that will visualize their earthquake data.
This allows a meaningful way to display the massive amount of data they collect around the world each day, which
will help better educate the public and other government organizations on this issue we face.

Leaflet Step 1 :

 - Uses USGS GeoJSON data. 'All earthquakes in the Past 7 days' was the data set that was used. It is updated every minute. A number of other feeds can be used.

 - A map using Leaflet/mapbox was created. It plots all of the earthquakes from the data set based on longitude and latitude coordinates.

 - Two maps were created - a street map and a dark map version (either can be clicked on to view)

 - Earthquake marker pins and magnitude circles are layered over the maps. Again, either/both can be chosen

 - The magnitude circle markers reflect their size proportional to their magnitude, and the colors reflect their depth of the earthqake. Thus, earthquakes with higher magnitude should appear larger and greater depth should appear darker in color. 

 - Popups for both marker pins and magnitude circles provide the magnitude, location, and depth of the earthquake when clicked upon.

 - A legend provides an index for the color range/depth of the earthquake circles/data points.

*** Note: 

    - The use of a "live server" extension or "python -m http.server" needs to be used and hosted 
    on a local host in your web browser.

    - An API key is required from Mapbox for your config.js. Format for config.js - 
    const API_KEY = "your access token". Please note hierarchy for file location - 
    static/js/config.js.



 
