var http = require('http');
var fs = require('fs');
var url = require('url'); // require 요구하다
var qs = require('querystring');
var template = require('./lib/template/js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
// fs, url : 모듈(node.js가 가지고 있는 비슷한 기능들을 모아놓은 것)

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

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
          var list = template.list(filelist);
          var html = template.html(title, list,
            `<h2>${title}</h2><p>${description}</p>`
          , `<a href="/create">create</a>`);
          response.writeHead(200);
          response.end(html);
        })
      } else {
        fs.readdir('./data', function(error, filelist) {
          var filteredId = path.parse(queryData.id).base;
          fs.readFile('data/${filteredId}', 'utf-8', function(err, description) {
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
              allowedTags: ['h1']
            });
            var list = template.list(filelist);
            var html = template.html(sanitizedTitle, list,
              `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`
              , `<a href="/create">create</a>
              <a href="/update?id=${sanitizedTitle}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
              </form>`
            );
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    } else if (pathname === '/create') {
      fs.readdir('./data', function(error, filelist) {
        var title = 'WEB - create';
        var list = template.list(filelist);
        var html = template.html(title, list, `
          <form method="post" action="/create_process">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `, '');
        response.writeHead(200);
        response.end(html);
      })
    } else if (pathname === '/create_process') {
      var body = '';
      request.on('data', function(data) {
        body = body + data;
      });
      request.on('end', function() {
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
          fs.writeFile(`data/${title}`, description, 'utf-8', function(err) {
            response.writeHead(302, {location: `/?id=${title}`});
            response.end();
          })
      });

    } else if(pathname === '/update') {
      fs.readdir('./data', function(error, filelist) {
        var filteredId = path.parse(queryData.id).base;
        fs.readFile('data/${filteredId}', 'utf-8', function(err, description) {
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.html(title, list,
            `
            <form method="post" action="/update_process">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `
            , `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if(pathname === '/update_process') {
      var body = '';
      request.on('data', function(data) {
        body = body + data;
      });
      request.on('end', function() {
          var post = qs.parse(body);
          var id = post.id;
          var title = post.title;
          var description = post.description;
          fs.rename(`data/${id}`, `data/${title}`, function(error) {
            fs.writeFile(`data/${title}`, description, 'utf-8', function(err) {
              response.writeHead(302, {location: `/?id=${title}`});
              response.end();
            })
          });
      });

    } else if(pathname === '/delete_process') {
      var body = '';
      request.on('data', function(data) {
        body = body + data;
      });
      request.on('end', function() {
          var post = qs.parse(body);
          var id = post.id;
          var filteredId = path.parse(id).base;
          fs.unlink(`data/${filteredId}`, function(error) {
            response.writeHead(302, {location: `/`});
            response.end();
          })
      });

    } else {
      response.writeHead(404);
      response.end('Not found');
    }

});
app.listen(3000);
