// import { useState } from "react";

// interface IType {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// interface TodoInputProps {
//   inputValue: string;
//   inputChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
//   addBtn: () => void;
//   editingId: number | null;
// }

// interface TodoItemProps {
//   item: IType;
//   toggleCompleted: (id: number) => void;
//   deleteBtn: (id: number) => void;
//   editBtn: (item: IType) => void;
// }

// function App(){
//   const [inputValue, setInputValue] = useState("");
//   const [items, setItems] = useState<IType[]>([]);
//   const [editingId, setEditingId] = useState<number|null>(null);
//   const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   }
//   const addBtn = () => {
//     if(!inputValue.trim()) return;
//     if(editingId !== null) {
//       setItems((prev) => prev.map((item) => editingId === item.id ? {...item, text: inputValue} : item));
//     } else {
//     setItems((prev) => [...prev, {id: Date.now(), text: inputValue, completed: false}]);
//     }
//     setInputValue("");
//     setEditingId(null);
//   }
//   const toggleCompleted = (id:number) => {
//     setItems((prev) => prev.map((item) => item.id === id ? {...item, completed: !item.completed} : item));
//   }
//   const deleteBtn = (id:number) => {
//     setItems((prev) => prev.filter((item) => item.id !== id));
//   }
//   const editBtn = (item:IType) => {
//     setEditingId(item.id);
//     setInputValue(item.text);
//   }
//   return (
//     <>
//       <TodoInput 
//         inputValue= {inputValue}
//         inputChange={inputChange}
//         addBtn={addBtn}
//         editingId= {editingId}
//       />
//       {items.map((item) => 
//         <li key={item.id}>
//           <TodoItem 
//             item={item}
//             toggleCompleted={toggleCompleted}
//             deleteBtn={deleteBtn}
//             editBtn={editBtn}
//           />
//         </li>
//       )}
//     </>
//   );
// }


// function TodoInput({inputValue, inputChange, addBtn, editingId}: TodoInputProps){
  
//   return(
//     <>
//       <input value={inputValue} onChange={inputChange}/>
//       <button onClick={addBtn}>
//         {editingId !== null ? "SAVE" : "ADD"}
//       </button>
//     </>
//   );
// }

// function TodoItem({item, toggleCompleted, deleteBtn, editBtn} :TodoItemProps){
//   return(
//     <>
//       <input type="checkbox" checked={item.completed} onChange={() => toggleCompleted(item.id)} />
//         <span style={{ textDecoration: item.completed ? "line-through" : "none"}}>
//           {item.text}
//         </span>
//       <button onClick={() => deleteBtn(item.id)}>delete</button>
//       <button onClick={() => editBtn(item)}>edit</button>
//     </>
//   );
// }


// export default App;


// // ---------------------------------------------
// import { useState } from "react";

// interface IType {
//   id:number;
//   text:string;
//   completed:boolean;
// }
// function App(){
//   const [inputValue, setInputValue] = useState("");
//   const [items, setItems] = useState<IType[]>([]);
//   const [editingId, setEditingId] = useState<number|null>(null);
//   const [category, setCategory] = useState("all");
//   const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   }
//   const addBtn = () => {
//     if(!inputValue.trim()) return;
//     if(editingId !== null){
//       setItems((prev) => prev.map((item) => editingId === item.id ? {...item, text:inputValue} : item));
//     } else {
//       setItems((prev) => [...prev, {id:Date.now(), text:inputValue, completed:false}]);
//     }
//     setInputValue("");
//     setEditingId(null);
//   }
//   const deleteBtn = (id:number) => {
//     setItems((prev) => prev.filter((item) => item.id !== id) );
//   }
//   const editBtn = (item:IType) => {
//     setInputValue(item.text);
//     setEditingId(item.id);
//   }
//   const toggleInput = (id: number) => {
//     setItems((prev) => prev.map((item) => id === item.id ? {...item, completed: !item.completed} : item));
//   }
//   const filtered = items.filter((item) => item.completed === true ? true : item.completed === false )
//   return(
//     <>
//       <select onChange={(e) => setCategory(e.target.value)}>
//         <option value="all">전체</option>
//         <option value="completed">완료</option>
//         <option value="uncompleted">미완료</option>
//       </select>
//       <input value={inputValue} onChange={inputChange}/>
//       <button onClick={addBtn}>{editingId !== null ? "SAVE" : "ADD"}</button>
//       {items.length === 0 ? (
//         <span>할일없음</span>
//       ) : (
//         items.map((item) => 
//           <li key={item.id}>
//             <input type="checkbox" onChange={() => toggleInput(item.id)} checked={item.completed}/>
//             <span style={{ textDecoration: item.completed  ? "line-through" : "none" }}>{item.text}</span>
//             <button onClick={()=>deleteBtn(item.id)}>delete</button>
//             <button onClick={()=>editBtn(item)}>edit</button>
//           </li>
//         ))
//       }
//     </>
//   );
// }

// export default App;