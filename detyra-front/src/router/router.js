import React from 'react';
import { BrowserRouter, Route, Router as R, Switch, withRouter } from 'react-router-dom';
//import { ConnectedRouter } from 'connected-react-router';
import Home from '../components/home/Home';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import NavBar from '../components/header/NavBar';
import AddProduct from '../components/product/addForm';
import Products from '../components/product/Products';

function Router() {
	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/product/add" component={AddProduct} />
				<Route exact path="/products" component={Products} />
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
