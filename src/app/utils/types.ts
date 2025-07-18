import { Dispatch, SetStateAction } from "react"

export interface myTodoProps{
    title: string
    description: string
    status: string
    priority: string
    image: string | null
    createdAt: string
    _id: string
}
export interface TodoProps{
    myTodos: myTodoProps[]
    setId: Dispatch<SetStateAction<string>>
    hasMounted: boolean
}
export interface TodoDetailProps{
    myTodos: myTodoProps[]
    id: string 
}
export interface todoInitialProp{
    loading: boolean
    data: myTodoProps[]
    error: string
}
export interface todoFieldsInitialProp{
    title: string
    priority: string
    status: string
    description: string
    editingId: string | null
    imageFile: File | null
}