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
            className="p-4"
        >
            {loading && 
                <div
                    className="text-sm font-semibold "
                >
                    Loading...
                </div>
            }
            {myTodos && <TodoDetail 
                myTodos={myTodos}
                id={id}
            />
            }
            {error && 
                <div
                    className="text-sm font-semibold "
                >
                    {error}
                </div>
            }
        </div>
    )
}