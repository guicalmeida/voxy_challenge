const http = require("http");

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname === "/api" && req.method === "GET") {
    res.end("hello world");
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
