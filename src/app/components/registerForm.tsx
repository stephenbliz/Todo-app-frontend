'use client';
import { useState, ChangeEvent, FormEvent } from "react"
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { register } from "../redux/features/userSlice";
import { MdPerson } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaImage } from "react-icons/fa";


export default function RegisterForm(){

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [surname, setSurname] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const {loading} = useSelector((state: RootState) => state.user);

    const forms = [
        {name: 'firstName', type: 'text', icon: <MdPerson />, value: firstName, onchange: (e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value), placeholder: 'Enter first name *', id: 1},
        {name: 'middleName', type: 'text', icon: <MdPerson />, value: middleName, onchange: (e: ChangeEvent<HTMLInputElement>) => setMiddleName(e.target.value), placeholder: 'Enter middle name', id: 2},
        {name: 'surname', type: 'text', icon:<MdPerson />, value: surname, onchange: (e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value), placeholder: 'Enter surname *', id: 3},
        {name: 'email', type: 'email', icon: <MdEmail />, value: email, onchange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), placeholder: 'Enter email *', id: 4},
        {name: 'password', type: 'password', icon: <MdLock />, value: password, onchange: (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), placeholder: 'Enter password *', id: 5},
        {name: 'confirmPassword', type: 'password', icon: <MdLockOutline />, value: confirmPassword, onchange: (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value), placeholder: 'Enter confirm password *', id: 6},
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const registerObject = new FormData();
        registerObject.append('firstName', firstName);
        registerObject.append('middleName', middleName);
        registerObject.append('surname', surname);
        registerObject.append('email', email);
        registerObject.append('tag', 'user');
        registerObject.append('password', password);
        if(image){
            registerObject.append('image', image);
        }

        if(password!==confirmPassword){
            setError('Password mismatch. Please use matching passwords');
            setPassword('');
            setConfirmPassword('');
            return;
        }

        setError('');

        dispatch(register(registerObject)).then((result)=>{
            if(result.payload){
                setConfirmPassword('');
                setEmail('');
                setImage(null);
                setFirstName('');
                setError('');
                setPassword('');
                setSurname('');
                setMiddleName('');
                alert('Registration successfull, log in to continue.');
                setTimeout(()=>{
                    router.push('/log-in');
                }, 1000);
            }else{
                throw new Error('Something went wrong');
            }
            
        }).catch((er)=>{
            alert(er);
            setError(er)
        })
    }


    return(
        <form
            className="w-full md:w-[80%] lg:w-[50%] mx-auto mt-[3.5rem] bg-white rounded-xl p-4"
            onSubmit={(e)=>handleSubmit(e)}
        >
            <h1
                className="capitalize text-xl md:text-2xl font-semibold mb-8"
            >
                sign up
            </h1>
            {
                forms.map(form => (
                    <div
                        className="relative mb-4"
                        key={form.id}
                    >
                        <label 
                            htmlFor={form.name}
                            className="absolute top-3.5 left-4 "
                        >
                            {form.icon}
                        </label>
                        <input 
                            type={form.type}
                            name={form.name}
                            id={form.name}
                            value={form.value}
                            required={form.name === 'middleName'? false : true}
                            onChange={form.onchange}
                            placeholder={form.placeholder}
                            className="py-2 block px-[3rem] border w-full border-gray-300 rounded-xl outline-0 focus:border-red-400" 
                        />
                    </div>
                ))
            }
            <div
                className="relative mb-4"
            >
                <label 
                    htmlFor="image"
                    className="absolute top-3.5 left-4"
                >
                    <FaImage />
                </label>
                <input 
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e)=>{
                        const files = e.target.files;
                        if(files){
                            setImage(files[0]);
                        }
                    }}
                    className="py-2 block px-[3.5rem] border w-full md:w-[50%] lg:w-[60%] h-[2.7rem] border-gray-300 rounded-xl outline-0 focus:border-red-400" 
                />
            </div>
            {
                error && 
                <div
                    className="text-red-600 mb-4"
                >
                    {error}
                </div>
            }
            <button
                className="w-fit bg-red-400 mb-4 text-gray-300 rounded-lg px-4 py-2 capitalize cursor-pointer"
                type="submit"
                disabled={loading}
            >
                {loading ? 'registering': 'register' }
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
                    href='/log-in'
                    className="capitalize text-blue-700 w-fit"
                >
                    sign in
                </Link>
            </div>
        </form>
    )
}