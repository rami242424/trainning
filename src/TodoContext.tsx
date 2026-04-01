import { createContext } from 'react';
import type { IType } from './TodoProvider';

// type State = {
//     items: IType[];
//     inputValue: string;
//     editingId: number|null;
// }

// type Action = 
//     | { type: "SET_INPUT"; payload: string }
//     | { type: "ADD" }
//     | { type: "DELETE"; payload: number }    
//     | { type: "START_EDIT"; payload: {id:number; text:string} }
//     | { type: "EDIT" }
//     | { type: "TOGGLE"; payload: {id:number; checked:boolean} }
// ;

// interface ToDoContextType {
//     state: State;
//     dispatch: React.Dispatch<Action>;
// }

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