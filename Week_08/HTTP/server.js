const http = require("http");
const html = require("./html.js");
http
  .createServer((request, response) => {
    let body = [];
    request
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        //数据暂存在body数组中
        body.push(chunk.toString());
      })
      .on("end", () => {
        body = body.join("");
        // 写死一个HTTP请求的 response
        response.writeHead(200, { "COntent-Type": "text/html" });
        response.end(html.html);
      });
  })
  .listen(8090);
console.log("server started");
