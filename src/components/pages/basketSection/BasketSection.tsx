import { useEffect, useState } from 'react';
import scss from './BasketSection.module.scss';
import {
	useEditProductMutation,
	useGetProductsQuery
} from '@/src/redux/api/product';
import {
	useAddBasketMutation,
	useProductBuyBasketMutation
} from '@/src/redux/api/basket';
import { IconHeart, IconHeartActive } from '@/src/assets/icons';
import { Link } from 'react-router-dom';
import { useAddFavoriteMutation } from '@/src/redux/api/favorite';
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
type EditProductRequest = {
	_id: string;
	updateData: {
		productName: string;
		price: string | null;
		quantity: string | null;
		photoUrl: string;
	};
};
const BasketSection = () => {
	const [filterProducts, setFilterRoducts] = useState<GetProductsResponse[]>(
		[]
	);
	const {
		data: getProducts,
		isLoading: isLoadingProducts,
		refetch
	} = useGetProductsQuery();
	console.log(getProducts);

	const [addBasketMutation] = useAddBasketMutation();
	const [addFavoriteMutation] = useAddFavoriteMutation();
	const [editProductMutation] = useEditProductMutation();
	const [buyProductMutation] = useProductBuyBasketMutation();

	useEffect(() => {
		if (getProducts) {
			const filterData = getProducts.filter((item) => item.isInBasket === true);
			setFilterRoducts(filterData);
		}
	}, [getProducts]);

	const switchBasket = async (_id: string) => {
		await addBasketMutation(_id);
		await refetch();
	};
	const switchFavorite = async (_id: string) => {
		await addFavoriteMutation(_id);
		await refetch();
	};

	const quantityCount = async (
		data: EditProductRequest,
		quantityDelta: number
	) => {
		const updatedQuantity = +data.updateData.quantity! + quantityDelta;
		const updateData = {
			productName: data.updateData.productName,
			price: data.updateData.price,
			quantity: '' + updatedQuantity,
			photoUrl: data.updateData.photoUrl
		};
		await editProductMutation({ _id: data._id, updateData });
	};
	const buyProduct = async (_id: string, quantity: string) => {
		const buyDataQuantity = {
			_id: _id,
			newData: {
				quantityToDecrease: quantity
			}
		};
		await buyProductMutation(buyDataQuantity);
	};

	return (
		<section className={scss.BasketSection}>
			<div className="container">
				<div className={scss.content}>
					<h1 className={scss.h1}>Basket🧺</h1>
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
												<div className={scss.quantity_flex}>
													<button
														onClick={(e) => {
															e.preventDefault();
															quantityCount(
																{ _id: item._id, updateData: { ...item } },
																1
															);
														}}
													>
														+
													</button>
													<p className={scss.quantity}>
														В наличии {item.quantity}
													</p>
													<button
														onClick={(e) => {
															e.preventDefault();
															quantityCount(
																{ _id: item._id, updateData: { ...item } },
																-1
															);
														}}
													>
														-
													</button>
												</div>
												<p className={scss.price}>KGS {item.price}</p>
											</div>
											<button
												className={scss.add_order}
												onClick={(e) => {
													e.preventDefault();
													switchBasket(item._id);
												}}
											>
												Удалить из корзины
											</button>
											<button
												className={scss.add_order}
												onClick={(e) => {
													e.preventDefault();
													buyProduct(item._id, item.quantity!);
												}}
											>
												buy
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

export default BasketSection;
