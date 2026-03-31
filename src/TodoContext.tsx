import { createContext } from "react";
import type { IType } from "./App";

interface ToDoContextType {
    deleteBtn: (id: number) => void;
    editBtn: (id: number, text: string) => void;
    toggleChange: (id: number, checked: boolean) => void;
    editingId : number | null;
    items: IType[];
}

export const ToDoContext = createContext<ToDoContextType | null>(null);