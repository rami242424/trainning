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
    setItems((prev) => [...prev, {id:Date.now(), text:inputValue, completed:false}]);
  }
  return(
    <>
      <input value="inputValue" onChange={inputChange}/>
      <button onClick={addBtn}>Add</button>
      {items.map((item) => 
      <ul>
        <li key={item.id}>{item.text}</li>
        <button>delete</button>
        <button>edit</button>
      </ul>
      )}
    </>
  );
}

export default App;