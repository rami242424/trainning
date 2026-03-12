import { useState } from "react";

function App(){
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const inputChange = (e) => {
    setInputValue(e.target.value)
  }
  const addClick = () => {
    setItems((prev) => [...prev, inputValue]);
    setInputValue("");
  }
  const deleteClick = (index) => {
    // 클릭한 버튼의 인덱스 === 필터안에 조건이 다르면(false) 삭제됨
    // 클릭한 버튼의 인덱스가 1이라면
    //setItems(items.filter((item, index) => !클릭한인덱스 === index));
    // console.log(index, "인덱스");
    //setItems((prev)) => [...prev, items.filter((item, i) => !index == i)]
    //setItems(items.filter((item, i) => !i == index));
    //console.log((items.filter((item, i) => !i == index)), "무슨값이지")
    // console.log(items.filter((item, i) => index == !item[i]))
    setItems(items.filter((item, i) => i !== index));

  }
  return (
    <>
      <input value={inputValue} onChange={inputChange}/>
      <button onClick={addClick}>Add</button>
      {items.map((item, index) => (
        <>
          <li key={index}>
            {item}
            <button onClick={() => deleteClick(index)}>✖️</button>
          </li>
        </>
      ))}
    </>
  );
}

export default App;
