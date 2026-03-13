import { useState } from "react";

interface ItemType {
  id: number;
  text: string;
}
function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<ItemType[]>([]);
  const inputChange = (e) => {
    setInputValue(e.target.value);
  }
  const addBtnClick = () => {
    if(!inputValue.trim()) return;
    // setItems((prev) => [...prev, inputValue]);
    setItems((prev) => [...prev, {id: Date.now(), text: inputValue}]);
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