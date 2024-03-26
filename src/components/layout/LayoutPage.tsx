import scss from './LayoutPage.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import HomePage from '@/src/components/pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import ProductPage from '../pages/ProductPage';
import AdminPage from '../pages/AdminPage';
import FavoritePage from '../pages/FavoritePage';
import BasketPage from '../pages/BasketPage';

const LayoutPage = () => {
	return (
		<>
			<div className={scss.layout}>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/registration" element={<RegistrationPage />} />
						<Route path="/admin" element={<AdminPage />} />
						<Route path="/product/:productId" element={<ProductPage />} />
						<Route path="/favorite" element={<FavoritePage />} />
						<Route path="/basket" element={<BasketPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</>
	);
};
export default LayoutPage;
