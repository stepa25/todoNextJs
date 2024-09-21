export interface Itodos{
    id: number
    text: string
    completed: boolean
}

export interface Iprops {
    id: number
    text: string
    completed: boolean
    onDelete: () => void
    onToggle: () => void
}

export interface Ichildren {
    children: React.ReactNode
}

export interface ItodosContextType {
    todos: Itodos[];
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onClick: () => void;
  }