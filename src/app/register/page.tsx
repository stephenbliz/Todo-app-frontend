import RegisterForm from "../components/registerForm";


export default function Register(){
    return(
        <section
            className="p-4 bg-red-400 min-h-[100vh] mt-[6rem] md:mt-[9rem] lg:mt-[4rem]"
        >
            <RegisterForm />
        </section>
    )
}