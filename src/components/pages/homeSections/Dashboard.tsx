import scss from './Dashboard.module.scss';
import { useGetProductsQuery } from '@/src/redux/api/product';
import { Link } from 'react-router-dom';
// import { IconHeart } from '@/src/assets/icons';
import { useAddFavoriteMutation } from '@/src/redux/api/favorite';
import { IconHeart, IconHeartActive } from '@/src/assets/icons';
import { useAddBasketMutation } from '@/src/redux/api/basket';

const Dashboard = () => {
	const {
		data: getProducts,
		isLoading: isLoadingProducts,
		refetch
	} = useGetProductsQuery();
	console.log(getProducts);

	const [addFavoriteMutation] = useAddFavoriteMutation();
	const [addBasketMutation] = useAddBasketMutation();

	const switchFavorite = async (_id: string) => {
		await addFavoriteMutation(_id);
		await refetch();
	};
	const switchBasket = async (_id: string) => {
		await addBasketMutation(_id);
		await refetch();
	};
	return (
		<>
			<div className={scss.Dashboard}>
				<div className="container">
					<div className={scss.content}>
						<h1>Welcome Developer!</h1>
						{isLoadingProducts ? (
							<h1>Loading...</h1>
						) : (
							<>
								<div className={scss.products}>
									{getProducts?.map((item) => (
										<Link key={item._id} to={`/product/${item._id}`}>
											<div className={scss.product}>
												<img src={item.photoUrl} alt={item.productName} />
												<div className={scss.productName_favourites}>
													<h1>{item.productName}</h1>
													<button
														className={scss.favourites}
														onClick={(e) => {
															e.preventDefault();
															// addFavoriteMutation(item._id);
															switchFavorite(item._id);
															// refetch();
														}}
													>
														{/* <IconHeartActive /> */}

														{item.isFavorite ? (
															<IconHeartActive />
														) : (
															<IconHeart />
														)}
													</button>
												</div>
												<div className={scss.quantity_price}>
													<p className={scss.quantity}>
														В наличии {item.quantity}
													</p>
													<p className={scss.price}>KGS {item.price}</p>
												</div>
												<button
													className={scss.add_order}
													onClick={(e) => {
														e.preventDefault();
														// addBasketMutation(item._id);
														switchBasket(item._id);
													}}
												>
													{item.isInBasket
														? 'Удалить из корзины'
														: 'Добавить в корзину'}
												</button>
											</div>
										</Link>
									))}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
