const fs = require("fs");

const simulate = () => {
  try {
    const inputFilePath = "input.csv";
    const outputFilePath = "output.csv";

    // Read the entire CSV file
    const data = fs.readFileSync(inputFilePath, "utf8");
    const rows = data.trim().split("\n");
    const headers = rows[0]; // Extract headers
    const csvData = rows.slice(1).map((row) => row.split(","));

    fs.writeFile(outputFilePath, headers, { encoding: 'utf8', flag: "a" }, (err) => {
      if(err){
        console.error(err);
      }else{
        console.log("Successfully added headers");
      }
    })

    let currentIndex = 0;

    // Function to write one row of CSV data per second
    function writeRowPerSecond() {
      if (currentIndex < csvData.length) {
        const rowData = csvData[currentIndex].join(",");
        const csvContent = `${rowData}\n`; // Row data without headers, as headers are added separately

        fs.appendFileSync(outputFilePath, csvContent, { encoding: 'utf8' });
        console.log(`Row ${currentIndex + 1} has been written to output.csv`);
        currentIndex++;

        // Continue writing rows until the end
        if (currentIndex < csvData.length) {
          setTimeout(writeRowPerSecond, 1000);
        }
      }
    }

    // Start writing rows after a delay
    setTimeout(writeRowPerSecond, 1000);
  } catch (error) {
    console.error(error);
  }
};

const jsonToCsv = (dataJSON) => {
  try {
    const keys = Object.keys(dataJSON);
    const values = Object.values(dataJSON);
    const maxLength = Math.max(
      ...values.map((arr) => (Array.isArray(arr) ? arr.length : 1))
    );

    let csvContent = keys.join(",") + "\n";

    for (let i = 0; i < maxLength; i++) {
      let row = "";
      for (const value of values) {
        if (Array.isArray(value)) {
          row += (i < value.length ? value[i] : "") + ",";
        } else {
          row += value + ",";
        }
      }
      csvContent += row.replace(/,\s*$/, "") + "\n";
    }
    fs.writeFileSync("input.csv", csvContent, "utf8");
    console.log("CSV generated successfully");
    console.log(csvContent);
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = { simulate, jsonToCsv };
