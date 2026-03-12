import { useState } from "react";

interface ItemType {
  id: number;
  text: string;
}
function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<ItemType[]>([]);
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const addBtnClick = () => {
    if(!inputValue.trim()) return;
    // setItems((prev) => [...prev, inputValue]);
    setItems((prev) => [...prev, {id: Date.now(), text: inputValue}]);
    setInputValue("");
  }
  const deleteBtn = (id:number) => {
    setItems(items.filter((item) => item.id !== id));
  }
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={addBtnClick}>Add</button>
      {items.map((item) => (
        <li key={item.id}>
          {item.text}
          <button onClick={() => deleteBtn(item.id)}>✖️</button>
        </li>
        ))}
    </>
  );
}

export default App;