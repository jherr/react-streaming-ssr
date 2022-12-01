import * as React from "react";
import { Suspense, use, useState } from "react";

function DataDisplay({ dataAsString, dataAsPromise }) {
  let value = dataAsString;
  if (!value && dataAsPromise) {
    value = use(dataAsPromise);
  }
  return <p>{value}</p>;
}

function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <button onClick={() => setCounter(counter + 1)}>Count is {counter}</button>
  );
}

export default function App(props) {
  return (
    <>
      <h2>Critical Content</h2>
      <p>Critical Data: {props.criticalData}</p>
      <h2>Non-Critical Content</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <DataDisplay {...props} />
      </Suspense>
      <Counter />
    </>
  );
}
