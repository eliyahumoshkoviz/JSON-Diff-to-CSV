const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

const service = require("./service");
const server = app.listen(port, () =>
  console.log(`#### Server running on port ${port} ####`)
);

app.get("/", async (req, res) => {
  try {
    res.attachment("obj.csv");
    const csvContent = service.createCSV("original.json", "updated.json");
    res.send(csvContent);
  } catch (err) {
    console.log(err);

    res.status(400).send(err.messgae || err);
  }
});
