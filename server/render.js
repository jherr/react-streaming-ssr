import * as React from "react";
import { renderToPipeableStream, renderToString } from "react-dom/server";

import Html from "../src/html";
import App from "../src/App";

const criticalDataFetch = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve("Some really important content"), 250)
  );

const nonCriticalDataFetch = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve("Something non-critical, streamed"), 2000)
  );

export async function streamingRender(res) {
  const criticalData = await criticalDataFetch();
  const dataPromise = nonCriticalDataFetch();

  const stream = renderToPipeableStream(
    <Html criticalData={criticalData} dataPromise={dataPromise}>
      <App criticalData={criticalData} dataAsPromise={dataPromise} />
    </Html>,
    {
      onShellReady() {
        stream.pipe(res);
      },
    }
  );
}

export async function simpleRender(res) {
  const criticalData = await criticalDataFetch();

  // Simulate waiting around for some content that we want to stream instead
  const dataPromise = new Promise((resolve) =>
    setTimeout(() => resolve("Something non-critical, blocked"), 2000)
  );

  dataPromise.then((dataString) => {
    res.send(
      renderToString(
        <Html>
          <App criticalData={criticalData} dataAsString={dataString} />
        </Html>
      )
    );
  });
}
