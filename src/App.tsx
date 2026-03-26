import { useState } from "react";

interface IType{
  id: number;
  text: string;
  completed: boolean;
}
function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<IType[]>([]);
  const [editingId , setEditingId] = useState<number|null>(null);
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const addBtn = () => {
    if(!inputValue.trim()) return;
    // 수정중
    if(editingId !==null){
      // setItems((prev) => prev.map((item) => editingId === item.id ? [...item, {text:inputValue}]: item));
      setItems((item) => item.map((item) => item.id === editingId ? {...item, text:inputValue} : item));
    } else {
      setItems((prev) => [...prev, {id:Date.now(), text:inputValue, completed:false}]);
    }
    setInputValue("");
  }
  const deleteBtn = (id:number) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  const editBtn = (item:IType) => {
    setInputValue(item.text);
    setEditingId(item.id);
  }
  const toggleInput = (id:number) => {
    setItems((prev) => prev.map((item) => item.id === id ? {...item, completed:!item.completed} : item));
  }
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={addBtn}>Add</button>
      {items.map((item) => 
      <li key={item.id}>
        <input type="checkbox" onChange={() => toggleInput(item.id)} checked={item.completed}/>
        {item.text}
        <button onClick={() => deleteBtn(item.id)}>delete</button>
        <button onClick={() => editBtn(item)}>edit</button>
      </li>
      )}
    </>
  );
}

export default App;