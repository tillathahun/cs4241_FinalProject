var http  = require('http')
  , fs    = require('fs')
  , url   = require('url')
  , path = require('path')
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
    case '/worldNuclearInventory':
      // Get content from file
      sendJSON(res, './public/data/worldNuclearInventory.json');
      break
    case '/nuclearTests':
      // Get content from file
      sendJSON(res, './public/data/nuclearTests.json');
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

function sendJSON(res, filename) {
  res.writeHead(200, {'Content-type': 'application/json'})

  var stream = fs.createReadStream(filename)

  stream.on('data', function(data) {
    res.write(data);
  })

  stream.on('end', function(data) {
    res.end();
    return;
  })
}

function sendFile(res, filename) {
  res.writeHead(200, {'Content-type': 'text/html'})

  var stream = fs.createReadStream(filename)

  stream.on('data', function(data) {
    res.write(data);
  })

  stream.on('end', function(data) {
    res.end();
    return;
  })
}
