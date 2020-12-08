import './home.css';
import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-sm-7 showcase-img">
						<img
							className="img-fluid"
							src={
								'https://image.freepik.com/free-vector/candidate-hr-manager-having-job-interview_179970-732.jpg'
							}
							alt="test"
						/>
					</div>
					<div className="col-sm-4 col2">
						<div className="ttt text-center">Home page</div>
						<div className="descc text-center">See the user's products or add any product!</div>
						<div className="btns text-center">
							<Link to="/products">
								<button className="add-product">See all the products</button>
							</Link>
							<Link to="/product/add">
								<button className="add-product">Add a product</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Home);
