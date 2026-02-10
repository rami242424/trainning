import { useState } from "react";

function App(){
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Plus Minus Reset</h1>
      <h2>{count}</h2>
      <button>Plus</button>
      <button>Minus</button>
      <button>Reset</button>
    </>
  );
}

export default App;