'use client';
import { useState, useEffect } from "react";
import type { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/features/userSlice";
import { useRouter } from "next/navigation";

export default function Nav() {
    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState<number | null>(null);
    const [month, setMonth] = useState('');

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {user} = useSelector((state:RootState)=> state.user)

    const handleLogOut = ()=> {
        dispatch(logOut());
        router.push('/log-in');
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
            className="flex fixed top-0 left-0 w-full flex-wrap justify-between gap-[2rem] items-center py-2 px-[2rem] h-[14vh] lg-[12vh] z-[1000] bg-gray-50 shadow-md shadow-gray-100"
        >
            <div
                className="flex text-lg w-full lg:w-[70%] justify-between items-center  flex-wrap"
            >
                {user && <div
                    className="w-fit"
                >
                    <span>Welcome back</span> <span className="font-semibold uppercase">{user?.firstName}</span>
                </div>}
                {user ? <div
                    className="text-red-400 text-xl hover:underline lg:text-lg capitalize cursor-pointer w-fit"
                    onClick={()=> handleLogOut()}
                >
                    log out
                </div>: 
                <div
                    className='capitalize text-lg font-bold w-fit text-red-400'
                >
                    blizTodo
                </div>
                }
            </div>
            <div
                className="w-full lg:mt-0 lg:w-fit text-lg flex items-center"
            >
                <div
                    className="flex items-center gap-4 font-semibold"
                >
                    <span
                        className="block w-fit"
                    >
                        {day&& <span>{day}</span>}
                    </span>
                    <span
                        className="block text-blue-400 w-fit"
                    >
                        {date&&month&&year&& <span>{date}/{month}/{year.toString()}</span>}
                    </span>
                </div>

            </div>
        </div>
    )
}