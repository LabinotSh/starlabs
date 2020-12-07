import './home.css';
import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<div className="container content">
				<div className="col-sm-9 showcase-img">
					{/* <div className="circle"></div> */}
					<Card className="text-center ">
						{/* Background Image goes here */}
						<Card.Img
							src={
								'https://image.freepik.com/free-vector/candidate-hr-manager-having-job-interview_179970-732.jpg'
							}
							alt="test"
						></Card.Img>
					</Card>
				</div>
				<div className="col-3 col2">
					<div className="ttt">Home page</div>
					<div className="descc">See the user's products or add any product!</div>
					<div className="btns">
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
	);
};

export default Home;
