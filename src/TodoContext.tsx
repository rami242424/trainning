import { createContext } from "react";

interface ToDoContextType {
    toggleChange : (id:number, checked: boolean) => void;
    deleteBtn : (id:number) => void;
    editBtn : (text: string, id: number) => void;
}

export const ToDoContext = createContext<ToDoContextType | null>(null);