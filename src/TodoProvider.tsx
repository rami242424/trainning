import { useContext, useState } from "react";
import { ToDoContext } from "./TodoContext";

export interface IType {
  id: number;
  text: string;
  completed: boolean;
}

function useTodo(){
    const context = useContext(ToDoContext);
    if(!context) {
        throw new Error ("useTodo must be used within TodoProvider");
    }
    return context;
}

export function TodoProvider({children} : {children: React.ReactNode}){
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
    return(
        <ToDoContext.Provider 
            value={{
                deleteBtn, editBtn, toggleChange, editingId, items, updatedItem, inputValue, inputChange
                }}
        >
            {children}
        </ToDoContext.Provider>
    );
}


export function ToDoInput(){
  const {inputValue, inputChange, updatedItem, editingId} = useTodo();
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={updatedItem}>{editingId !== null ? "SAVE" : "ADD"}</button>
    </>
  );
}

export function ToDoList(){
  const {items} = useTodo();
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

export function ToDoItem({item}:{item: IType}){
  const {deleteBtn, editBtn, toggleChange} = useTodo();
  return(
    <>
      <input type="checkbox" checked={item.completed} onChange={(e) => toggleChange(item.id, e.target.checked)}/>
      <span style={{ textDecoration: item.completed ? "line-through" : "none"}}>{item.text}</span>
      <button onClick={() => deleteBtn(item.id)}>delete</button>
      <button onClick={() => editBtn(item.id, item.text)}>edit</button>
    </>
  );
}