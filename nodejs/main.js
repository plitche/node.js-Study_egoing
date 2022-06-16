var http = require('http');
var fs = require('fs');
var url = require('url'); // require 요구하다
// fs, url : 모듈(node.js가 가지고 있는 비슷한 기능들을 모아놓은 것)

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    console.log(queryData);
    console.log(queryData.id);
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    // console.log(__dirname + url);
    // response.end(fs.readFileSync(__dirname + url));
    response.end(queryData.id);

});
app.listen(3000);
