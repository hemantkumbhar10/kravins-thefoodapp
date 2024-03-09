import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import { useMutation, useQueryClient } from 'react-query';
import * as userAuthApiClient from '../../apis/auth.api';
import { useAppContext } from '../../contexts/useAppContext';
import { useNavigate } from 'react-router-dom';



export type RegisterFormData = {
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string
}


const Register = () => {

    const { register, watch, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>();

    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const mutation = useMutation(userAuthApiClient.register, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken');
            reset({ firstname: '', lastname: '', username: '', email: '', password: '', confirmPassword: '' });
            showToast({ message: "Registration Successfull!", type: 'SUCCESS' });
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        }
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        mutation.mutate(data);
    })

    return (
        <form
            className='m-auto flex flex-col justify-around md:justify-between items-center w-full h-full md:h-[27rem] transition-all duration-500' onSubmit={onSubmit}>
            <div className="w-full h-2/3 px-3 flex flex-col justify-start md:justify-between">
                <Input
                    className={`bg-transparent border-b border-gray-300 h-10 md:h-5 p-2 ${errors.firstname && 'border-red-500'}`}
                    label='First name' type='text'
                    {...register('firstname', { required: 'Firstname is required!' })}
                />
                {errors.firstname && (<span className='text-red-500 text-xs px-3'>{errors.firstname.message}</span>)}
                <Input
                    className={`bg-transparent border-b border-gray-300 h-10 md:h-5 p-2 ${errors.lastname && 'border-red-500'}`}
                    label='Last Name' type='text'
                    {...register('lastname', { required: 'Lastname is required!' })}
                />
                {errors.lastname && (<span className='text-red-500 text-xs px-3'>{errors.lastname.message}</span>)}
                <Input
                    className={`bg-transparent border-b border-gray-300 h-10 md:h-5 p-2 ${errors.email && 'border-red-500'}`}
                    label='Email' type='email'
                    {...register('email', {
                        required: 'Email is required!', pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Enter valid Email ID'
                        }
                    })}
                />
                {errors.email && (<span className='text-red-500 text-xs px-3'>{errors.email.message}</span>)}
                <Input
                    className={`bg-transparent border-b border-gray-300 h-10 md:h-5 p-2 ${errors.username && 'border-red-500'}`}
                    label='Choose Yummy Username' type='text'
                    {...register('username', { required: 'Username is required!' })}
                />
                {errors.username && (<span className='text-red-500 text-xs px-3'>{errors.username.message}</span>)}
                <Input
                    className={`bg-transparent border-b border-gray-300 h-10 md:h-5 p-2 ${errors.password && 'border-red-500'}`}
                    label='Password' type='password'
                    {...register("password",
                        {
                            required: "Password is required!",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                message: "Password must be atleast 1 uppercase, 1 symbol, 1 number & more than 8 characters!"
                            }
                        })}
                />
                {errors.password && (<span className='text-red-500 text-xs px-3'>{errors.password.message}</span>)}
                <Input
                    className={`bg-transparent border-b border-gray-300 h-10 md:h-5 p-2 ${errors.confirmPassword && 'border-red-500'}`}
                    label='Confirm Password' type='password'
                    {...register("confirmPassword",
                        {
                            validate: (value) => {
                                if (!value) {
                                    return "This field is required!"
                                }
                                else if (watch("password") !== value) {
                                    return "Those passwords didn't match. Try again!"
                                }

                            }
                        }
                    )}
                />
                {errors.confirmPassword && (<span className='text-red-500 text-xs px-3'>{errors.confirmPassword.message}</span>)}
            </div>
            <button
                type='submit'
                className=' md:mt-4 py-3 text-md bg-tomato text-white p-2 font-bold hover:bg-tomato hover:opacity-90 rounded-3xl md:rounded-lg px-8 w-3/4 md:w-full'
            >
                Register
            </button>
        </form>
    )
}

export default Register;