import { useForm } from "react-hook-form";
import Input from "../ui/Input"
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as userAuthApiClient from '../../apis/auth.api';
import { useAppContext } from "../../contexts/useAppContext";

export type SignInFormData = {
    email: string;
    password: string;
}

const Login = () => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

    const { showToast } = useAppContext();

    const navigate = useNavigate();

    const mutation = useMutation(userAuthApiClient.login, {
        onSuccess: () => {
            reset({ email: '', password: '' });
            showToast({ message: 'Welcome to Kravins!', type: 'SUCCESS' });
            navigate('/');
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });

        }
    })


    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

    return (
        <form onSubmit={onSubmit}
            className='m-auto flex flex-col justify-around md:justify-between items-center w-full h-full md:h-[27rem] transition-all duration-500 pt-5'>
            <div className="w-full h-2/5 px-3 flex flex-col justify-start md:justify-between">
                <Input
                    label='Email' type='email'
                    className={`bg-transparent border-b border-gray-300 h-10 md:h-auto p-2 ${errors.email && 'border-red-500'}`}
                    {...register('email', {
                        required: 'Please enter you email', pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Please enter valid email'
                        }
                    })}
                />
                {errors.email && (<span className='text-red-500 text-xs px-3'>{errors.email.message}</span>)}
                <Input
                    label='Password' type='password'
                    labelClassName="mt-5" className="bg-transparent border-b border-gray-300 h-10 md:h-auto p-2"
                    {...register('password', { required: 'Please enter valid password' })}
                />
                {errors.password && (<span className='text-red-500 text-xs px-3'>{errors.password.message}</span>)}
            </div>
            <button
                type='submit'
                className='md:mt-4 py-3 text-md bg-tomato text-white p-2 font-bold hover:bg-tomato hover:opacity-90 rounded-3xl md:rounded-lg px-8 w-3/4 md:w-full'
            >
                Login
            </button>
        </form>
    )
}

export default Login