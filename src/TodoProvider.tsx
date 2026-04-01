import { useContext, useState } from "react";
import { ToDoContext } from './TodoContext';

export interface IType {
    id: number;
    text: string;
    completed: boolean;
}

interface IToDoInputProps {
    inputValue: string;
    inputChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    updatedItem: () => void;     
}



function TodoProvider(){
    const [inputValue, setInputValue] = useState("");
    const [items, setItems] = useState<IType[]>([]);
    const [editingId, setEditingId] = useState<number|null>(null);
    const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const updatedItem = () => {
        if(editingId !== null){
            addBtn();
        } else {
            afterEdit();
        }
    }
    const afterEdit = () => {
        setItems((prev) => prev.map((item) => item.id === editingId ? {...item, text:inputValue} :item));
    }
    const addBtn = () => {
        setItems((prev) => [...prev, {id:Date.now(), text:inputValue, completed:false}]);
        setInputValue("");
    }
    const deleteBtn = (id:number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }
    const editBtn = (id:number, text:string) => {
        setInputValue(text);
        setEditingId(id);
    }
    const toggleChange = (id:number, checked:boolean) => {
        setItems((prev) => prev.map((item) => item.id === id ? {...item, completed: checked} : item));
    }
    
    return(
        <ToDoContext.Provider value={{ toggleChange, deleteBtn, editBtn, items, editingId }}>
            <ToDoInput 
                inputValue = {inputValue}
                inputChange = {inputChange}
                updatedItem = {updatedItem}
            />
            <ToDoList />
        </ToDoContext.Provider>
    );
}

export default TodoProvider;

export function ToDoInput({inputValue, inputChange, updatedItem} : IToDoInputProps){
    const context = useContext(ToDoContext);
    if(!context) return null;
    const {editingId} = context;
    return(
        <>
            <input value={inputValue} onChange={inputChange}/>
            <button onClick={updatedItem}>{editingId !== null ? "SAVE" : "ADD"}</button>
        </>
    );
}

export function ToDoList(){
    const context = useContext(ToDoContext);
    if(!context) return null;
    const {items} = context;
    return(
        <>
            {items.map((item) => (
                    <li key={item.id}>
                        <ToDoItem
                            item = {item}
                        />
                    </li>
                )
            )}
        </>
    );
}

export function ToDoItem({ item }:{ item: IType }){
    const context = useContext(ToDoContext);
    if(!context) return null;
    const {toggleChange, deleteBtn, editBtn} = context;
    return(
        <>
            <input type="checkbox" onChange={(e) => toggleChange(item.id, e.target.checked)} checked={item.completed}/>
            <span style={{ textDecoration: item.completed ? "line-through" : "none"}}>{item.text}</span>
            <button onClick={() => deleteBtn(item.id)}>delete</button>
            <button onClick={() => editBtn(item.id, item.text)}>edit</button>
        </>
    );
}