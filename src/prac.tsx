import { useState } from "react";

function App(){
    const [value, setValue] = useState("");
    const [lists, setLists] = useState<string[]>([]);
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const onClick = () => {
        setLists((prev) => [...prev, value]);
        setValue("");
    }
    return(
        <>
            <input value={value} onChange={onChange}/>
            <button onClick={onClick}>Add</button>
            {lists.map((list, index) => <li key={index}>{list}<button>X</button></li>)}
        </>
    );
}

export default App;