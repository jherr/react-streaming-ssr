import React, { Suspense, use } from "react";

function DataDisplay({ dataAsString, dataAsPromise }) {
  const value = dataAsString ?? use(dataAsPromise);
  return <p>{value}</p>;
}

export default function App(props) {
  return (
    <html>
      <style>{`body { font-family: sans-serif; }`}</style>
      <body>
        <h2>Critical Content</h2>
        <p>Something really important here</p>
        <h2>Non-Critical Content</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <DataDisplay {...props} />
        </Suspense>
      </body>
    </html>
  );
}
