var http = require('http');
var http_client = require('http');

const PORT = 8080;
var str = '';
// TODO places API: https://developers.google.com/places/web-service/

//TODO pebble watch might require a different http response header
function writeResponse(response, var1, var2, str) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end(JSON.parse(str)["results"][0]["formatted_address"] + '\n\nIt works, vars : ' + var1 + ' , ' + var2 + '\n\n');
}
/// e.g
///GET /map?var1=37.76893497&var2=-122.42284884 HTTP/1.0
///GET /map?var1=40.689649&var2=-73.979958 HTTP/1.0
///GET /map?var1=41.805699&var2=123.431472 HTTP/1.0
function handleRequest(request, response) {
	var url = require('url');
	//console.log(url.parse(request.url, true));
	var var1 = url.parse(request.url, true).query['var1'];
	var var2 = url.parse(request.url, true).query['var2'];
	//api to call to get street address from google api using lon-lat
	//telnet maps.googleapis.com 80
	//GET /maps/api/geocode/json?latlng=37.76893497,-122.42284884 HTTP/1.0
	var options = {
		host: 'maps.googleapis.com',
		path: '/maps/api/geocode/json?latlng='+var1+','+var2
	};
	str='';
	callback = function(response2) {
		//another chunk of data has been recieved, so append it to `str`
		response2.on('data', function (chunk) {
			str += chunk;
		});
		//the whole response has been recieved
		response2.on('end', function () {
			writeResponse(response, var1, var2, str);
			//console.log(str);
		});
	}
	http_client.request(options, callback).end();
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
	//call back function
	console.log("Server listening on %s", PORT);
});
