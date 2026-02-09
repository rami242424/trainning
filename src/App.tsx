import { useState } from "react";

function App(){
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Plus Minus Reset</h1>
      <h2>{count}</h2>
    </>
  );
}

export default App;