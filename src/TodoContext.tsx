import { createContext } from "react";
import type { IType } from './TodoProvider';

interface ToDoContextType {
    deleteBtn: (id: number) => void;
    editBtn: (id: number, text: string) => void;
    toggleChange: (id: number, checked: boolean) => void;
    editingId: number | null;
    items: IType[];
    inputValue: string;
    inputChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    updatedItem: () => void;
}

export const ToDoContext = createContext<ToDoContextType | null>(null);