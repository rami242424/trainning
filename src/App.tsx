import { useReducer } from "react";

interface IType {
  id: number;
  text: string;
  completed: boolean;
}

type State = {
  inputValue: string;
  items: IType[];
  editingId: number | null;
}

type Action =
  | { type: "SET_INPUT"; payload: string }
  | { type: "ADD" }
  | { type: "TOGGLE"; payload: number }
  | { type: "DELETE"; payload: number }
  | { type: "SET_EDIT"; payload: {id: number, text: string}}
  | { type: "EDIT"; payload: number }

function reducer (state: State, action: Action) : State {
  switch(action.type){
    case "SET_INPUT":
      return {
        ...state,
        inputValue: action.payload
      }
    case "ADD":
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
        inputValue: "",
      }
      case "TOGGLE":
        return {
          ...state,
          items: state.items.map((item) => item.id === action.payload 
              ? {...item, completed: !item.completed }
              : item
            )
        }
      case "DELETE":
        return {
          ...state,
          items: state.items.filter((item) => item.id !== state.editingId)
        }
      case "SET_EDIT":
        return {
          ...state,
          inputValue: state.inputValue,
          editingId: state.editingId
        }
    default : 
    return state;
  }
}

const initialState: State = {
  inputValue: "",
  items: [],
  editingId: null,
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <>
      <input value={state.inputValue} onChange={(e) => dispatch({ type: "SET_INPUT", payload: e.target.value})}/>
      <button onClick={() => dispatch({ type: "ADD" })}>Add</button>
      {state.items.map((item) => 
        <li key={item.id}>
          <input 
            type="checkbox" 
            checked={item.completed} 
            onChange={() => dispatch({ type: "TOGGLE", payload: item.id })}/>
          <span style={{ textDecoration: state.editingId !== null ? "line-through" : "none" }}>
            {item.text}
          </span>
          <button onClick={() => dispatch({ type: "DELETE", payload: item.id})}>delete</button>
          <button onClick={() => dispatch({ type: "SET_EDIT", payload: {id: item.id, text: item.text}})}>edit</button>
        </li>
      )}
    </>
  );
}

export default App;