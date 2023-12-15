function start_html_server() {
    const http = require('http');
    const fs = require('fs');

    const hostname = '0.0.0.0';
    const port = 8080;

    const server = http.createServer(function(request, response) {
        response.writeHeader(200, { "Content-Type": "text/html" });
        html = fs.readFileSync('./index.html', 'utf8');
        response.write(html);
        response.end();
    }).listen(port, hostname, () => {
        console.log("Server running at http://web-XXXXXXXXX.docode.YYYY.qwasar.io");
        console.log("Replace XXXXXXXXX by your current workspace ID");
        console.log("(look at the URL of this page and XXXXXXXXX.docode.YYYY.qwasar.io, XXXXXXXXX is your workspace ID and YYYY is your zone)");
    });
}

start_html_server();