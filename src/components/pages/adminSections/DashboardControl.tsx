import scss from './DashboardControl.module.scss';
import { useState } from 'react';
import {
	useDeleteProductMutation,
	useEditProductMutation,
	useGetProductsQuery,
	usePostProductMutation
} from '@/src/redux/api/product';
import { Button, Modal } from 'antd';

const DashboardControl = () => {
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [editId, setEditId] = useState<string | null>(null);
	const [modal2Open, setModal2Open] = useState(false);
	const [productNameEdit, setProductNameEdit] = useState<string>('');
	const [quantityEdit, setQuantityEdit] = useState<string | null>(null);
	const [priceEdit, setPriceEdit] = useState<string | null>(null);
	const [photoUrlEdit, setPhotoUrlEdit] = useState<string>('');
	const [productName, setProductName] = useState<string>('');
	const [quantity, setQuantity] = useState<string | null>(null);
	const [price, setPrice] = useState<string | null>(null);
	const [photoUrl, setPhotoUrl] = useState<string>('');
	const [postProductMutation] = usePostProductMutation();
	const { data, isLoading } = useGetProductsQuery();
	const [editProductMutation] = useEditProductMutation();
	const [deleteProductMutation] = useDeleteProductMutation();
	const productPost = async () => {
		await postProductMutation({
			productName,
			quantity,
			price,
			photoUrl
		});
	};
	const productEdit = async () => {
		const updateData = {
			productName: productNameEdit,
			quantity: quantityEdit,
			price: priceEdit,
			photoUrl: photoUrlEdit
		};
		await editProductMutation({ _id: editId!, updateData });
	};
	const productDelete = async () => {
		await deleteProductMutation(deleteId!);
	};
	return (
		<>
			<section className={scss.DashboardControl}>
				<div className="container">
					<div className={scss.content}>
						<Button type="primary" onClick={() => setModal2Open(true)}>
							Add Product NURi 👑
						</Button>
						<div className={scss.products}>
							{isLoading ? (
								<>
									<h1>Loading...🚀</h1>
								</>
							) : (
								<>
									{data?.map((item) => (
										<div key={item._id} className={scss.product}>
											<div className={scss.title}>
												<h1>{item.productName}</h1>
												<div className={scss.control}>
													<button
														className={scss.add_order}
														onClick={() => {
															setEditId(item._id!);
															setProductNameEdit(item.productName);
															setPhotoUrlEdit(item.photoUrl);
															setQuantityEdit(item.quantity);
															setPriceEdit(item.price);
														}}
													>
														Edit
													</button>
													<button
														className={scss.add_order}
														onClick={() => {
															setDeleteId(item._id);
														}}
													>
														Delete
													</button>
												</div>
											</div>
											<div className={scss.more_info}>
												<img src={item.photoUrl} alt={item.productName} />
												<div className={scss.quantity_price}>
													<div className={scss.quantity}>
														<h3>Запас</h3>
														<p>{item.quantity}</p>
													</div>
													<div className={scss.price}>
														<h3>Цена</h3>
														<p>{item.price}</p>
													</div>
												</div>
											</div>
										</div>
									))}
								</>
							)}
						</div>
					</div>
				</div>
			</section>
			<Modal
				title="Edit product category"
				centered
				open={modal2Open}
				onOk={() => {
					setModal2Open(false);
					productPost();
				}}
				onCancel={() => setModal2Open(false)}
			>
				<input
					type="text"
					placeholder="productName"
					value={productName}
					onChange={(e) => setProductName(e.target.value)}
				/>
				<input
					type="number"
					placeholder="quantity"
					value={'' + quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<input
					type="number"
					placeholder="price"
					value={'' + price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<input
					type="text"
					placeholder="photoUrl"
					value={photoUrl}
					onChange={(e) => setPhotoUrl(e.target.value)}
				/>
			</Modal>

			<Modal
				title="Edit product details"
				centered
				open={Boolean(editId!)}
				onOk={() => {
					setEditId(null);
					productEdit();
				}}
				onCancel={() => setEditId(null)}
			>
				<input
					type="text"
					placeholder="productName"
					value={productNameEdit}
					onChange={(e) => setProductNameEdit(e.target.value)}
				/>
				<input
					type="number"
					placeholder="quantity"
					value={'' + quantityEdit}
					onChange={(e) => setQuantityEdit(e.target.value)}
				/>
				<input
					type="number"
					placeholder="price"
					value={'' + priceEdit}
					onChange={(e) => setPriceEdit(e.target.value)}
				/>
				<input
					type="text"
					placeholder="photoUrl"
					value={photoUrlEdit}
					onChange={(e) => setPhotoUrlEdit(e.target.value)}
				/>
			</Modal>

			<Modal
				title="Are you agree to delete this position?????"
				centered
				open={Boolean(deleteId!)}
				onOk={() => {
					setDeleteId(null);
					productDelete();
				}}
				onCancel={() => setDeleteId(null)}
			></Modal>
		</>
	);
};

export default DashboardControl;
