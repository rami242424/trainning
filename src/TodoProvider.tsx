import React, { createContext, useContext, useReducer } from "react";

// ---------------- 타입
export interface IType {
  id: number;
  text: string;
  completed: boolean;
}

type State = {
  items: IType[];
  inputValue: string;
  editingId: number | null;
};

type Action =
  | { type: "SET_INPUT"; payload: string }
  | { type: "ADD" }
  | { type: "START_EDIT"; payload: { id: number; text: string } }
  | { type: "EDIT" }
  | { type: "DELETE"; payload: number }
  | { type: "TOGGLE"; payload: { id: number; checked: boolean } };

// ---------------- 초기 상태
const initialState: State = {
  items: [],
  inputValue: "",
  editingId: null,
};

// ---------------- reducer
function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, inputValue: action.payload };

    case "ADD":
      if (!state.inputValue.trim()) return state;
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: Date.now(),
            text: state.inputValue,
            completed: false,
          },
        ],
        inputValue: "",
        editingId: null,
      };

    case "START_EDIT":
      return {
        ...state,
        inputValue: action.payload.text,
        editingId: action.payload.id,
      };

    case "EDIT":
      if (state.editingId === null) return state;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === state.editingId
            ? { ...item, text: state.inputValue }
            : item
        ),
        inputValue: "",
        editingId: null,
      };

    case "DELETE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "TOGGLE":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, completed: action.payload.checked }
            : item
        ),
      };

    default:
      return state;
  }
}

// ---------------- context
type TodoContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const TodoContext = createContext<TodoContextType | null>(null);

// ---------------- custom hook
export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within TodoProvider");
  }
  return context;
}

// ---------------- provider
export function TodoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

// ---------------- Input 컴포넌트
export function ToDoInput() {
  const { state, dispatch } = useTodo();

  const handleClick = () => {
    dispatch({
      type: state.editingId !== null ? "EDIT" : "ADD",
    });
  };

  return (
    <>
      <input
        value={state.inputValue}
        onChange={(e) =>
          dispatch({ type: "SET_INPUT", payload: e.target.value })
        }
      />
      <button onClick={handleClick}>
        {state.editingId !== null ? "SAVE" : "ADD"}
      </button>
    </>
  );
}

// ---------------- Item 컴포넌트
export function ToDoItem({ item }: { item: IType }) {
  const { dispatch } = useTodo();

  return (
    <li>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={(e) =>
          dispatch({
            type: "TOGGLE",
            payload: { id: item.id, checked: e.target.checked },
          })
        }
      />
      <span
        style={{
          textDecoration: item.completed ? "line-through" : "none",
        }}
      >
        {item.text}
      </span>

      <button
        onClick={() =>
          dispatch({ type: "DELETE", payload: item.id })
        }
      >
        delete
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "START_EDIT",
            payload: { id: item.id, text: item.text },
          })
        }
      >
        edit
      </button>
    </li>
  );
}

// ---------------- List 컴포넌트 (중요)
export function ToDoList() {
  const { state } = useTodo();

  return (
    <ul>
      {state.items.map((item) => (
        <ToDoItem key={item.id} item={item} />
      ))}
    </ul>
  );
}