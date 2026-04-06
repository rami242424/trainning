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
  | { type: "SET_EDIT"; payload: {id: number, text: string }}


function reducer(state:State, action:Action): State {
  switch(action.type) {
    case "SET_INPUT" :
      return {
        ...state,
        inputValue: action.payload
      }
    case "ADD" :
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: Date.now(),
            text: state.inputValue,
            completed: false
          }
        ],
        inputValue: ""
      };
      case "DELETE":
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload)
        }
        case "SET_EDIT":
          return {
            ...state,
            inputValue: action.payload.text,
            editingId: action.payload.id
          }
          case "EDIT":
          case "TOGGLE":
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
          <input type="checkbox" onChange={(e) => dispatch({ type: "TOGGLE", payload: {id: item.id, checked: item.completed}})}/>
          <span style={{ textDecoration: editingId !== null ? "line-through" : "none"}}>
            {item.text}
          </span>
          <button onClick={() => dispatch({ type: "DELETE", payload: item.id })}>Delete</button>
          <button onClick={() => dispatch({ type: "SET_EDIT", payload: {id: item.id, text: item.text} })}>Edit</button>
        </li>
      )}
    </>
  );
}

export default App;