var http  = require('http')
  , fs    = require('fs')
  , url   = require('url')
  // Load jsdom, and create a window.
  , jsdom = require("jsdom").jsdom
  , doc   = jsdom()
  , window = doc.defaultView
  // Load jQuery with the simulated jsdom window.
  , $ = require('jQuery')(window)
  , port  = 8080;

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'public/index.html')
      break
    case '/index.html':
      sendFile(res, 'public/index.html')
      break
    case '/css/style.css':
      sendFile(res, 'css/style.css', 'text/css')
      break
    case '/d3-geomap/css/d3.geomap.css':
      sendFile(res, 'd3-geomap/d3.geomap.css', 'text/css')
      break
    case '/d3-geomap/js/d3.geomap.js':
      sendFile(res, 'd3-geomap/js/d3.geomap.js', 'application/javascript')
      break
    case '/d3-geomap/js/d3.geomap.min.js':
      sendFile(res, 'd3-geomap/js/d3.geomap.min.js', 'application/javascript')
      break
    case '/js/script.js':
      sendFile(res, 'js/script.js', 'application/javascript')
      break
    case '/data/worldNuclearInventory.json':
      // Get content from file
      console.log("Oh shit waddup!");
      var contents = $.getJSON( "/public/data/worldNuclearInventory.json");
      // Define to JSON type
      //var jsonContent = JSON.parse(contents);
      res.end(JSON.stringify(contents));
      break
    case '/d3-geomap/topojson/world/countries.json':
      sendFile(res, 'd3-geomap/topojson/world/countries.json', 'application/json')
      break
    case '/d3-geomap/vendor/d3.geomap.dependencies.min.js':
      sendFile(res, 'd3-geomap/vendor/d3.geomap.dependencies.min.js', 'application/javascript')
      break
    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

// subroutines

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html';

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}
