import * as React from "react";
import { Suspense, use, useState } from "react";

function DataDisplay({ dataAsString, dataAsPromise }) {
  let value = dataAsString;
  if (!value && dataAsPromise) {
    value = use(dataAsPromise);
  }
  return <p>{value}</p>;
}

export default function App(props) {
  const counter = useState(0);
  return (
    <>
      <h2>Critical Content</h2>
      <p>Something really important here</p>
      <h2>Non-Critical Content</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <DataDisplay {...props} />
      </Suspense>
      <button onClick={() => counter[1](counter[0] + 1)}>{counter[0]}</button>
    </>
  );
}
