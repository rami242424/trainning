// import { useState } from "react";

import { useState } from "react";


// interface ItemType {
//   id: number;
//   text: string;
// }
// function App(){
//   const [inputValue, setInputValue] = useState("");
//   const [items, setItems] = useState<ItemType[]>([]);
//   const [edictingId, setEdictingId] = useState<number | null>(null);
//   const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   }
//   const addBtnClick = () => {
//     if(!inputValue.trim()) return;
//     // 수정
//     if(edictingId !== null) {
//       setItems((prev) => prev.map((item) => 
//         edictingId === item.id ? {...item, text: inputValue} : item
//       ))
//     } else {
//     // 추가
//     setItems((prev) => [...prev, {id: Date.now(), text: inputValue}]);
//     }
//     setInputValue("");
//   }
//   const deleteBtn = (id:number) => {
//     setItems(items.filter((item) => item.id !== id));
//   }
//   const editBtn = (item:ItemType) => {
//     setEdictingId(item.id);
//     setInputValue(item.text);
//     console.log(edictingId, "에딕팅아이디")
//   }
//   return(
//     <>
//       <input value={inputValue} onChange={inputChange}/>
//       <button onClick={addBtnClick}>{edictingId !== null ? "SAVE" : "ADD"}</button>
//       {items.map((item) => (
//         <li key={item.id}>
//           {item.text}
//           <button onClick={() => deleteBtn(item.id)}>✖️</button>
//           <button onClick={() => editBtn(item)}>Edit</button>
//         </li>
//         ))}
//     </>
//   );
// }

// export default App;


function App(){
  const [inputValue, setInputValue] = useState("");
  const InputChange = (e) => {
    console.log(e.target.value)
  }
  return(
    <>
      <input onChange={InputChange} />
      <button>Add</button>
    </>
  );
}

export default App;