import { useState } from "react";

interface Itype {
  id: number;
  text: string;
}

function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<Itype[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)  
  }
  const addClick = () => {
    if(!inputValue.trim()) return;
    if(editingId !== null) {
      setItems((prev) => (
        //prev.map((item) => editingId === item.id ? {id: item.id, text: inputValue} : item)
        prev.map((item) => editingId === item.id ? {...item, text: inputValue} : item)
      ));
      setEditingId(null);

    } else {
      setItems((prev) => [...prev, {id: Date.now(), text: inputValue}]);
    }
    setInputValue("");  
  }
  const deleteBtn = (id:number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  const editBtn = (item:Itype) => {
    setEditingId(item.id)
    setInputValue(item.text)
  }
  return(
    <>
      <input onChange={inputChange} value={inputValue}/>
      <button onClick={addClick}>{editingId !== null ? "SAVE" : "ADD"}</button>
      {items.map((item) => (
        <li key={item.id}>
          {item.text}
          <button onClick = {() => deleteBtn(item.id)}>delete</button>
          <button onClick = {() => editBtn(item)}>edit</button>
        </li>
      ))}
    </>
  );
}

export default App;