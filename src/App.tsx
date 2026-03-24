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
  const deleteBtn = () => {

  }
  const editBtn = () => {

  }
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={addBtn}>Add</button>
      {items.map((item) => 
        <li key={item.id}>
          {item.text}
          <button onClick={deleteBtn}>delete</button>
          <button onClick={editBtn}>edit</button>
        </li>
      )}
    </>
  );
}

export default App;