import { useReducer, useState } from "react";

interface IType {
  id: number;
  text: string;
  completed: boolean;
}

// ADD
type State = {
  items:IType[]
}

type Action = 
  { type: "ADD"; payload: string };


const reducer = (state:State, action:Action): State => {
  switch(action.type){
    case "ADD" :
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      }
      default: return state;
  } 
}

function App(){
  const [state, dispatch] =useReducer(reducer, { items: []});
  
  const [inputValue, setInputValue] = useState("");
  //const [items, setItems] = useState<IType[]>([]);
  const [editingId, setEditingId] = useState<number|null>(null);
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const updatedItems = () => {
    if(!inputValue.trim()) return;
    if(editingId !== null){
      editStart();
    } else {
      addBtn();
    }
    setInputValue("");
    setEditingId(null);
  }
  // // 기존
  // const addBtn = () => {
  //   setItems((prev) => [...prev, {id:Date.now(), text:inputValue, completed:false}]);
  // }
  const addBtn = () => {
    dispatch({ type: "ADD", payload: inputValue});
  }
  const deleteBtn = (id:number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  const editStart = () => {
    setItems((prev) => prev.map((item) => item.id === editingId ? {...item, text:inputValue} : item));
  }
  const readyToEditBtn = (id:number, text:string) => {
    setEditingId(id);
    setInputValue(text);
  }
  const toggleChange = (id:number, checked:boolean) => {
    setItems((prev) => prev.map((item) => item.id === id ? {...item, completed:checked} : item))
  }
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={updatedItems}>Add</button>
      {state.items.map((item) => 
        <li key={item.id}>
          <input type="checkbox" checked={item.completed} onChange={(e) => toggleChange(item.id, e.target.checked)}/>
          <span style={{ textDecoration: item.completed ? "line-through" : "none"}}>{item.text}</span>
          <button onClick={() => deleteBtn(item.id)}>delete</button>
          <button onClick={() => readyToEditBtn(item.id, item.text)}>edit</button>
        </li>
      )}
    </>
  );
}

export default App;