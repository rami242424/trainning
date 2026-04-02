import { TodoProvider, ToDoInput, ToDoList } from "./TodoProvider";

function App() {
  return (
    <TodoProvider>
      <ToDoInput />
      <ToDoList />
    </TodoProvider>
  );
}

export default App;