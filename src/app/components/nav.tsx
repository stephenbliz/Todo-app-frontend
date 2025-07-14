'use client';
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlineBell } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";

export default function Nav() {
    const [searchTask, setSearchTask] = useState('');
    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState<number | null>(null);
    const [month, setMonth] = useState('');

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(searchTask, ': Search form submited');
        setSearchTask('');
    }

    const handleDate = ()=> {
        const date = new Date();

        const year = date.getFullYear();
        setYear(year);

        const datee = date.getDate();
        if(datee < 10) {
            setDate(`0${datee.toString()}`);
        }else{
            setDate(datee.toString());
        }
        
        let day = '';
        switch (date.getDay()) {
            case 0:
                day = 'Sunday';
            break;
            case 1:
                day = 'Monday';
            break;
            case 2:
                day = 'Tuesday';
            break;
            case 3:
                day = 'Wednesday';
            break;
            case 4:
                day = 'Thursday';
            break;
            case 5:
                day = 'Friday';
            break;
            case 6:
                day = 'Saturday';
            break;
            default:
                day = 'Error...';
        }
        setDay(day);

        let month = null;
        switch (date.getMonth()) {
            case 0:
                month = '01';
            break;
            case 1:
                month = '02';
            break;
            case 2:
                month = '03';
            break;
            case 3:
                month = '04';
            break;
            case 4:
                month = '05';
            break;
            case 5:
                month = '06';
            break;
            case 6:
                month = '07';
            break;
            case 7:
                month = '08';
            break;
            case 8:
                month = '09';
            break;
            case 9:
                month = '10';
            break;
            case 10:
                month = '11';
            break;
            case 11:
                month = '12';
            break;
            default:
                month = 'Error'
        }

        setMonth(month)
    }

    useEffect(()=>{
        handleDate();
    }, [])

    return (
        <div
            className="flex flex-wrap justify-between items-center py-2 px-[2rem] h-full bg-gray-50 shadow-md shadow-gray-100"
        >
            <form
                className="relative w-full lg:w-[65%] bg-white rounded-lg"
                onSubmit={(e)=>handleSubmit(e)}
            >
                <input 
                    type="text" 
                    placeholder="Search your task here..."
                    value={searchTask}
                    onChange={(e)=> setSearchTask(e.target.value)}
                    className="px-2 py-2 outline-none border border-white w-full rounded-lg text-xs shadow-xl shadow-gray-100"
                />
                <button
                    type="submit"
                    className="absolute right-0 top-0 bg-red-400 h-full px-2 border border-red-400 cursor-pointer rounded-lg text-gray-200"
                >
                    <CiSearch />
                </button>
            </form>
            <div
                className="w-full mt-2 lg:mt-0 lg:w-[30%] flex gap-[20%] items-center"
            >
                <div
                    className="flex gap-[1rem] items-center w-[30%]"
                >
                    <div
                        className=" w-fit bg-red-400 h-full p-2 border border-red-400 cursor-pointer rounded-lg text-gray-200"
                    >
                        <AiOutlineBell />
                    </div>
                    <div
                        className=" w-fit bg-red-400 h-full p-2 border border-red-400 cursor-pointer rounded-lg text-gray-200"
                    >
                        <SlCalender />
                    </div>
                </div>
                <div
                    className="w-[50%] text-sm font-semibold"
                >
                    <span
                        className="block"
                    >
                        {day&& <span>{day}</span>}
                    </span>
                    <span
                        className="block text-blue-400"
                    >
                        {date&&month&&year&& <span>{date}/{month}/{year.toString()}</span>}
                    </span>
                </div>

            </div>
        </div>
    )
}