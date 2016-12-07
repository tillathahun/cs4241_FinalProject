var map = d3.geomap()
    .geofile('../topojson/world/countries.json');

d3.select('#map')
    .call(map.draw, map);