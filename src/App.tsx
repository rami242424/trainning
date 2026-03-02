import { useState } from "react";

function App(){
  const inputChange = (e) => {
    console.log(e.target.value)
  }
  const addClick = () => {
    //누르면 저장 > 리스트로 만들어지고
    //인풋은 리셋되어야함
  }
  return (
    <>
      <input onChange={inputChange}/>
      <button onClick={addClick}>Add</button>
    </>
  );
}

export default App;