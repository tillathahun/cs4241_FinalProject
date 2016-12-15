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
    case '/style.css':
      sendFile(res, 'style.css', 'text/css')
      break
    case '/index.js':
      sendFile(res, 'index.js', 'text/javascript')
      break
    case '/worldNuclearInventory':
      // Get content from file
      sendJSON(res, './public/data/worldNuclearInventory.json');
      break
    case '/nuclearTests':
      // Get content from file
      sendJSON(res, './public/data/nuclearTests.json');
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

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html';

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}
