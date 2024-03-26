import { FC } from 'react';
import scss from './Footer.module.scss';
import { IconC } from '@/src/assets/icons';

const Footer: FC = () => {
	return (
		<>
			<footer className={scss.Footer}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.logo}>
							<h2>NURi07</h2>
							<div className={scss.texts}>
								<p>О нас</p>
								<p>Контакты</p>
							</div>
							<div className={scss.texts}>
								<p>Способы оплаты</p>
								<p>Условия доставки</p>
							</div>
							<div className={scss.texts}>
								<p>Пользовательское соглашение</p>
								<p>Политика конфиденциальности</p>
							</div>
						</div>
						<div className={scss.logoC}>
							<p>brandname.com</p>
							<IconC />
							<p>2023</p>
							<p>Все права защищены</p>
						</div>
					</div>
					<div className={scss.colorsFooter}>
						<div className={scss.yelloweer}>
							<p>Onlineshop</p>
							<p>Onlineshop</p>
						</div>
						<div className={scss.greener}>
							<p>Onlineshop</p>
							<p>Onlineshop</p>
							<p>Onlineshop</p>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};
export default Footer;
