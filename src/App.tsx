import React, { useContext, useState } from "react";
import { ToDoContext } from "./TodoContext";

interface IType {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoInputProps {
  inputValue: string;
  inputChange : (e:React.ChangeEvent<HTMLInputElement>) => void;
  updatedBtn : () => void;
  editingId: number | null;
}

interface TodoListProps {
  items: IType[];
  toggleChange : (id:number, checked: boolean) => void;
  deleteBtn : (id:number) => void;
  editBtn : (text: string, id: number) => void;
}

interface TodoItemProps {
  toggleChange : (id:number, checked: boolean) => void;
  deleteBtn : (id:number) => void;
  editBtn : (text: string, id: number) => void;
  item : IType;
}

function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<IType[]>([]);
  const [editingId, SetEditingId] = useState<number|null>(null);
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const updatedBtn = () => {
    if (editingId === null) {
      addBtn();
    } else {
      afterEditBtn();
    }
  }
  const addBtn = () => {
    if(!inputValue.trim()) return;
    setItems((prev) => [...prev, {id: Date.now(), text: inputValue, completed:false}]);
    setInputValue("");
    SetEditingId(null);
  }
  const afterEditBtn = () => {
    setItems((prev) => prev.map((item) => editingId === item.id ? {...item, text:inputValue} : item));
    setInputValue("");
    SetEditingId(null);
  }
  const deleteBtn = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  const editBtn = (text: string, id: number) => {
    setInputValue(text);
    SetEditingId(id);
  }
  const toggleChange = (id:number, checked: boolean) => {
    setItems((prev) => prev.map((item) => item.id === id ? {...item, completed: checked} : item));
  }

  return (
    <ToDoContext.Provider value={{ toggleChange, deleteBtn, editBtn}}>
      <TodoInput 
        inputValue = {inputValue}
        inputChange = {inputChange}
        updatedBtn = {updatedBtn}
        editingId = {editingId}
      />
      <TodoList items={items} />
    </ToDoContext.Provider>
  )
}

export default App;

function TodoInput ({inputValue, inputChange, updatedBtn, editingId} :TodoInputProps ){
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={updatedBtn}>{editingId !== null ? "SAVE" : "ADD"}</button>
    </>
  );
}

function TodoList({items} : {items : IType[]}){
  const context = useContext(ToDoContext);
  if(!context) return null;
  const {toggleChange, deleteBtn, editBtn} = context;
  return (
    <>
      {items.map((item) => (
        <li key={item.id}>
          <TodoItem 
            toggleChange = {toggleChange}
            item = {item}
            deleteBtn = {deleteBtn}
            editBtn = {editBtn}
          />
        </li>
      ))}
    </>
  )
}
function TodoItem({toggleChange, item, deleteBtn, editBtn} :TodoItemProps ){
  return(
    <>
      <input type="checkbox" onChange={(e) => toggleChange(item.id, e.target.checked)} checked={item.completed}/>
      <span style={{ textDecoration: item.completed ? "line-through" : "none"}}>{item.text}</span>
      <button onClick={() => deleteBtn(item.id)}>Delete</button>
      <button onClick={() => editBtn(item.text, item.id)}>Edit</button>
    </>
  );
}