import { useState } from "react";

function App(){
  const inputChange = (e) => {
    console.log(e.target.value)
  }
  return (
    <>
      <input onChange={inputChange}/>
      <button>Add</button>
    </>
  );
}

export default App;