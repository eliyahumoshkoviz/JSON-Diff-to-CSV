import express from 'express';
import { createCSV } from './service.js';

const app = express(),
  port = process.env.PORT || 3000;
app.listen(port, () => console.log(`#### Server running on port ${port} ####`));

app.get("/", async (req, res) => {
  try {
    res.attachment("json-diff.csv");
    const csvContent = createCSV("original.json", "updated.json");
    res.send(csvContent);
  } catch (err) {
    res.status(400).send(err.messgae || err);
  }
});
