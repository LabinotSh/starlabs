import React, { useEffect, useState } from 'react';
import './login.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../error/Error';
import { Link, Redirect, withRouter } from 'react-router-dom';
import {login} from '../../redux/actions/auth';
import { connect, useDispatch } from 'react-redux';

const validationSchema = Yup.object().shape({
	username: Yup.string()
		.min(5, 'Must have at least 5 characters')
		.max(255, 'Must be shorter than 255 characters')
		.required('Username is required'),
	password: Yup.string()
		.min(8, 'Must have at least 8 characters')
		.max(255, 'Must be shorter than 255 characters')
		.required('Password is required'),
});

const Login = ({err, loggedIn}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	
	const dispatch = useDispatch();
    
	return (
		< div className="container">
			<Formik
				initialValues={{ username: '', password: '' }}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
					// handleLogin(values.username, values.password);
					dispatch(login(values.username, values.password))
						.then((response) => {
							console.log('alaa ' + JSON.stringify(response.user));
							setSubmitting(true);
							setLoading(false);
							setError('');
						})
						.catch((error) => {
							resetForm();
							console.log('Error: ' + error);
							setSubmitting(false);
							setError(err);
							setLoading(false);
						});		
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<div className="container-fluid">
						<div className="row no-gutters">
							<div className="col-6 float-left">
								<img
									className="img-fluid"
									src={"https://image.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg"}
									alt="test"
								/>
							</div>
							<div className="col-6">
								<Card className="text-center cards two">	
                                {/* <div className="backLogin" > */}
									<Card.Text style={{ marginBottom: '30px', fontSize: '18px' , color:'#064d9e '}}>
										Enter your credentials to sign in!
									</Card.Text>
									<Form onSubmit={handleSubmit}>
										{/* {JSON.stringify(values)} */}
										{error ? <div className="text-danger">{error}</div> : null}
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
										{loading && <span className="spinner-border spinner-border-sm"></span>}
										<Button className="logInBtn" type="submit" disabled={loading}>
											Sign In
										</Button>
										<Link to="/register">
											<Button className="registerBtn">Create an account</Button>
										</Link>          
									</Form>
								</Card>              
							</div>
						</div>
					</div>
				)}
			</Formik>
		</ div>
	);
};

const mapStateToProps = (state) => ({
	loggedIn: state.login.isLoggedIn,
	err: state.login.error,
});

export default connect(mapStateToProps, {login})(withRouter(Login));

