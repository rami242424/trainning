import { useState } from "react";

interface IType {
    id: number;
    text: string;
    completed: boolean;
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
    const editBtn = (item:IType) => {
        setInputValue(item.text);
        setEditingId(item.id);
    }
    
    return(
        <>
            <input value={inputValue} onChange={inputChange}/>
            <button onClick={updatedItem}>{editingId !== null ? "SAVE" : "ADD"}</button>
            {items.map((item) => 
                <li>
                    {item.text}
                    <button onClick={() => deleteBtn(item.id)}>delete</button>
                    <button onClick={() => editBtn(item)}>edit</button>
                </li>
            )}
        </>
    );
}

export default TodoProvider;