import { useState } from "react";

export interface IType {
    id: number;
    text: string;
    completed: boolean;
}

interface IToDoInputType {
    inputValue: string;
    inputChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    updatedItem: () => void; 
    editingId: number|null;
    
}

interface IToDoListType {
    toggleInput: (id:number, checked:boolean) => void;
    deleteBtn: (id: number) => void;
    editBtn : (text: string, id: number) => void;
    items: IType[];
}

interface TodoItemProps {
    toggleInput : (id:number, checked: boolean) => void;
    deleteBtn : (id:number) => void;
    editBtn : (text: string, id: number) => void;
    item : IType;
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
    const editBtn = (text:string, id:number) => {
        setInputValue(text);
        setEditingId(id);
    }
    const toggleInput = (id:number, checked:boolean) => {
        setItems((prev) => prev.map((item) => item.id === id ? {...item, completed: checked} : item));
    }
    
    return(
        <>
            <ToDoInput 
                inputValue = {inputValue}
                inputChange = {inputChange}
                updatedItem = {updatedItem}
                editingId = {editingId}
            />
            <ToDoList 
                toggleInput ={toggleInput}
                deleteBtn ={deleteBtn}
                editBtn ={editBtn}
                items ={items}
            />
        </>
    );
}

export default TodoProvider;

export function ToDoInput({inputValue, inputChange, updatedItem, editingId}:IToDoInputType){
    return(
        <>
            <input value={inputValue} onChange={inputChange}/>
            <button onClick={updatedItem}>{editingId !== null ? "SAVE" : "ADD"}</button>
        </>
    );
}

export function ToDoList({items, toggleInput, deleteBtn, editBtn}:IToDoListType){
    return(
        <>
            {items.map((item) => (
                    <li key={item.id}>
                        <ToDoItem 
                            toggleInput = {toggleInput}
                            item = {item}
                            deleteBtn = {deleteBtn}
                            editBtn = {editBtn}
                        />
                    </li>
                )
            )}
        </>
    );
}

export function ToDoItem({toggleInput, item, deleteBtn, editBtn}:TodoItemProps){
    return(
        <>
            <input type="checkbox" onChange={(e) => toggleInput(item.id, e.target.checked)} checked={item.completed}/>
            <span style={{ textDecoration: item.completed ? "line-through" : "none"}}>{item.text}</span>
            <button onClick={() => deleteBtn(item.id)}>delete</button>
            <button onClick={() => editBtn(item.text, item.id)}>edit</button>
        </>
    );
}