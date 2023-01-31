const http = require("http");
const data = require("./mock_data.json");

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname === "/api" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:4200",
    });

    const {
      firstResult = 0,
      maxResults = 10,
      sort = "asc",
      sortBy = "first_name",
    } = parsed?.query ?? {};

    const firstResultNum = Number(firstResult);
    const maxResultsNum = Number(maxResults);

    //use default sort method (timSort algorithm in V8 Engine)
    let sortedData = data.sort((a, b) => {
      const ascending = a[sortBy] > b[sortBy] ? 1 : -1;
      return sort === "asc" ? ascending : ascending * -1;
    });

    let response = { studentCount: sortedData.length, students: sortedData };

    /**
     * use firstResult index and number of results
     * per page to allow server side pagination
     */
    if (firstResultNum >= 0 && maxResultsNum >= 0) {
      response = {
        ...response,
        students: sortedData.slice(
          firstResultNum,
          firstResultNum + maxResultsNum
        ),
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
