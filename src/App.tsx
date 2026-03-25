import { useState } from "react";

interface IType{
  id: number;
  text: string;
  completed: boolean;
}
function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<IType[]>([]);
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const addBtn = () => {
    if(!inputValue.trim()) return;
    setItems((prev) => [...prev, {id:Date.now(), text:inputValue, completed:false}]);
    setInputValue("");
  }
  const deleteBtn = (id:number) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  const editBtn = (item:IType) => {
    setInputValue(item.text);
    
  }
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={addBtn}>Add</button>
      {items.map((item) => 
        <li key={item.id}>
          {item.text}
          <button onClick={() => deleteBtn(item.id)}>delete</button>
          <button onClick={() => editBtn(item)}>edit</button>
        </li>
      )}
    </>
  );
}

export default App;