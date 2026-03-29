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
    setItems((prev) => [...prev, {id: Date.now(), text: inputValue, completed: false}]);
    setInputValue("");
  }
  const deleteBtn = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  const editBtn = (item: IType) => {
    setItems((prev) => prev.map((item) => editingId === item.id ? {...item, text:inputValue} : item));
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