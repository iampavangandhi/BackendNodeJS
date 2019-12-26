//Hosting Html files using NodeJS
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const hostname = "127.0.0.1";
const port = "5000";

//Types of supported files
const mimeTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpg"
};

//Creating Server
http
  .createServer((req, res) => {
    let myuri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), unescape(myuri));
    console.log(`Your FileName is ${filename}`);

    var loadFile;

    try {
      loadFile = fs.lstatSync(filename);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 Not Found");
      res.end();
      return;
    }

    if (loadFile.isFile()) {
      var mimeType =
        mimeTypes[
          path
            .extname(filename)
            .split(".")
            .reverse()[0]
        ];
      //console.log(mimeType);
      res.writeHead(200, { "Content-Type": mimeType });
      var filestream = fs.createReadStream(filename);
      filestream.pipe(res);
    } else if (loadFile.isDirectory()) {
      res.writeHead(302, { Location: "index.html" });
      res.end();
    } else {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("500 Internal Error");
      res.end();
    }
  })
  .listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
  });
