import { useReducer, useState } from "react";

interface IType {
  id: number;
  text: string;
  completed: boolean;
}

// 값이 변함, ui에 직접영향을 줌, 다음렌더에서도 기억해야하는 것
type State = {
  inputValue : string;
  editingId : number | null;
  items : IType[];
} 

type Action = 
  | { type: "SET_INPUT"; payload: string}
  | { type: "ADD" }
  | { type: "EDIT"; payload: number}
  | { type: "DELETE"; payload: number}
  | { type: "TOGGLE"; payload: {id: number, checked: boolean}}


function reducer(state:State, action:Action): State {
  switch(action.type) {
    default:
      return state;
  }
}

function App(){
  const [state, dispatch] = useReducer(reducer, initialState);

  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<number|null>(null);
  const [items, setItems] = useState<IType[]>([]);

  return (
    <>
      <input 
        value={state.inputValue} 
        onChange={(e) => dispatch({ type: "SET_INPUT", payload: e.target.value })}
      />
      <button onClick={() => dispatch({ type: "ADD" })}>
        Add
      </button>
      {items.map((item) => 
        <li key={item.id}>
          {item.text}
          <button onClick={() => dispatch({ type: "DELETE", payload: item.id })}>Delete</button>
          <button>Edit</button>
        </li>
      )}
    </>
  );
}

export default App;