import React, { useEffect, useState } from 'react';
import './products.css';
import { Table, Button } from 'react-bootstrap';
import { getAll } from '../../redux/actions/products';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Banner from './productBanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../spinner/Spinner';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

const Products = ({ products, loading }) => {
	const [list, setList] = useState([]);
	const [load, setLoading] = useState(false);

    const dispatch = useDispatch();

	const fetchProducts = () => {
		dispatch(getAll());
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		if (products) {
			setList(products);
		}
	}, [products]);

    if(loading) return <Spinner />; 
	return (
		<>
			<Banner />
			<div className="container mb-5">
				<div className="row ti">
					<div className="buton">
						<Link to="/product/add">
							<Button className=" addbtn">
							 Add a product <FontAwesomeIcon icon={faArrowRight} />
							</Button>
						</Link>
					</div>
					<Table striped hover bordered variant="dark">
						<thead>
							<tr>
								<th>Title</th>
								<th>Price</th>
								<th>Stock</th>
								<th>Published Date</th>
							</tr>
						</thead>
						<tbody>
							{list ? (
								list.map((item) => (
									<tr key={item._id}>
										<td>{item.title}</td>
										<td>{item.price} €</td>
										<td>{item.stock}</td>
										<td>{new Date(item.publish_date).toLocaleDateString('en')}</td>
									</tr>
								))
							) : (
								<div className="text-center"> There is no items available!</div>
							)}
						</tbody>
					</Table>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
    products: state.products.products,
    loading: state.products.loading
});

export default connect(mapStateToProps, { getAll })(withRouter(Products));
