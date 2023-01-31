const http = require("http");
const data = require("./mock_data.json");

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname === "/api" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:4200",
    });

    const { firstResult, maxResults } = parsed?.query ?? {};

    const firstResultNum = Number(firstResult);
    const maxResultsNum = Number(maxResults);

    let response = { studentCount: data.length, students: data };

    /**
     * use firstResult index and number of results
     * per page to allow server side pagination
     */
    if (firstResultNum >= 0 && maxResultsNum >= 0) {
      response = {
        ...response,
        students: data.slice(firstResultNum, firstResultNum + maxResultsNum),
      };
    }

    res.end(JSON.stringify(response));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
