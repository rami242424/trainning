import { useState } from "react";

interface IType {
  id: number;
  text: string;
  completed: boolean;
}
function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<IType[]>([]);
  const [editingId, SetEditingId] = useState<number|null>(null);
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const addBtn = () => {
    if(!inputValue.trim()) return;
    if(editingId !== null){
      setItems((prev) => prev.map((item) => editingId === item.id ? {...item, text:inputValue} : item));
    } else {
    setItems((prev) => [...prev, {id: Date.now(), text: inputValue, completed: false}]);
    }
    setInputValue("");
    SetEditingId(null);
  }
  const deleteBtn = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  const editBtn = (text: string, id: number) => {
    setInputValue(text);
    SetEditingId(id);
  }
  const toggleChange = (id:number, checked: boolean) => {
    setItems((prev) => prev.map((item) => item.id === id ? {...item, completed: checked} : item));
  }
  return (
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={addBtn}>{editingId !== null ? "SAVE" : "ADD"}</button>
      {items.map((item) => (
        <li key={item.id}>
          <input type="checkbox" onChange={(e) => toggleChange(item.id, e.target.checked)} checked={item.completed}/>
          <span style={{ textDecoration: item.completed ? "line-through" : "none"}}>{item.text}</span>
          <button onClick={() => deleteBtn(item.id)}>Delete</button>
          <button onClick={() => editBtn(item.text, item.id)}>Edit</button>
        </li>
      ))}
    </>
  )
}

export default App;