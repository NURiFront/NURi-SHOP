import { useGetProductsQuery } from '@/src/redux/api/product';
import scss from './FavoriteSection.module.scss';
import { useAddFavoriteMutation } from '@/src/redux/api/favorite';
import { IconHeart, IconHeartActive } from '@/src/assets/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAddBasketMutation } from '@/src/redux/api/basket';

type GetProductsResponse = {
	_id: string;
	productName: string;
	quantity: string | null;
	price: string | null;
	photoUrl: string;
	isFavorite: boolean;
	isInBasket: boolean;
	__v: number;
};

const FavoriteSection = () => {
	const [filterProducts, setFilterRoducts] = useState<GetProductsResponse[]>(
		[]
	);
	const {
		data: getProducts,
		isLoading: isLoadingProducts,
		refetch
	} = useGetProductsQuery();
	console.log(getProducts);

	const [addFavoriteMutation] = useAddFavoriteMutation();
	const [addBasketMutation] = useAddBasketMutation();

	useEffect(() => {
		if (getProducts) {
			const filterData = getProducts.filter((item) => item.isFavorite === true);
			setFilterRoducts(filterData);
		}
	}, [getProducts]);

	const switchFavorite = async (_id: string) => {
		await addFavoriteMutation(_id);
		await refetch();
	};
	const switchBasket = async (_id: string) => {
		await addBasketMutation(_id);
		await refetch();
	};

	return (
		<section className={scss.FavoriteSection}>
			<div className="container">
				<div className={scss.content}>
					<h1 className={scss.h1}>Favorite💖</h1>
					{isLoadingProducts ? (
						<>
							<h1>Loading...</h1>
						</>
					) : (
						<>
							<div className={scss.products}>
								{filterProducts?.map((item) => (
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
													switchBasket(item._id);
													addBasketMutation(item._id);
												}}
											>
												Удалить из корзины
											</button>
										</div>
									</Link>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default FavoriteSection;
