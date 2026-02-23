import { useState } from "react";

function App(){
  const [count, setCount] = useState(0);
  const onIncrease = () => {
    setCount((prev) => prev + 1);
  }
  const onDecresase = () => {
    setCount((prev) => prev - 1);
  }
  const onReset = () => {
    setCount(0);
  }
  return (
    <>
      <h1>Plus Minus Reset</h1>
      <h2>{count}</h2>
      <button onClick={onIncrease} disabled={count >= 10}>Plus</button>
      <button onClick={onDecresase} disabled={count <= 0}>Minus</button>
      <button onClick={onReset}>Reset</button>
    </>
  );
}

export default App;