'use client';
import Image from "next/image";
import { handlePriorityColor, handleStatusColor } from "../utils/functions";
import { TodoProps } from "../utils/types";
import { useRouter } from "next/navigation";
import { DateFormat } from "./dateFormat";

export default function Todo ({myTodos, setId, hasMounted}: TodoProps) {
    const router = useRouter();

    return(
        <>
        {
            myTodos?.map((mytodo)=>{
                console.log(mytodo);
                const priority = mytodo.priority!;
                const status = mytodo.status!;
                const priorityColor = handlePriorityColor(priority);
                const statusColor = handleStatusColor(status);

                const handleClick = () => {
                    if(!hasMounted) return;

                    if(window.innerWidth<768){
                        router.push(`/detail/${mytodo._id}`);
                    }else{
                        setId(mytodo._id);
                    }
                }
                

                let statusColorBorder =  '';

                switch(mytodo.status){
                    case 'not started':
                        statusColorBorder = 'border-red-500';
                    break;
                    case 'in progress':
                        statusColorBorder = 'border-blue-600';
                    break;
                    case 'completed':
                        statusColorBorder = 'border-green-500';
                    break;
                    default:
                        statusColorBorder = 'border-gray-500';
                }


                return(
                    <div
                        className="border border-gray-400 rounded-xl cursor-pointer p-2 mb-2"
                        key={mytodo._id}
                        onClick={handleClick}
                    >
                        <div
                            className="flex relative justify-between items-start"
                        >
                            <div
                                className="w-[5%] mt-1"
                            >
                                <div
                                    className={`w-[1rem] h-[1rem] rounded-full border-2 ${statusColorBorder}`}
                                ></div>
                            </div>
                            <div
                                className="w-[60%]"
                            >
                                <h3
                                    className="text-[1rem] font-semibold capitalize mb-2"    
                                >
                                    {mytodo.title}
                                </h3>
                                <p
                                    className="text-sm md:text-xl lg:text-sm text-gray-500 mb-4"
                                >
                                    {mytodo.description.substring(0, 100)}
                                </p>
                                <div
                                    className="flex w-[60%] gap-2 items-center absolute bottom-0 left-[7%] text-[0.8rem] md:text-xl lg:text-[0.8rem]"
                                >
                                    <div
                                        className="w-fit capitalize"
                                    >
                                        <span>priority: <span className={`${priorityColor}`}>{mytodo.priority}</span></span>
                                        
                                    </div>
                                    <div
                                        className="w-fit capitalize "
                                    >
                                        <span>status: <span className={`${statusColor}`}>{mytodo.status}</span></span>
                                        
                                    </div>
                                </div>
                            </div>
                            <div
                                className="w-[30%] relative"
                            >
                                <Image 
                                    src={mytodo.image? mytodo.image : '/assets/myPhoto.jpg'}
                                    alt="Todo image"
                                    width={50}
                                    height={50}
                                    className="w-full mb-4 rounded-xl mt-8"
                                />
                                <div
                                    className="text-gray-500 text-[0.8rem] md:text-xl lg:text-[0.8rem]"
                                >
                                    Created {DateFormat(mytodo.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                )

                
            })
        }
        
        </>
    )
}