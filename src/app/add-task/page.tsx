import Link from "next/link";
import TaskForm from "../components/taskForm";


export default function AddTask () {

    return (
        <section 
            className="py-2 px-2 lg:px-[2rem] mt-[9rem] md:mt-[12rem] lg:mt-[6rem]"
        >
            <div
                className=" text-lg flex justify-between md:w-[80%] mx-auto items-center mb-8"
            >
                <h1
                    className='font-semibold capitalize w-fit'
                >
                <span>add new task</span>

                <span
                    className='border-b-2 border-red-400 block mt-0.5 w-[6rem]'
                ></span>
                </h1>
                <Link
                    className="w-fit text-black px-2 py-1 capitalize underline font-semibold"
                    href='/'
                >
                    go back
                </Link>
            </div>
            <TaskForm />
        </section>
    )
}