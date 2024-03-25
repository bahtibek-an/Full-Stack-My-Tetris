// var http = require('http');
// var fs = require('fs');
// var path = require('path');

// const hostname = 'localhost';
// const port = 8080;

// http.createServer(function (request, response) {
//     console.log('request starting...');

//     var filePath = '.' + request.url;
//     if (filePath == './')
//         filePath = '../index.html';
//         var extname = path.extname(filePath);
//         var contentType = 'text/html';
//         switch (extname) {
//             case '.js':
//                 contentType = 'text/javascript';
//                 break;
//             case '.css':
//                 contentType = 'text/css';
//                 break;
//     }

//     fs.readFile(filePath, function(error, content) {
//         if (error) {
//             if(error.code == 'ENOENT'){
//                 fs.readFile('./404.html', function(error, content) {
//                     response.writeHead(200, { 'Content-Type': contentType });
//                     response.end(content, 'utf-8');
//                 });
//             }
//             else {
//                 response.writeHead(500);
//                 response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
//                 response.end();
//             }
//         }
//         else {
//             response.writeHead(200, { 'Content-Type': contentType });
//             response.end(content, 'utf-8');
//         }
//     });

// }).listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}`);
//     console.log("Replace XXXXXXXXX by your current workspace ID");
//     console.log("(look at the URL of this page and XXXXXXXXX.docode.YYYY.qwasar.io, XXXXXXXXX is your workspace ID and YYYY is your zone)");
// });




const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 8080;

http.createServer((request, response) => {
    console.log('Request for', request.url);

    let filePath = '.' + request.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                response.writeHead(404);
                response.end('404 Not Found');
            } else {
                response.writeHead(500);
                response.end('Internal Server Error');
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
