const { simulate, jsonToCsv, read } = require("./controller");
const yargs = require("yargs");
const fs = require("fs");
yargs.version("charizard.9.0.1");

yargs.command({
  command: "convert",
  describe: "Convert JSON to CSV",
  handler: function () {
    const dataBuffer = fs.readFileSync("data.json");
    const dataString = dataBuffer.toString();
    const dataJSON = JSON.parse(dataString);
    jsonToCsv(dataJSON);
    console.log("Successfully converted from json to csv");
  },
});

yargs.command({
  command: "start",
  describe: "Start CSV parsing",
  handler: function () {
    simulate("data.jsony");
  },
});

yargs.parse();
