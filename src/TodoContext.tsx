import { createContext } from "react";

export const ToDoContext = createContext(null);

export function TodoProvider({ children }){
    return (
        <ToDoContext.Provider value={null}>
            {children}
        </ToDoContext.Provider>
    );
}