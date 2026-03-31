import { useState } from "react";

interface IType {
  id: number;
  text: string;
  completed: boolean;
}
interface IToDoInputProps {
  inputValue:string
  inputChange: () => void;
  updatedItem: () => void;
}

interface IToDoItemProps {
  item:IType[];
  deleteBtn:() =>void;
  editBtn:() => void;
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
    setItems((prev) => [...prev, {id: Date.now(), text: inputValue, completed: false}]);
    setInputValue("");
  }
  const deleteBtn = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  const editBtn = (item:IType) => {
    setInputValue(item.text);
    setEditingId(item.id);
  }
  const afterEdit = () => {
    setItems((prev) => prev.map((item) => editingId === item.id ? {...item, text: inputValue} : item));
  }

  const updatedItem = () => {
    if(editingId !== null) {
      afterEdit();
    } else {
      addBtn();
    }
  }

  return (
    <>
      <ToDoInput 
        inputValue={inputValue}
        inputChange={inputChange} 
        updatedItem={updatedItem}
      />
      <ToDoList 
        items={items}
      />
    </>
  );
}

export default App;

function ToDoInput({inputValue, inputChange, updatedItem} : IToDoInputProps){
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={updatedItem}>Add</button>
    </>
  );
}
function ToDoList({items}:IType[]){
  return(
    <>
      {items.map((item) => (
        <li key={item.id}>
          <ToDoItem />
        </li>
      ))}
    </>
  );
}
function ToDoItem({item, deleteBtn, editBtn}:IToDoItemProps){
  return(
    <>
      {item.text}
      <button onClick={() => deleteBtn(item.id)}>delete</button>
      <button onClick={() => editBtn(item)}>edit</button>
    </>
  );
}