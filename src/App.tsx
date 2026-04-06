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
  | { type: "ADD" }
  | { type: "EDIT"; payload: number}

function reducer (state: State, action: Action) : State {
  switch(action.type){

    default : 
    return state;
  }
}

const initialState: State = {
  inputValue: "",
  items: [],
  editingId: null,
}

function App () {
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <>
      <input value={inputValue} onChange={(e) => inputChange(e.target.value)}/>
      <button onClick={() => addBtn}>Add</button>
    </>
  );
}

export default App;