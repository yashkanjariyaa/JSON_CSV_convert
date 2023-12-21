const fs = require("fs");
const csv = require("csv-parser");

const simulate = () => {
  try {
    let rowIndex = 0;
    let package_count = 0;
    const readFunction = () => {
      const readStream = fs.createReadStream("input.csv");
      let rows = [];
      readStream
        .pipe(csv())
        .on("data", (row) => {
          rows.push(row);
        })
        .on("end", () => {
          if (rowIndex < rows.length) {
            const csvString = Object.values(rows[rowIndex++]).join(",") + "\n";
            fs.appendFile("output.csv", csvString, "utf8", (error) => {
              if (error) {
                console.log(error);
              } else {
                console.log(`${csvString} appended`);
                console.log(`Package Count => ${++package_count}`);
              }
            });
          } else {
            console.log("End of CSV");
            clearInterval(interval);
          }
        });
    };

    const interval = setInterval(readFunction, 1000);
  } catch (error) {
    console.log(error);
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

module.exports = { simulate, jsonToCsv};
