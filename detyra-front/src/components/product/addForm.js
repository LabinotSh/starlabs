import React, { Component, useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../error/Error';
import { Link, withRouter } from 'react-router-dom';
import './add.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';
import Notifications, { notify } from 'react-notify-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addProduct } from '../../redux/actions/products';
import { connect, useDispatch } from 'react-redux';

const validationSchema = Yup.object().shape({
	title: Yup.string()
		.min(4, 'Must have at least 4 characters')
		.max(255, 'Must be shorter than 255 characters')
		.required('Title is required'),
	price: Yup.number().positive().required('Price is required'),
	stock: Yup.number().positive().required('Number of products in stock is required'),
	date: Yup.date().required('Publish Date is required!'),
});

const AddProduct = ({ err, add }) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (add) {
			setSuccess(add);
			setTimeout(() => {
				setSuccess(false);
			}, 5000);
		} else {
			setSuccess(false);
		}
	}, [add]);

	useEffect(() => {
		if (err) {
			setError(err);
			setTimeout(() => {
				setError('');
			}, 5000);
		} else {
			setError('');
		}
	}, [err]);

	return (
		<>
			<Formik
				initialValues={{ title: '', price: '', stock: '', date: new Date() }}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(true);
					setLoading(true);
					dispatch(addProduct(values.title, values.price, values.stock, values.date))
						.then((response) => {
							console.log(JSON.stringify(response.data));
							setLoading(false);
							console.log('added ' + JSON.stringify(response.data));
							notify.show(
								<div>
									New product added!
									<button className="btn btn-sm btn-outline-light" onClick={notify.hide}>
										X
									</button>
								</div>,
								'success',
								-1
							);
							setTimeout(() => {
								resetForm();
							}, 2500);
						})
						.catch((error) => {
							console.log(error);
							setLoading(false);
							setTimeout(() => {
								resetForm();
							}, 3000);
						});
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
					<>
						<Notifications options={{ top: '10px' }} />
						<div className="container-fluid">
							<div className="row mb-5">
								<div className="col-5">
									<img
										className="img-fluid"
										src={
											'https://image.freepik.com/free-vector/news-concept-landing-page_52683-20699.jpg'
										}
										alt="test"
									/>
								</div>
								<div className="col-7">
									<Card className="text-center crd s1">
										<Card.Text style={{ marginBottom: '30px', fontSize: '18px', color: '#024d94' }}>
											<FontAwesomeIcon icon={faCircle} /> Add a new product
										</Card.Text>
										{error && <Card.Text className="text-danger">{error}</Card.Text>}
										{success && (
											<Card.Text className="text-success">
												<FontAwesomeIcon icon={faCheck} /> Product added in the product list!
											</Card.Text>
										)}
										<Form onSubmit={handleSubmit}>
											<Form.Group controlId="formBasicTitle">
												<Form.Control
													type="text"
													name="title"
													placeholder="Enter the title for the product"
													onChange={handleChange}
													value={values.title}
													onBlur={handleBlur}
													className={touched.title && errors.title ? 'has-error' : null}
												/>
												<Error touched={touched.title} message={errors.title} />
											</Form.Group>
											<Form.Group controlId="formBasicPrice">
												<Form.Control
													type="text"
													name="price"
													placeholder="Enter the price of the product"
													onChange={handleChange}
													value={values.price}
													onBlur={handleBlur}
													className={touched.price && errors.price ? 'has-error' : null}
												/>
												<Error touched={touched.price} message={errors.price} />
											</Form.Group>
											<Form.Group controlId="formBasicStock">
												<Form.Control
													type="text"
													name="stock"
													placeholder="Nr. of products in stock"
													onChange={handleChange}
													value={values.stock}
													onBlur={handleBlur}
													className={touched.stock && errors.stock ? 'has-error' : null}
												/>
												<Error touched={touched.stock} message={errors.stock} />
											</Form.Group>
											<Form.Group>
												<Form.Label title="Title" className="lbl">
													Publish Date:{' '}
												</Form.Label>
												<DatePicker
													name="date"
													dateFormat="d MMMM, yyyy"
													selected={values.date}
													onChange={(date) => setFieldValue('date', date)}
													className={touched.date && errors.date ? 'has-error' : null}
												/>
												<Error touched={touched.date} message={errors.date} />
											</Form.Group>
											{loading && <span className="spinner-border spinner-border-sm"></span>}
											<Button className="addBtn" type="submit" disabled={loading}>
												Add a product
											</Button>
											<Link to="/products">
												<Button className="allProducts">
													<FontAwesomeIcon icon={faAlignJustify} /> View products
												</Button>
											</Link>
										</Form>
									</Card>
								</div>
							</div>
						</div>
					</>
				)}
			</Formik>
		</>
	);
};

const mapStateToProps = (state) => ({
	err: state.products.error,
	add: state.products.added,
});

export default connect(mapStateToProps, { addProduct })(withRouter(AddProduct));
