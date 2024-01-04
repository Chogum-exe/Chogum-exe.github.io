import http from "node:http";
import fs from "node:fs"

const server = http.createServer((req, res) => {
    switch (req.url) {
        case "/": req.url = "/index.html";
        case "/index.html":
            res.writeHead(200, {'Content-Type': 'text/html'});
            break;
        default:
            res.writeHead(200, {'Content-Type': 'text/javascript'});
    }
    console.log(req.url);
    fs.readFile("."+req.url, 'utf8', (err, file) => {
        if (err) res.statusCode = 404;
        else res.end(file);
    });
});

server.listen(8080, "localhost")