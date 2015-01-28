var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
  //writeable stream
  var newFile = fs.createWriteStream('readme_copy.md');
  //store the length of stream from headers
  var fileBytes = request.headers['content-length'];
  var uploadedBytes = 0;
  
  //helper method from node for streaming
  request.pipe(newFile);
  
  //listening to data event
  request.on('data', function(chunk) {
    uploadedBytes += chunk.length;
    var progress = (uploadedBytes / fileBytes) * 100;
    response.write("progress: " + parseInt(progress, 10) + "%\n");
  });
  //listening to end event
  request.on('end', function() {
  //close the response  
  response.end('uploaded!');
  });
}).listen(8083);
