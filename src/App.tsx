//import { useState } from "react";

import { useState } from "react";

// interface IType {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// function App(){
//   const [inputValue, setInputValue] = useState("");
//   const [items, setItems] = useState<IType[]>([]);
//   const [editingId, setEditingId] = useState<number|null>(null);
//   const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   }
//   const addClick = () => {
//     if(!inputValue.trim()) return;
//     if(editingId !== null){
//       //수정중
//       setItems((prev) => prev.map((item) => editingId === item.id ? {...item, text: inputValue}: item));
//     } else{
//       // 수정x, 단순 추가o
//       setItems((prev) => [...prev, {id: Date.now(), text: inputValue, completed: false}]);
//     }
//     setInputValue("");
//     setEditingId(null);
//   }
//   const deleteBtn = (id:number) => {
//     setItems((prev) => prev.filter((item) => item.id !== id));
//   }
//   const editBtn = (item:IType) => {
//     setEditingId(item.id);
//     setInputValue(item.text);
//   }
//   const toggleCompleted = (id:number) => {
//     setItems((prev) => 
//       prev.map((item) => item.id === id ? {...item, completed: !item.completed} : item)
//     );
//   }
//   return (
//     <>
//       <input value={inputValue} onChange={inputChange}/>
//       <button onClick={addClick}>{editingId !== null ? "SAVE" : "ADD"}</button>
//       {items.map((item) => (
//         <li key={item.id}>
//           <input 
//             type="checkbox"
//             checked={item.completed}
//             onChange={() => toggleCompleted(item.id)}
//           />
//           <span
//             style={{
//               textDecoration: item.completed ? "line-through" : "none"
//             }}>
//             {item.text}
//           </span>
//           <button onClick={() => {deleteBtn(item.id)}}>delete</button>
//           <button onClick={() => {editBtn(item)}}>edit</button>
//         </li>
//       ))}
//     </>
//   );
// }

// export default App;

interface IType {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoInputProps {
  inputValue: string;
  inputChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  addBtn: () => void;
  editingId: number | null;
}

interface TodoListProps {
  items: IType[];
  toggleCompleted: (id:number) => void;
  deleteBtn: (id:number) => void;
  editBtn: (item:IType) => void;
}

interface TodoItemProps {
  item: IType;
  toggleCompleted: (id: number) => void;
  deleteBtn: (id: number) => void;
  editBtn: (item: IType) => void;
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
    if(editingId !== null) {
      setItems((prev) => prev.map((item) => editingId === item.id ? {...item, text: inputValue} : item));
    } else {
    setItems((prev) => [...prev, {id: Date.now(), text: inputValue, completed: false}]);
    }
    setInputValue("");
    setEditingId(null);
  }
  const toggleCompleted = (id:number) => {
    setItems((prev) => prev.map((item) => item.id === id ? {...item, completed: !item.completed} : item));
  }
  const deleteBtn = (id:number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  const editBtn = (item:IType) => {
    setEditingId(item.id);
    setInputValue(item.text);
  }
  return (
    <>
      <TodoInput 
        inputValue= {inputValue}
        inputChange={inputChange}
        addBtn={addBtn}
        editingId= {editingId}
      />
      <TodoList 
        items={items}
        toggleCompleted={toggleCompleted}
        deleteBtn={deleteBtn}
        editBtn={editBtn}
      />
    </>
  );
}


function TodoInput({inputValue, inputChange, addBtn, editingId}: TodoInputProps){
  
  return(
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={addBtn}>
        {editingId !== null ? "SAVE" : "ADD"}
      </button>
    </>
  );
}

function TodoList({items,toggleCompleted,deleteBtn,editBtn}:TodoListProps){
  return(
    <>
      {items.map((item) => 
        <li key={item.id}>
          <TodoItem 
            item={item}
            toggleCompleted={toggleCompleted}
            deleteBtn={deleteBtn}
            editBtn={editBtn}
          />
        </li>
      )}
    </>
  );
}

function TodoItem({item, toggleCompleted, deleteBtn, editBtn} :TodoItemProps){
  return(
    <>
      <input type="checkbox" checked={item.completed} onChange={() => toggleCompleted(item.id)} />
        <span style={{ textDecoration: item.completed ? "line-through" : "none"}}>
          {item.text}
        </span>
      <button onClick={() => deleteBtn(item.id)}>delete</button>
      <button onClick={() => editBtn(item)}>edit</button>
    </>
  );
}


export default App;


