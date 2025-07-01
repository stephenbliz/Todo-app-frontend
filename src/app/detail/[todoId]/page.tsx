'use client';
import TodoDetail from "@/app/components/todoDetail";
import {  useSelector } from "react-redux";
import type { RootState} from "../../redux/store";
import { use } from "react";

export default function Detail({params}: {params:Promise<{todoId: string}>}){
    
        const {todoId} = use(params);
        const todo = useSelector((state: RootState) => {
            return state.todo;
        })
        const {loading, error, data} = todo;
        const myTodos = data;
        const id = todoId;

    return(
        <div
            className=" mt-[7rem] p-4"
        >
            <TodoDetail 
                myTodos={myTodos}
                id={id}
            />
        </div>
    )
}