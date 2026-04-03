import { useState } from "react";

interface IType {
  id: number;
  text: string;
  completed: boolean;
}

function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<IType[]>([]);
  const [editingId, setEditingId] = useState<number|null>(null);
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const updatedItems = () => {
    if(!inputValue.trim()) return;
    if(editingId !== null){
      editStart();
    } else {
      addBtn();
    }
    setInputValue("");
    setEditingId(null);
  }
  const addBtn = () => {
    setItems((prev) => [...prev, {id:Date.now(), text:inputValue, completed:false}]);
    //setInputValue("");
  }
  const deleteBtn = (id:number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  const editStart = () => {
    setItems((prev) => prev.map((item) => item.id === editingId ? {...item, text:inputValue} : item));
    //setInputValue("");
  }
  const readyToEditBtn = (id:number, text:string) => {
    setEditingId(id);
    setInputValue(text);
  }
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={updatedItems}>Add</button>
      {items.map((item) => 
        <li key={item.id}>
          {item.text}
          <button onClick={() => deleteBtn(item.id)}>delete</button>
          <button onClick={() => readyToEditBtn(item.id, item.text)}>edit</button>
        </li>
      )}
    </>
  );
}

export default App;