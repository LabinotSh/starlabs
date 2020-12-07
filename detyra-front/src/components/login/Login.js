import React, { useEffect, useState } from 'react';
import './login.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../error/Error';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants/constants';

const validationSchema = Yup.object().shape({
	username: Yup.string()
		.min(5, 'Must have at least 4 characters')
		.max(255, 'Must be shorter than 255 characters')
		.required('Username is required'),
	password: Yup.string()
		.min(8, 'Must have at least 5 characters')
		.max(255, 'Must be shorter than 255 characters')
		.required('Password is required'),
});

const Login = () => {
	const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleLogin  = (username, password) => {
        axios.post(API_URL+'/user/login', {username, password})
        .then(response => {
            console.log('User ' + JSON.stringify(response.data))
        }).catch(err => console.log(err))
    }

	return (
		< div className="container">
			<Formik
				initialValues={{ username: '', password: '' }}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    handleLogin(values.username, values.password);
					
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<Container>
						<Row noGutters={true}>
                            {/* <Col sm={4} xs={4}></Col> */}
							<Col sm={12} md={12}>
                                
								<Card className="text-center cards two">
                                <Card className="text-center cards one">
									{/* Background Image goes here */}
									<Card.Img src={"https://image.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg"} alt="test"></Card.Img>
								</Card>
                                <div className="back" >
									<Card.Text style={{ marginBottom: '30px', fontSize: '18px' , color:'#1f0209'}}>
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
                                    </div>
                                  
								</Card>    
                                
							</Col>
						</Row>
					</Container>
				)}
			</Formik>
		</ div>
	);
};


export default Login;

