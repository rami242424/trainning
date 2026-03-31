import { useContext, useState } from "react";
import { ToDoContextType } from "./TodoContext";

interface IType {
  id: number;
  text: string;
  completed: boolean;
}
interface IToDoInputProps {
  inputValue:string
  inputChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  updatedItem: () => void;
  editingId: number|null;
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
    setEditingId(null);
  }
  const deleteBtn = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  const editBtn = (id: number, text: string) => {
    setInputValue(text);
    setEditingId(id);
  }
  const afterEdit = () => {
    setItems((prev) => prev.map((item) => editingId === item.id ? {...item, text: inputValue} : item));
    setInputValue("");
    setEditingId(null);
  }

  const updatedItem = () => {
    if(editingId !== null) {
      afterEdit();
    } else {
      addBtn();
    }
  }
  const toggleChange = (id:number, checked:boolean) => {
    setItems((prev) => prev.map((item) => item.id === id ? {...item, completed: checked} : item));
  }
  return (
    <ToDoContextType.Provider value={{deleteBtn, editBtn, toggleChange}}>
      <ToDoInput 
        inputValue={inputValue}
        inputChange={inputChange} 
        updatedItem={updatedItem}
        editingId={editingId}
      />
      <ToDoList 
        items={items}
      />
    </ToDoContextType.Provider>
  );
}

export default App;

function ToDoInput({inputValue, inputChange, updatedItem, editingId} : IToDoInputProps){
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={updatedItem}>{editingId !== null ? "SAVE" : "ADD"}</button>
    </>
  );
}
function ToDoList({items}:{items:IType[]}){
  return(
    <>
      {items.map((item) => (
        <li key={item.id}>
          <ToDoItem item={item}/>
        </li>
      ))}
    </>
  );
}
function ToDoItem({item}:{item: IType}){
  const context = useContext(ToDoContextType);
  if(!context) return null;
  const {deleteBtn, editBtn, toggleChange} = context;
  return(
    <>
      <input type="checkbox" checked={item.completed} onChange={(e) => toggleChange(item.id, e.target.checked)}/>
      <span style={{ textDecoration: item.completed ? "line-through" : "none"}}>{item.text}</span>
      <button onClick={() => deleteBtn(item.id)}>delete</button>
      <button onClick={() => editBtn(item.id, item.text)}>edit</button>
    </>
  );
}