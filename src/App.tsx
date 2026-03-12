import { useState } from "react";

function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const inputChange = (e) => {
    setInputValue(e.target.value);
  }
  const addBtnClick = () => {
    if(inputValue.trim()) return;
    setItems((prev) => [...prev, inputValue]);
    setInputValue("");
  }
  const deleteBtn = (index) => {
    setItems(items.filter((item, i) => i !== index));
  }
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={addBtnClick}>Add</button>
      {items.map((item, index) => (
        <li key={index}>
          {item}
          <button onClick={() => deleteBtn(index)}>✖️</button>
        </li>
        ))}
    </>
  );
}

export default App;