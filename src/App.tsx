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

interface Itype {
  id: number;
  text: string;
}

function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<Itype[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)  
  }
  const addClick = () => {
    // 1. 빈칸인데 add 누를때
    if(!inputValue.trim()) return;
    if(editingId !== null) {
      // 수정일때
      setItems((prev) => (
        //prev.map((item) => editingId === item.id ? {id: item.id, text: inputValue} : item)
        prev.map((item) => editingId === item.id ? {...item, text: inputValue} : item)
      ));
      setEditingId(null);

    } else {
      // 
      setItems((prev) => [...prev, {id: Date.now(), text: inputValue}]);
    }
    setInputValue("");

    
  }
  const deleteBtn = (id:number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  const editBtn = (item:Itype) => {
    //클릭한 id의 내용들로 editingId를 설정하고, 클릭한 id의 내용들로 인풋을 채움
    setEditingId(item.id)
    setInputValue(item.text)
    //add버튼이 save버튼으로 바뀌어야함
    
  }
  return(
    <>
      <input onChange={inputChange} value={inputValue}/>
      <button onClick={addClick}>{editingId !== null ? "SAVE" : "ADD"}</button>
      {items.map((item) => (
        <li key={item.id}>
          {item.text}
          <button onClick = {() => deleteBtn(item.id)}>delete</button>
          <button onClick = {() => editBtn(item)}>edit</button>
        </li>
      ))}
    </>
  );
}

export default App;