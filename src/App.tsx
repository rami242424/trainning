import { useState } from "react";

function App(){
  const [count, setCount] = useState(0);
  const onIncrease = () => {
    if(count >= 10){return count}
    else setCount((prev) => prev + 1);
  }
  const onDecresase = () => {
    if(count <= 0){return count}
    else setCount((prev) => prev - 1);
  }
  const onReset = () => {
    setCount(0);
  }
  return (
    <>
      <h1>Plus Minus Reset</h1>
      <h2>{count}</h2>
      {count === 10 ? <><button disabled>Plus</button><span>Max</span></> : <button onClick={onIncrease}>Plus</button>}
      {count === 0 ? <button disabled>Minus</button> : <button onClick={onDecresase}>Minus</button>}
      <button onClick={onReset}>Reset</button>
    </>
  );
}

export default App;