'use client';
import Image from "next/image"
import { handlePriorityColor, handleStatusColor } from "../utils/functions";
import { AppDispatch } from "../redux/store";
import { deleteTodo } from "../redux/features/todoSlice";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { myTodoProps, TodoDetailProps } from "../utils/types";
import { DateFormat } from "./dateFormat";
import { useRouter } from "next/navigation";
import { setStatus, setDescription, setPriority, setTitle, setEditingId, setImageFile } from "../redux/features/todoFieldsSlice";
import { useDispatch } from "react-redux";


export default function TodoDetail ({myTodos, id}: TodoDetailProps) {

    const todo = myTodos.find(mytodo =>  mytodo._id === id)

    const status = todo?.status;
    const priority = todo?.priority;
    const statusColor = handleStatusColor(status!);
    const priorityColor = handlePriorityColor(priority!);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleEdit = (todo: myTodoProps) => {
        router.push('/add-task');
        dispatch(setTitle(todo.title));
        dispatch(setStatus(todo.status));
        dispatch(setPriority(todo.priority));
        dispatch(setDescription(todo.description));
        dispatch(setImageFile(todo.image));
        dispatch(setEditingId(todo._id));
        
    }


    return (
        <>
        {todo ? <div
            className="relative"
        >
            <div
                className="flex mb-8 mt-[2rem] lg:mt-0 items-start lg:items-end justify-start gap-4"
            >
                <div
                    className="w-[30%]"
                >
                    <Image 
                        src={todo.image? `http://localhost:4000/uploads/${todo.image}` : '/assets/myPhoto.jpg'}
                        alt="Todo image"
                        width={50}
                        height={50}
                        className="w-full rounded-xl"
                    />
                </div>
                <div
                    className="w-fit"
                >
                    <h1
                        className="text-[1rem] cursor-pointer font-semibold capitalize mb-2"
                    >
                       {todo.title}
                    </h1>

                    <div
                        className="capitalize mb-1 text-[0.8rem] md:text-xl lg:text-[0.8rem]"
                    >
                        <span>priority: <span className={`${priorityColor}`}>{todo.priority}</span></span>
                        
                    </div>

                    <div
                        className="capitalize mb-1 text-[0.8rem] md:text-xl lg:text-[0.8rem]"
                    >
                        <span>status: <span className={`${statusColor}`}>{todo.status}</span></span>
                        
                    </div>
                    <div
                        className="text-gray-500 text-[0.8rem] md:text-xl lg:text-[0.8rem]"
                    >
                        Created {DateFormat(todo.createdAt)}
                    </div>
                </div>
            </div>
            <p
                className="text-sm md:text-xl lg:text-sm text-gray-500 mb-4"
            >
               {todo.description}
            </p>
            <Link
                href='/'
                className="capitalize underline font-semibold text-sm lg:hidden absolute top-0 right-0"
            >
                go back
            </Link>
            <div
                className="flex w-[20%] fixed bottom-8 right-0 justify-center items-center gap-[5%]"
            >
                <div
                    className="w-fit bg-red-400 p-1 border border-red-400 cursor-pointer rounded-lg text-gray-200"
                    onClick={()=> dispatch(deleteTodo(id))}
                >
                    <MdDelete />
                </div>
                <div
                    className="w-fit bg-red-400 p-1 border border-red-400 cursor-pointer rounded-lg text-gray-200"
                    onClick={()=>handleEdit(todo)}
                >
                    <MdEdit />
                </div>
            </div>
        </div> : 
        <div
            className="mt-[2rem] lg:mt-0"
        >
            <Link
                href='/'
                className="capitalize underline font-semibold text-sm lg:hidden "
            >
                go back
            </Link>
            <div className="mt-[1rem] lg:mt-0">Click on a todo to display details</div>
        </div>} 
        </>
        
    )
}