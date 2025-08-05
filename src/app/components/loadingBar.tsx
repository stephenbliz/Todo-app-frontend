'use client';
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function LoadingBar(){
    const pathName = usePathname();

    useEffect(()=>{
        NProgress.start();

        const timeOut = setTimeout(()=>{
            NProgress.done();
        }, 500)

        return () => {
            clearTimeout(timeOut);
        }

    }, [pathName])
    
    return null;
}