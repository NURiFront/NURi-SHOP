import scss from './Registration.module.scss';
// import { useState } from 'react';
import { useRegistrationMutation } from '@/src/redux/api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
type FormData = {
	email: string;
	password: string;
	userName: string;
};
const Registration = () => {
	const navigate = useNavigate();
	const [registrationMutation] = useRegistrationMutation();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({
		mode: 'onChange'
	});

	const registrPost = async (data: FormData) => {
		console.log(data);
		const response = await registrationMutation({
			email: data.email,
			password: data.password,
			userName: data.userName
		});
		if ('data' in response) {
			navigate('/login');
			reset();
		} else {
			console.error('Login failed:', response.error);
		}
	};

	return (
		<section className={scss.Registration}>
			<div className="container">
				<div className={scss.content}>
					<h1>Registration</h1>
					<form onSubmit={handleSubmit(registrPost)}>
						<input
							id="email"
							type="email"
							placeholder="email"
							{...register('email', { required: true, minLength: 2 })}
						/>
						{errors.email && 'email пустой'}
						<input
							id="password"
							type="password"
							placeholder="password"
							{...register('password', { required: true, minLength: 2 })}
						/>
						{errors.password && 'password пустой'}
						<input
							id="userName"
							type="userName"
							placeholder="userName"
							{...register('userName', { required: true, minLength: 2 })}
						/>
						{errors.userName && 'password пустой'}
						<button className={scss.add_order} type="submit">
							Sing Up
						</button>
						<Link to="/login">
							<h1>Are you already have an account?</h1>
						</Link>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Registration;
