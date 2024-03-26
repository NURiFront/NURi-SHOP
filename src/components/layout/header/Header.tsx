import {
	IconHeart,
	IconLogin,
	IconLogout,
	IconOrder
} from '@/src/assets/icons';
import scss from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useState } from 'react';

const links = [
	{
		name: 'Admin',
		href: '/admin'
	}
];

const Header = () => {
	const navigate = useNavigate();
	const [modal2Open, setModal2Open] = useState(false);

	const logout = async () => {
		localStorage.removeItem('auth_token');
		navigate('/login');
	};

	return (
		<>
			<header className={scss.Header}>
				<div className="container">
					<div className={scss.content}>
						<Link to="/">
							<div className={scss.logo}>
								<h1>NURi07</h1>
							</div>
						</Link>
						<nav className={scss.nav}>
							<ul>
								{links.map((item, index) => (
									<li key={index}>
										<Link to={item.href}>{item.name}</Link>
									</li>
								))}
							</ul>
						</nav>
						<div className={scss.auth_buttons}>
							{localStorage.getItem('auth_token') ? (
								<>
									<button onClick={() => setModal2Open(true)}>
										<IconLogout />
										<p>Logout</p>
									</button>
								</>
							) : (
								<>
									<button onClick={() => navigate('/login')}>
										<IconLogin />
										<p>Войти</p>
									</button>
								</>
							)}
							<button onClick={() => navigate('/favorite')}>
								<IconHeart />
								<p>Избранные</p>
							</button>
							<button onClick={() => navigate('/basket')}>
								<IconOrder />
								<p>Корзина</p>
							</button>
						</div>
					</div>
				</div>
			</header>

			<Modal
				title="Are you sure you want to sign out?"
				centered
				open={modal2Open}
				onOk={() => {
					logout();
					setModal2Open(false);
				}}
				onCancel={() => setModal2Open(false)}
			></Modal>
		</>
	);
};

export default Header;
