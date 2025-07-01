'use client';
import Image from "next/image"
import { handlePriorityColor, handleStatusColor } from "../utils/functions";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { TodoDetailProps } from "../utils/types";
import { DateFormat } from "./dateFormat";


export default function TodoDetail ({myTodos, id}: TodoDetailProps) {

    const todo = myTodos.find((mytodo) => {
            return  mytodo._id === id;
        })

    const status = todo?.status;
    const priority = todo?.priority;
    const statusColor = handleStatusColor(status!);
    const priorityColor = handlePriorityColor(priority!);

    return (
        <>
        {todo ? <div
            className="relative"
        >
            <div
                className="flex mb-8 items-start lg:items-end justify-start gap-4"
            >
                <div
                    className="w-[30%]"
                >
                    <Image 
                        src='/assets/myPhoto.jpg'
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
                >
                    <MdDelete />
                </div>
                <div
                    className="w-fit bg-red-400 p-1 border border-red-400 cursor-pointer rounded-lg text-gray-200"
                >
                    <MdEdit />
                </div>
            </div>
        </div> : <div>Click on a todo to display details</div>} 
        </>
        
    )
}