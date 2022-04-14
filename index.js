var http = require('http');
var httpProxy = require('http-proxy');

var url = require('url');

var proxy = httpProxy.createProxyServer({});

const port = process.env.PORT || 5050;


var server = http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var url_radio = q.query.name;
    console.log(url_radio)
   if(url_radio == undefined || url_radio === ''){

    res.writeHead(500, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'proxy_error', 
      reason: "url tidak boleh kosong"         
  }));
   }else{
     
    proxy.web(req, res, {
      target: url_radio
    }, function(e) {
        console.log(e.message);
        if (!res.headersSent) {
            res.writeHead(500, { 'content-type': 'application/json' });
        }
        res.end(JSON.stringify({ error: 'proxy_error', 
              reason: e.message         
        }));
    });
     
   }
});




console.log("listening on port "+port )
server.listen(process.env.PORT || 5050);

