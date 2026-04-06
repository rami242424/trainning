import { useReducer } from "react";

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
  | { type: "EDIT"}
  | { type: "DELETE"; payload: number}
  | { type: "TOGGLE"; payload: number}
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
            return {
              ...state,
              items: 
              
                state.items.map((item) => item.id === state.editingId ? {...item, text:state.inputValue}: item)
              ,
              inputValue: "",
              editingId: null
            }
          case "TOGGLE":
            return {
              ...state,
              items: state.items.map((item) => 
                item.id === action.payload 
                  ? {...item, completed: !item.completed} 
                  : item
              )
            }
    default:
      return state;
  }
}

const initialState : State = {
  inputValue: "",
  editingId: null,
  items: []
}

function App(){
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <input 
        value={state.inputValue} 
        onChange={(e) => dispatch({ type: "SET_INPUT", payload: e.target.value })}
      />
      <button onClick={() => {
        if(state.editingId !== null) {
          dispatch({ type: "EDIT" })
        } else {
          dispatch({ type: "ADD"});
        }
      }}
      >
        {state.editingId !== null ? "Update" : "Add"}
      </button>
      {state.items.map((item) => 
        <li key={item.id}>
          <input type="checkbox" checked={item.completed} onChange={() => dispatch({ type: "TOGGLE", payload: item.id})}/>
          <span style={{ textDecoration: item.completed ? "line-through" : "none"}}>
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