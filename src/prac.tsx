import { useContext, useReducer,  } from "react";
import { ToDoContext } from "./TodoContext";

export interface IType {
  id: number;
  text: string;
  completed: boolean;
}

//----------------state 타입
type State = {
    items: IType[];
    inputValue: string;
    editingId: number | null;
}

//--------------------action 타입
type Action = 
    | { type: "SET_INPUT"; payload: string }
    | { type: "ADD" }
    | { type: "DELETE"; payload: number }    
    | { type: "START_EDIT"; payload: {id:number; text:string} }
    | { type: "EDIT" }
    | { type: "TOGGLE"; payload: {id:number; checked:boolean} }
;

//-----------------초기상태
const initialState: State = {
    items: [],
    inputValue: "",
    editingId: null
};

//-------------------reducer
function todoReducer(state: State, action: Action): State {
    switch(action.type) {
        case "SET_INPUT":
            return {...state, inputValue: action.payload};
        case "ADD":
            if(!state.inputValue.trim()) return state;
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
                editingId: null
            };
        case "DELETE":
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case "START_EDIT":
            return {
                ...state,
                inputValue: action.payload.text,
                editingId: action.payload.id
            };
        case "EDIT":
            return {
                ...state,
                items: state.items.map(item => 
                    item.id === state.editingId
                    ? {...item, text: state.inputValue}
                    : item
                ),
                inputValue: "",
                editingId: null
            }
        case "TOGGLE":
            return {
                ...state,
                items: state.items.map(item => 
                    item.id === action.payload.id
                    ? {...item, completed: action.payload.checked}
                    : item
                )
            };
        default:
            return state;
    }
}

// ---------------------- custom hook
function useTodo(){
    const context = useContext(ToDoContext);
    if(!context) {
        throw new Error ("useTodo must be used within TodoProvider");
    }
    return context;
}

//-------------------------- provider
export function TodoProvider({ children } : {children: React.ReactNode}){
    const [state, dispatch] = useReducer(todoReducer, initialState);

    return (
        <ToDoContext.Provider value={{ state, dispatch }}>
            {children}
        </ToDoContext.Provider>
    );
}

//--------------------------- input
export function ToDoInput(){
    const {state, dispatch} = useTodo();
    return (
        <>
            <input 
                value={state.inputValue}
                onChange={(e)=>
                    dispatch({ type: "SET_INPUT", payload: e.target.value})
                }
            />
            <button
                onClick={()=>
                    dispatch({ type: state.editingId ? "EDIT" : "ADD"})
                }
            >
                {state.editingId ? "SAVE" : "ADD"}
            </button>
        </>
    );
}

//-------------------- list
export function ToDoList(){
    const { state } = useTodo();

    return (
        <>
            {state.items.map(item => (
                <li key={item.id}>
                    <ToDoItem item={item} />
                </li>
            ))}
        </>
    );
}


//------------------ Item
export function ToDoItem({item}:{item:IType}){
    const { dispatch } = useTodo();

    return (
        <>
            <input 
                type="checkbox"
                checked={item.completed}
                onChange={(e) =>
                    dispatch({
                        type: "TOGGLE",
                        payload: {id: item.id, checked: e.target.checked}
                    })
                }
            />
            <span
                style={{
                    textDecoration: item.completed ? "line-through" : "none"
                }}
            >
                {item.text}
            </span>
            <button
                onClick={() => 
                    dispatch({ type: "DELETE", payload: item.id})
                }
            >
                delete
            </button>
            <button
                onClick={() => 
                    dispatch({
                        type: "START_EDIT",
                        payload: { id:item.id, text:item.text}
                    })
                }
            >
                edit
            </button>
        </>
    )
}