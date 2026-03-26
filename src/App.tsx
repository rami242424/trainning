import { useState } from "react";

interface IType {
  id:number;
  text:string;
  completed:boolean;
}
function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<IType[]>([]);
  const [editingId, setEditingId] = useState<number|null>(null);
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const addBtn = () => {
    if(!inputValue.trim()) return;
    if(editingId !== null){
      setItems((item) => item.map((item) => editingId === item.id ? {...item, text:inputValue} : item));
    } else {
      setItems((item) => [...item, {id:Date.now(), text:inputValue, completed:false}]);
    }
    setInputValue("");
    setEditingId(null);
  }
  const deleteBtn = (id:number) => {
    setItems((item) => item.filter((item) => item.id !== id) );
  }
  const editBtn = (item:IType) => {
    setInputValue(item.text);
    setEditingId(item.id);
  }
  const toggleInput = (id: number) => {
    setItems((item) => item.map((item) => id === item.id ? {...item, completed: !item.completed} : item));
  }
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={addBtn}>{editingId !== null ? "SAVE" : "ADD"}</button>
      {items.map((item) => 
        <li key={item.id}>
          <input type="checkbox" onClick={() => toggleInput(item.id)} checked={item.completed}/>
          <span style={{ textDecoration: item.completed == true ? "line-through" : "none" }}>{item.text}</span>
          <button onClick={()=>deleteBtn(item.id)}>delete</button>
          <button onClick={()=>editBtn(item)}>edit</button>
        </li>
      )}
    </>
  );
}

export default App;