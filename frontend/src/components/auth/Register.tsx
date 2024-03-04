import { useForm } from 'react-hook-form';
import Input from '../ui/Input';


type RegisterFormData = {
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string
}


const Register = () => {

    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    })

    return (
        <form className='m-auto flex flex-col justify-between items-center w-full h-96 transition-all duration-500' onSubmit={onSubmit}>
            <div className="w-full h-2/3 px-3 flex flex-col justify-between">
                <Input label='First name' type='text' {...register('firstname', { required: 'Firstname is required!' })} />
                {errors.firstname && (<span className='text-red-500 text-xs px-3'>{errors.firstname.message}</span>)}
                <Input label='Last Name' type='text' {...register('lastname', { required: 'Lastname is required!' })} />
                {errors.lastname && (<span className='text-red-500 text-xs px-3'>{errors.lastname.message}</span>)}
                <Input label='Email' type='email' {...register('email', {
                    required: 'Email is required!', pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Enter valid Email ID'
                    }
                })} />
                {errors.email && (<span className='text-red-500 text-xs px-3'>{errors.email.message}</span>)}
                <Input label='Choose Yummy Username' type='text' {...register('username', { required: 'Username is required!' })} />
                {errors.username && (<span className='text-red-500 text-xs px-3'>{errors.username.message}</span>)}
                <Input
                    label='Password' type='password'
                    {...register("password",
                        {
                            required: "Password is required!",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                message: "Password must be atleast 1 Uppercase, 1 symbol, 1 number & more than 6 characters!"
                            }
                        })}
                />
                {errors.password && (<span className='text-red-500 text-xs px-3'>{errors.password.message}</span>)}
                <Input
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
            <button type='submit' className='mt-4 text-md bg-tomato text-white p-2 font-bold hover:bg-tomato hover:opacity-90 rounded-lg px-8 w-full'>Register</button>
        </form>
    )
}

export default Register