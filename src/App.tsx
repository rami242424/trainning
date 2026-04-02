import { ToDoInput, TodoProvider} from "./TodoProvider";

function App(){
  return (
    <TodoProvider>
      <ToDoInput />
    </TodoProvider>
  );
}

export default App;
