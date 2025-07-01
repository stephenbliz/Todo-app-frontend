'use client';
import { useState, useEffect } from "react";
import TodoDetail from "./todoDetail";
import Todo from "./todos";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "../redux/features/todoSlice";
import type { RootState, AppDispatch } from "../redux/store";

export default function Main() {

    const [id, setId] = useState<string>('');
    const [hasMounted, setHasMounted] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        setHasMounted(true);
    },[])
    useEffect(()=>{
        dispatch(fetchTodo());
    }, [])

    const todo = useSelector((state: RootState)=>{
        return state.todo;
    })

    const {loading, error, data} = todo;
    const myTodos = data;
    console.log(myTodos)

    return(
        <section
            className="lg:grid grid-cols-10 gap-4 mt-[30%] md:mt-[20%] lg:mt-[6rem] px-2 lg:px-[2rem] max-h-[80vh]"
        >
            <section
                className="lg:col-span-4 border border-gray-300 rounded p-4 shadow-gray-300 shadow-sm overflow-y-scroll max-h-[80vh]"
            >
                <h1
                className='font-semibold text-lg capitalize mb-4'
                >
                <span>my tasks</span>

                <span
                    className='border-b-2 border-red-400 block mt-0.5 w-[2.5rem]'
                ></span>
                </h1>

                <Todo
                    myTodos ={myTodos}
                    setId = {setId}
                    hasMounted = {hasMounted}
                />
            </section>

            <section
                className="lg:col-span-6 border hidden lg:block border-gray-300 rounded p-4 shadow-gray-300 shadow-sm overflow-y-scroll max-h-[80vh]"
            >
                <TodoDetail 
                    myTodos ={myTodos}
                    id = {id}
                />
            </section>
        </section>
    )
}