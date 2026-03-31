import { createContext } from "react";

interface ToDoContextType {
    deleteBtn: (id: number) => void;
    editBtn: (id: number, text: string) => void;
    toggleChange: (id: number, checked: boolean) => void;
}

export const ToDoContextType = createContext<ToDoContextType | null>(null);