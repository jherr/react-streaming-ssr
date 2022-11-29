import React from "react";
import { useState, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";

import App from "./App";

const dataPromise = new Promise((resolve) => {
  window.setData = (data) => resolve(data);
});

hydrateRoot(
  document.getElementById("app"),
  <App dataAsPromise={dataPromise} />
);
