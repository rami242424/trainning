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
    const addBtn = () => {
        setItems((prev) => [...prev, {id:Date.now(), text:inputValue, completed:false}]);
        setInputValue("");
    }
    const deleteBtn = () => {

    }
    const editBtn = (item:IType) => {
        setInputValue(item.text);
        setEditingId(item.id);
    }
    
    return(
        <>
            <input value={inputValue} onChange={inputChange}/>
            <button onClick={addBtn}>ADD</button>
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