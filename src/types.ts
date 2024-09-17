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