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
  return(
    <>
      <input value={inputValue}/>
      <button onClick={addBtn}>Add</button>
      {items.map((item) => 
        <li key={item.id}>
          {item.text}
          <button onClick={()=>deleteBtn(item.id)}>delete</button>
          <button onClick={()=>editBtn(item)}>edit</button>
        </li>
      )}
    </>
  );
}

export default App;