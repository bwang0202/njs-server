var http = require('http');

const PORT = 8080;
/// e.g
///GET /map?var1=123.123&var2=123.234 HTTP/1.1
///Host: 127.0.0.1
function handleRequest(request, response) {
	var url = require('url');
	console.log(url.parse(request.url, true));
	var var1 = url.parse(request.url, true).query['var1'];
	var var2 = url.parse(request.url, true).query['var2'];
	//TODO: api to call to get location?

	// TODO: better header?
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('It works, vars : ' + var1 + ' , ' + var2);
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
	//call back function
	console.log("Server listening on %s", PORT);
});
