import Input from "../ui/Input"

const Login = () => {
    return (
        <form className='m-auto flex flex-col justify-around md:justify-between items-center w-full h-full md:h-[27rem] transition-all duration-500 pt-5'>
            <div className="w-full h-2/5 px-3 flex flex-col justify-start md:justify-between">
                <Input label='Email' type='email'  className="bg-transparent border-b border-gray-300 h-10 md:h-auto p-2"/>
                <Input label='Password' type='password' labelClassName="mt-5" className="bg-transparent border-b border-gray-300 h-10 md:h-auto p-2"/>
            </div>
            <button type='submit' className='md:mt-4 py-3 text-md bg-tomato text-white p-2 font-bold hover:bg-tomato hover:opacity-90 rounded-3xl md:rounded-lg px-8 w-3/4 md:w-full'>Login</button>
        </form>
    )
}

export default Login