import LogInForm from "../components/loginForm";

export default function LogIn(){
    return(
        <section
            className="p-4 bg-red-400 h-[100vh] mt-[6rem] md:mt-[9rem] lg:mt-[4rem]"
        >
            <LogInForm />
        </section>
    )
}