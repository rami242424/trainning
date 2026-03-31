import { ToDoInput, ToDoList, TodoProvider } from "./TodoProvider";

function App(){
  return (
    <TodoProvider>
      <ToDoInput />
      <ToDoList />
    </TodoProvider>
  );
}

export default App;
