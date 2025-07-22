'use client';
import { useState, ChangeEvent } from "react";
import Link from "next/link";

export default function LogInForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const forms = [
        {name: 'email', type: 'email', icon: 'icon', value: email, onchange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), placeholder: 'Enter email', id: 1},
        {name: 'password', type: 'password', icon: 'icon', value: password, onchange: (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), placeholder: 'Enter password', id: 2},
    ]

    return(
        <form
            className="w-full md:w-[80%] lg:w-[50%] mx-auto bg-white rounded-xl p-4"
        >
            <h1
                className="capitalize text-lg md:text-2xl font-semibold mb-8"
            >
                sign in
            </h1>
            {
                forms.map(form => (
                    <div
                        className="relative mb-4"
                        key={form.id}
                    >
                        <label 
                            htmlFor={form.name}
                            className="absolute top-2 left-4"
                        >
                            {form.icon}
                        </label>
                        <input 
                            type={form.type}
                            name={form.name}
                            id={form.name}
                            value={`${form.value}`}
                            required
                            onChange={form.onchange}
                            placeholder={form.placeholder}
                            className="py-2 block px-[3.5rem] border w-full border-gray-300 rounded-xl outline-0 focus:border-red-400" 
                        />
                    </div>
                ))
            }
            <button
                className="w-fit bg-red-400 mb-4 text-gray-300 rounded-lg px-4 py-2 capitalize cursor-pointer text-sm"
                type="submit"
            >
                logIn
            </button>
            <div
                className="flex justify-start gap-2 items-center"
            >
                <span
                    className="w-fit"
                >
                    Don't have an account?
                </span>
                <Link
                    href='/register'
                    className="capitalize text-blue-700 w-fit"
                >
                    create one
                </Link>
            </div>
        </form>
    )
}