var http = require('http');
var httpProxy = require('http-proxy');

var url = require('url');

var proxy = httpProxy.createProxyServer({});

const port = process.env.PORT || 5050;


var server = http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var url_radio = q.query.name;
    console.log(url_radio)
   if(url_radio != ''|| url_radio != undefined){
    proxy.web(req, res, { target: url_radio});
   }
});

console.log("listening on port "+port )
server.listen(process.env.PORT || 5050);

server.on('error', function (err, req, res) {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error message.');
  });