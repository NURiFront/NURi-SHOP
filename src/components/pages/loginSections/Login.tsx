import scss from './Login.module.scss';
import { useLoginMutation } from '@/src/redux/api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type FormData = {
	email: string;
	password: string;
};

const Login = () => {
	const navigate = useNavigate();
	const [loginMutation] = useLoginMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({
		mode: 'onChange'
	});

	const loginPost = async (data: FormData) => {
		console.log(data);
		const response = await loginMutation({
			email: data.email,
			password: data.password
		});
		if ('data' in response) {
			localStorage.setItem('auth_token', response.data.token);
			navigate('/');
			reset();
		} else {
			console.error('Login failed:', response.error);
		}
	};

	return (
		<section className={scss.Login}>
			<div className="container">
				<div className={scss.content}>
					<form onSubmit={handleSubmit(loginPost)}>
						<h1 className={scss.h1}>Login</h1>
						<div className={scss.input}>
							<input
								id="email"
								type="email"
								placeholder="email"
								{...register('email', { required: true, minLength: 2 })}
							/>
							{errors.email && 'email пустой'}
						</div>
						<div>
							<input
								id="password"
								type="password"
								placeholder="password"
								{...register('password', { required: true, minLength: 2 })}
							/>
							{errors.password && 'password пустой'}
						</div>
						<button className={scss.add_order} type="submit">
							Sing In
						</button>
						<br />
						<Link to="/registration">
							<h1 className={scss.h1}>Are you don't have an account?</h1>
						</Link>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
