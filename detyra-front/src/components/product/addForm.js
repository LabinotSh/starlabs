import React, { Component, useState } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../error/Error';
import { Link, withRouter } from 'react-router-dom';
import './add.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';

const validationSchema = Yup.object().shape({
	title: Yup.string()
		.min(4, 'Must have at least 4 characters')
		.max(255, 'Must be shorter than 255 characters')
		.required('Title is required'),
	price: Yup.number().positive()
        .required('Price is required'),
    stock: Yup.number().positive()
     .required('Number of products in stock is required')
});


const AddProduct = () => {

    const [loading, setLoading] = useState(false);

    const addProduct = (title, price, stock) => {
        axios.post(API_URL+'/product/new', {title, price, stock})
        .then(response => {
            setLoading(false);
            console.log('added ' + JSON.stringify(response.data))
            notify.show(
                <div>
                    New product added! 
                    <button className="btn btn-sm btn-outline-light" onClick={notify.hide}>
                        Close
                    </button>
                </div>,
                'success',
                -1
            );
        }).catch(err => {
            console.log(err);
        })

    }

    return(
        < div className="container">
			<Formik
				initialValues={{ title: '', price: '', stock:'' }}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    addProduct(values.title, values.price, values.stock);
					
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<Container>
                        <Notifications />
						<Row noGutters={true}>
                            {/* <Col sm={4} xs={4}></Col> */}
							<Col sm={12} md={12}>
                                
								<Card className="text-center crd s1">
                                <Card className="text-center crd s2">
									{/* Background Image goes here */}
									<Card.Img src={"https://image.freepik.com/free-vector/news-concept-landing-page_52683-20699.jpg"} alt="test"></Card.Img>
								</Card>
                                <div className="back2" >
									<Card.Text style={{ marginBottom: '30px', fontSize: '18px' , color:'#024d94'}}>
										<FontAwesomeIcon icon={faCircle} /> Add a new product
									</Card.Text>
									<Form onSubmit={handleSubmit}>
										{/* {JSON.stringify(values)} */}
										<Form.Group controlId="formBasicTitle">
                                            <Form.Label title="Title" className="lbl">Title: </Form.Label>
											<Form.Control
												type="text"
												name="title"
												// id="name"
												placeholder="Enter the title for the product"
												onChange={handleChange}
												value={values.title}
												onBlur={handleBlur}
												className={touched.title && errors.title ? 'has-error' : null}
											/>
											<Error touched={touched.title} message={errors.title} />
										</Form.Group>
										<Form.Group controlId="formBasicPrice">
                                        <Form.Label title="Title" className="lbl">Price: </Form.Label>
											<Form.Control
												type="text"
												name="price"
												// id="password"
												placeholder="Enter the price of the product"
												onChange={handleChange}
												value={values.price}
												onBlur={handleBlur}
												className={touched.price && errors.price ? 'has-error' : null}
											/>
											<Error touched={touched.price} message={errors.price} />
										</Form.Group>
                                        <Form.Group controlId="formBasicStock">
                                        <Form.Label title="Title" className="lbl">Stock: </Form.Label>
											<Form.Control
												type="text"
												name="stock"
												// id="password"
												placeholder="Nr. of products in stock"
												onChange={handleChange}
												value={values.stock}
												onBlur={handleBlur}
												className={touched.stock && errors.stock ? 'has-error' : null}
											/>
											<Error touched={touched.stock} message={errors.stock} />
										</Form.Group>
										{loading && <span className="spinner-border spinner-border-sm"></span>}
										<Button className="addBtn" type="submit" disabled={loading}>
											Add a product
										</Button>
										<Link to="/products">
											<Button className="allProducts">
                                                <FontAwesomeIcon icon={faAlignJustify} /> View products</Button>
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
}

export default AddProduct;