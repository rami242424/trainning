import { useState } from "react";

function App(){
  const [inputValue, setInputValue] = useState("");
  //add시 저장될공간
  const [items, setItems] = useState([]);

  const inputChange = (e) => {
    //console.log(inputValue, "inputvalue1")
    setInputValue(e.target.value)
    //console.log(inputValue, "inputvalue2")
  }
  const addClick = () => {
    //누르면 저장 > 리스트로 만들어지고
    //setItems(...items, inputValue);
    //더 안전한 방법
    setItems((prev) => [...prev, inputValue]);
    //인풋은 리셋되어야함
    setInputValue("");
  }
  return (
    <>
      <input onChange={inputChange}/>
      <button onClick={addClick}>Add</button>
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </>
  );
}

export default App;