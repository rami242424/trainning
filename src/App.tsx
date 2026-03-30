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
  const editBtn = (item: IType) => {
    setInputValue(item.text);
    SetEditingId(item.id);
  }
  return (
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={addBtn}>Add</button>
      {items.map((item) => (
        <li key={item.id}>
          {item.text}
          <button onClick={() => deleteBtn(item.id)}>Delete</button>
          <button onClick={() => editBtn(item)}>Edit</button>
        </li>
      ))}
    </>
  )
}

export default App;