const owospeak = require("owospeak");
const http = require("http");

const server = http.createServer((req, res) => {
  const message = decodeURIComponent(req.url.slice(1));
  const converted = owospeak.convert(message);
  res.end(converted);
  console.log(`Converted '${message}' to '${converted}'`);
});
server.listen(53621);
