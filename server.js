"use strict";

const express = require("express");
const { streamingRender, simpleRender } = require("./server/render");

const app = express();
app.get("/", (_req, res) => {
  simpleRender(res);
});
app.use(express.static("build"));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serving at http://localhost:${PORT}/`);
});
