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

function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<IType[]>([]);
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const addBtn = () => {
    setItems((prev) => [...prev, {id:Date.now(), text:inputValue, completed:false}])
  }
  const deleteBtn = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  const editBtn = (item:IType) => {
    
  }
  return(
    <>
      <input onChange={inputChange}/>
      <button onClick={addBtn}>Add</button>
      {items.map((item) => 
        <li key={item.id}>
          {item.text}
          <button onClick={() => deleteBtn(item.id)}>delete</button>
          <button onClick={() => editBtn(item)}>edit</button>
        </li>
      )}
    </>
  );
}

export default App;