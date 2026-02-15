import { useState } from "react";

function App(){
  const [count, setCount] = useState(0);
  const onIncrease = () => {
    setCount((prev) => prev + 1);
  }
  const oDecresase = () => {
    setCount((prev) => prev - 1);
  }
  const onReset = () => {
    setCount(0);
  }
  return (
    <>
      <h1>Plus Minus Reset</h1>
      <h2>{count}</h2>
      <button onClick={onIncrease}>Plus</button>
      <button onClick={oDecresase}>Minus</button>
      <button onClick={onReset}>Reset</button>
    </>
  );
}

export default App;