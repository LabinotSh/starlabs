import React, { useEffect, useState } from 'react';
import './register.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../error/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Notifications, { notify } from 'react-notify-toast';
import { Link, withRouter } from 'react-router-dom';
import { register } from '../../redux/actions/auth';
import { connect, useDispatch } from 'react-redux';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	surname: Yup.string().required('Last name is required!'),
	username: Yup.string()
		.min(5, 'Must have at least 5 characters')
		.max(255, 'Must be shorter than 255 characters')
		.required('Username is required'),
	email: Yup.string()
		.email('Must be a valid email address')
		.max(255, 'Must be shorter than 255 characters')
		.required('Email is required'),
	password: Yup.string()
		.min(8, 'Must have at least 8 characters')
		.max(255, 'Must be shorter than 255 characters')
		.required('Password is required'),
});

const Register = ({ registering }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [added, setAdded] = useState(false);

	const dispatch = useDispatch();

	let toastColor = { background: '#6279AB', text: '#FFFFFF' };

	return (
		<div className="container">
			<Formik
				initialValues={{ name: '', surname: '', email: '', username: '', password: '' }}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(true);
					setLoading(true);
					dispatch(register(values.name, values.surname, values.email, values.username, values.password))
						.then((response) => {
							setLoading(false);
							console.log('User ' + JSON.stringify(response.data));
							setAdded(true);
							resetForm();
							notify.show(
								<div>
									Signed up successfully!
									<br />
									You can sign in now.
									<button className="btn btn-sm btn-outline-light" onClick={notify.hide}>
										X
									</button>
								</div>,
								'custom',
								-1,
								toastColor
							);
						})
						.catch((err) => {
							setLoading(false);
							setAdded(false);
							resetForm();
							console.log(err);
						});
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<>
						<Notifications options={{ top: '10px' }} />
						<div className="container-fluid">
							<div className="row no-gutters">
								<div className="col-sm-5 mt-5">
									<img
										className="img-fluid"
										src={
											'https://image.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg'
										}
									/>
								</div>
								<div className="col-sm-7 mt-2 text-center">
									<Card className="text-center c1">
										<Card.Text
											style={{
												marginBottom: '20px',
												marginTop: '30px',
												fontSize: '22px',
												color: '#1f0209',
												color: '#5e0b19 ',
											}}
										>
											<FontAwesomeIcon icon={faUser} size="2x" />{' '}
											<span style={{ marginLeft: '5px' }}> Sign up! </span>
										</Card.Text>
										<Form onSubmit={handleSubmit}>
											{/* {JSON.stringify(values)} */}
											{error ? <div className="text-danger">{error}</div> : null}
											{added ? <div className="text-success">Signed up successfully!</div> : null}
											<Form.Group controlId="formBasicNname">
												<Form.Control
													type="text"
													name="name"
													// id="name"
													placeholder="Your name"
													onClick={() => {
														if (error) setError('');
													}}
													onChange={handleChange}
													value={values.name}
													onBlur={handleBlur}
													className={touched.name && errors.name ? 'has-error' : null}
												/>
												<Error touched={touched.name} message={errors.name} />
											</Form.Group>
											<Form.Group controlId="formBasicLastName">
												<Form.Control
													type="text"
													name="surname"
													// id="name"
													placeholder="Your Last Name"
													onChange={handleChange}
													value={values.surname}
													onBlur={handleBlur}
													className={touched.surname && errors.surname ? 'has-error' : null}
												/>
												<Error touched={touched.surname} message={errors.surname} />
											</Form.Group>
											<Form.Group controlId="formBasicEmail">
												<Form.Control
													type="text"
													name="email"
													// id="name"
													placeholder="Your Email"
													onChange={handleChange}
													value={values.email}
													onBlur={handleBlur}
													className={touched.email && errors.email ? 'has-error' : null}
												/>
												<Error touched={touched.email} message={errors.email} />
											</Form.Group>
											<Form.Group controlId="formBasicUsername">
												<Form.Control
													type="text"
													name="username"
													// id="name"
													placeholder="Username"
													onClick={() => {
														if (error) setError('');
													}}
													onChange={handleChange}
													value={values.username}
													onBlur={handleBlur}
													className={touched.username && errors.username ? 'has-error' : null}
												/>
												<Error touched={touched.username} message={errors.username} />
											</Form.Group>
											<Form.Group controlId="formBasicPassword">
												<Form.Control
													type="password"
													name="password"
													// id="password"
													placeholder="Password"
													onChange={handleChange}
													value={values.password}
													onBlur={handleBlur}
													className={touched.password && errors.password ? 'has-error' : null}
												/>
												<Error touched={touched.password} message={errors.password} />
											</Form.Group>
											<div className="buton-space text-center">
												{loading && <span className="spinner-border spinner-border-sm"></span>}
												<Button className="signupBtn" type="submit" disabled={loading}>
													Sign Up
												</Button>
												{added && (
													<Link to="/login">
														<Button className="signupBtn">Log In</Button>
													</Link>
												)}
											</div>
										</Form>
									</Card>
								</div>
							</div>
						</div>
					</>
				)}
			</Formik>
		</div>
	);
};

const mapStateToProps = (state) => ({
	err: state.login.error,
	registering: state.login.registering,
});

export default connect(mapStateToProps, { register })(withRouter(Register));
