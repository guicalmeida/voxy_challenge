const http = require("http");
const data = require("./mock_data.json");

/**
 * creates array of arrays where index 0 is the
 * object id and index 1 its serialized info
 */
const searchableDataSet = data.map((info) => {
  const finalArr = [];
  const allValues = Object.values(info);

  // push object ID and remove it from values
  finalArr.push(allValues.shift());

  // combine all info into a single low-case, spaceless string
  const reduced = allValues.reduce(
    (acc, currVal) => `${acc}${currVal.toString()?.toLowerCase()?.trim()}`,
    ""
  );
  finalArr.push(reduced);

  return finalArr;
});

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
      searchTerm,
    } = parsed?.query ?? {};

    const firstResultNum = Number(firstResult);
    const maxResultsNum = Number(maxResults);

    //use default sort method (timSort algorithm in V8 Engine)
    let sortedData = data.sort((a, b) => {
      const ascending = a[sortBy] > b[sortBy] ? 1 : -1;
      return sort === "asc" ? ascending : ascending * -1;
    });

    /**
     * Queries the searchable dataset for the user search string,
     * saving matched IDs in array for further data filtering
     */
    if (typeof searchTerm === "string" && searchTerm !== "") {
      const filteredDataIds = [];

      searchableDataSet.forEach((val) => {
        const cleanTerm = searchTerm.trim().toLowerCase();
        if (val[1].includes(cleanTerm)) {
          filteredDataIds.push(val[0]);
        }
      });

      sortedData = sortedData.filter((val) => filteredDataIds.includes(val.id));
    }

    /**
     * use firstResult index and number of results
     * per page to allow server side pagination
     */
    const response = {
      studentCount: sortedData.length,
      students: sortedData.slice(
        firstResultNum,
        firstResultNum + maxResultsNum
      ),
    };

    res.end(JSON.stringify(response));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
