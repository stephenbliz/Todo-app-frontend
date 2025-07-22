'use client';
import { useState, ChangeEvent, FormEvent } from "react"
import Link from 'next/link';

export default function RegisterForm(){
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [surname, setSurname] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('');

    const forms = [
        {name: 'firstName', type: 'text', icon: 'icon', value: firstName, onchange: (e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value), placeholder: 'Enter first name *', id: 1},
        {name: 'middleName', type: 'text', icon: 'icon', value: middleName, onchange: (e: ChangeEvent<HTMLInputElement>) => setMiddleName(e.target.value), placeholder: 'Enter middle name', id: 2},
        {name: 'surname', type: 'text', icon: 'icon', value: surname, onchange: (e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value), placeholder: 'Enter surname *', id: 3},
        {name: 'email', type: 'email', icon: 'icon', value: email, onchange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), placeholder: 'Enter email *', id: 4},
        {name: 'password', type: 'password', icon: 'icon', value: password, onchange: (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), placeholder: 'Enter password *', id: 5},
        {name: 'confirmPassword', type: 'password', icon: 'icon', value: confirmPassword, onchange: (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value), placeholder: 'Enter confirm password *', id: 6},
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(firstName)
        console.log(middleName)
        console.log(surname)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
    }
    return(
        <form
            className="w-full md:w-[80%] lg:w-[50%] mx-auto bg-white rounded-xl p-4"
            onSubmit={(e)=>handleSubmit(e)}
        >
            <h1
                className="capitalize text-lg md:text-2xl font-semibold mb-8"
            >
                sign up
            </h1>
            {
                forms.map(form => (
                    <div
                        className="relative mb-2"
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
                            required={form.name === 'middleName'? false : true}
                            onChange={form.onchange}
                            placeholder={form.placeholder}
                            className="py-2 block px-[3.5rem] border w-full border-gray-300 rounded-xl outline-0 focus:border-red-400" 
                        />
                    </div>
                ))
            }
            <div
                className="relative mb-2"
            >
                <label 
                    htmlFor="image"
                    className="absolute top-2 left-4"
                >
                    icon
                </label>
                <input 
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e)=>{
                        const files = e.target.files;
                        if(files){
                            setImage(files[1]);
                        }
                    }}
                    className="py-2 block px-[3.5rem] border w-full md:w-[50%] lg:w-[60%] h-[2.7rem] border-gray-300 rounded-xl outline-0 focus:border-red-400" 
                />
            </div>
            <button
                className="w-fit bg-red-400 mb-4 text-gray-300 rounded-lg px-4 py-2 capitalize cursor-pointer text-sm"
                type="submit"
            >
                register
            </button>
            <div
                className="flex justify-start gap-2 items-center"
            >
                <span
                    className="w-fit"
                >
                    Already have an account?
                </span>
                <Link
                    href='/login'
                    className="capitalize text-blue-700 w-fit"
                >
                    sign in
                </Link>
            </div>
        </form>
    )
}