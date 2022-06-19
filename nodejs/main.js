var http = require('http');
var fs = require('fs');
var url = require('url'); // require 요구하다
// fs, url : 모듈(node.js가 가지고 있는 비슷한 기능들을 모아놓은 것)

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, ture).pathname;

    //console.log(url.parse(_url, true).pathname);

    // console.log(queryData);
    // console.log(queryData.id);

    // console.log(__dirname + url);
    // response.end(fs.readFileSync(__dirname + url));

    if (pathname === '/') {
      if (queryData.id === undefined) {

        fs.readdir('./data', function(error, filelist) {
          var title = 'Welcome';
          var description = 'Hello, Node.js';

          var list = '<ul>';
          var i = 0;
          while(i < filelist.length) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i++;
          }
          list = list + '</ul>';

          var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
          `;
          response.writeHead(200);
          response.end(template);
        })
      } else {
        fs.readdir('./data', function(error, filelist) {
          var title = 'Welcome';
          var description = 'Hello, Node.js';

          var list = '<ul>';
          var i = 0;
          while(i < filelist.length) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i++;
          }
          list = list + '</ul>';

          fs.readFile('data/${queryData.id}', 'utf-8', function(err, description) {
            var title = queryData.id;
            var template = `
              <!doctype html>
              <html>
              <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
              </head>
              <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <p>${description}</p>
              </body>
              </html>
            `;
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    } else {
      response.writeHead(404);
      response.end('Not found');
    }

});
app.listen(3000);
