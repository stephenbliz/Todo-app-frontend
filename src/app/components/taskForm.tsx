'use client';
import { FormEvent} from "react";
import { useDispatch, useSelector } from "react-redux";
import {postTodo, updateTodo} from '../redux/features/todoSlice'
import { setTitle, setDescription, setImageFile, setPriority, setStatus, setEditingId } from "../redux/features/todoFieldsSlice";
import { AppDispatch, RootState} from "../redux/store";
import { useRouter } from "next/navigation";

export default function TaskForm(){
    
    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    const todoFields = useSelector((state: RootState) => {
        return state.todoFields;
    });

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const todoObject = new FormData();
        todoObject.append('title', todoFields.title)
        todoObject.append('priority', todoFields.priority)
        todoObject.append('status', todoFields.status)
        todoObject.append('description', todoFields.description)
        if(todoFields.imageFile){
            todoObject.append('image', todoFields.imageFile)
        }

        if (todoFields.editingId !== null){
            todoObject.forEach((value, key) =>{
                console.log(key, ':', value);
            })
            dispatch(updateTodo({id:todoFields.editingId, update:todoObject})).then(()=>{
                dispatch(setTitle(''));
                dispatch(setEditingId(null));
            dispatch(setPriority(''));
            dispatch(setStatus(''));
            dispatch(setDescription(''));
            dispatch(setImageFile(null));
            router.push('/');
            })
        }else{
            dispatch(postTodo(todoObject)).then(()=>{
            dispatch(setTitle(''));
            dispatch(setPriority(''));
            dispatch(setStatus(''));
            dispatch(setDescription(''));
            dispatch(setImageFile(null));
            router.push('/');
        });
        }
        
    }

    return(
        <form
            className="border-2 border-gray-300 md:w-[80%] mx-auto p-4 md:p-[5%] mb-[6rem] relative"
            onSubmit={(e)=>handleSubmit(e)}
        >
            <div
                className="w-full lg:w-[60%] mb-4"
            >
                <label 
                    htmlFor="title"
                    className="font-semibold capitalize block mb-2 text-sm"
                >
                    title
                </label>
                <input 
                    type="text"
                    name="title" 
                    onChange={(e)=> dispatch(setTitle(e.target.value))}
                    value={todoFields.title}
                    id="title"
                    className="border cursor-pointer border-gray-400 w-full text-gray-500 text-sm block outline-none focus:border-blue-400 rounded-lg py-1 px-4"
                />
            </div>
            <div
                className="w-full lg:w-[60%] mb-4"
            >
                <div 
                    className="font-semibold capitalize mb-2 text-sm"
                >
                    priority
                </div>
                <div
                    className="flex flex-wrap gap-6 items-center"
                >
                    {
                        ['low', 'moderate', 'high'].map((prior)=>{
                            let radioColor = '';
                            switch(prior){
                                case 'low':
                                    radioColor = 'bg-yellow-300';
                                break;
                                case 'moderate':
                                    radioColor = 'bg-blue-300';
                                break;
                                case 'high':
                                    radioColor = 'bg-red-500';
                                break;
                                default:
                                    radioColor = 'bg-gray-400'
                            }
                            return(
                                <label 
                                    htmlFor={prior}
                                    className="flex gap-2 items-center"
                                    key={prior}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full block ${radioColor}`}></span> 
                                    <span className="capitalize text-sm">{prior}</span>
                                    <input 
                                        type="radio"
                                        name={prior} 
                                        onChange={(e)=> dispatch(setPriority(e.target.value))}
                                        value={prior}
                                        checked={todoFields.priority===prior}
                                        id={prior}
                                        className="cursor-pointer"
                                    />
                            
                                </label>
                            )
                        })
                    }
                </div>
            </div>
            <div
                className="w-full lg:w-[60%] mb-4"
            >
                <div 
                    className="font-semibold capitalize mb-2 text-sm"
                >
                    status
                </div>
                <div
                    className="flex flex-wrap gap-6 items-center"
                >
                    {
                        ['not started', 'in progress', 'completed'].map((stat)=>{
                            let statColor = '';
                            switch(stat){
                                case 'not started':
                                    statColor = 'bg-red-500';
                                break;
                                case 'in progress':
                                    statColor = 'bg-blue-600';
                                break;
                                case 'completed':
                                    statColor = 'bg-green-500';
                                break;
                                default:
                                    statColor = 'bg-gray-400'
                            }
                            return(
                                <label 
                                    htmlFor={stat}
                                    className="flex gap-2 items-center"
                                    key={stat}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full block ${statColor}`}></span> 
                                    <span className="capitalize text-sm">{stat}</span>
                                    <input 
                                        type="radio"
                                        name={stat} 
                                        onChange={(e)=> dispatch(setStatus(e.target.value))}
                                        value={stat}
                                        checked={todoFields.status===stat}
                                        id={stat}
                                        className="cursor-pointer"
                                    />
                            
                                </label>
                            )
                        })
                    }
                </div>
            </div>
            <div
                className="flex flex-wrap items-center justify-between"
            >
                <div
                    className="w-full lg:w-[60%] mb-4"
                >
                    <label 
                        htmlFor="description"
                        className="font-semibold capitalize block mb-2 text-sm"
                    >
                        task description
                    </label>
                    <textarea 
                        name="description" 
                        onChange={(e)=> dispatch(setDescription(e.target.value))}
                        value={todoFields.description}
                        id="title"
                        placeholder="Start writing here..."
                        className="border border-gray-400 cursor-pointer w-full h-[10rem] text-gray-500 text-sm block outline-none focus:border-blue-400 rounded-lg py-1 px-4"
                    />
                </div>
                <div
                    className="w-[60%] lg:w-[30%]"
                >
                    <label 
                        htmlFor="image"
                        className="font-semibold capitalize block mb-2 text-sm"
                    >
                        upload image
                    </label>
                    <input
                        type="file" 
                        name="image" 
                        accept="image/*"
                        onChange={(e)=> {
                            const file = e.target.files?.[0];
                            if(file){
                                dispatch(setImageFile(file));
                            }
                        }}
                        id="image"
                        className="border cursor-pointer border-gray-400 w-full h-[5rem] lg:h-[10rem] text-gray-500 text-sm block outline-none focus:border-blue-400 rounded-lg py-1 px-4"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="absolute -bottom-[4rem] left-[5%] w-fit bg-red-400 text-gray-300 rounded-lg px-4 py-1 capitalize cursor-pointer text-sm"
            >
                {todoFields.editingId ? 'update' : 'post'}
            </button>
        </form>
    )
}