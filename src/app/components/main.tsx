'use client';
import { useState, useEffect } from "react";
import TodoDetail from "./todoDetail";
import Todo from "./todos";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchTodo } from "../redux/features/todoSlice";
import type { RootState, AppDispatch } from "../redux/store";
import { logOut } from "../redux/features/userSlice";

export default function Main() {

    const [id, setId] = useState<string>('');
    const [hasMounted, setHasMounted] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const {loading, error, data} = useSelector((state: RootState)=> state.todo);
    const {user} = useSelector((state: RootState) => state.user);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            router.push('/log-in');
        }
    }, [])

    useEffect(()=>{
        setHasMounted(true);
    },[])
    
    useEffect(()=>{
        dispatch(fetchTodo());
    }, [dispatch])

    const handleLogOut = ()=> {
        dispatch(logOut());
        router.push('/log-in');
    }

    return(
        <section
            className="lg:grid grid-cols-10 gap-4 mt-[30%] md:mt-[20%] lg:mt-[6rem] px-2 lg:px-[2rem] max-h-[80vh]"
        >
            <section
                className="lg:col-span-4 border border-gray-300 rounded p-4 shadow-gray-300 shadow-sm overflow-y-scroll max-h-[80vh]"
            >
                <div
                    className="flex justify-between items-center mb-4 flex-wrap"
                >
                    <div
                        className="w-fit"
                    >
                        <span>Welcome back</span> <span className="font-semibold uppercase">{user?.firstName}</span>
                    </div>
                    <div
                        className="text-red-400 capitalize cursor-pointer w-fit"
                        onClick={()=> handleLogOut()}
                    >
                        log out
                    </div>
                </div>
                
                <div
                    className="flex justify-between items-center mb-4"
                >
                    <h1
                        className='font-semibold text-lg capitalize w-fit'
                    >
                    <span>my tasks</span>

                    <span
                        className='border-b-2 border-red-400 block mt-0.5 w-[2.5rem]'
                    ></span>
                    </h1>
                    <button
                        className="w-fit bg-red-400 text-gray-300 rounded-lg px-2 py-1 capitalize cursor-pointer text-sm"
                        onClick={() => router.push('/add-task')}
                    >
                        add task
                    </button>
                </div>

                <div>
                    {loading && 
                        <div
                            className="text-sm font-semibold "
                        >
                            Loading...
                        </div>
                    }
                    {data && data.length < 1 &&
                        <div>
                            No task found...
                        </div>
                    }
                    {data && data.length >= 1 &&
                        <Todo
                            myTodos ={data}
                            setId = {setId}
                            hasMounted = {hasMounted}
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
                
            </section>

            <section
                className="lg:col-span-6 border hidden lg:block border-gray-300 rounded p-4 shadow-gray-300 shadow-sm overflow-y-scroll max-h-[80vh]"
            >
                {data && data.length >= 1 &&
                    <TodoDetail 
                        myTodos ={data}
                        id = {id}
                    />
                }
            </section>
        </section>
    )
}