import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../redux/actions/auth';
import './Navbar.css';

const user = localStorage.getItem('user');

function Navbar({ usr }) {
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const dispatch = useDispatch();

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	useEffect(() => {
		showButton();
	}, []);

	window.addEventListener('resize', showButton);

	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<div className="menu-icon" onClick={handleClick}>
						<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
					</div>
					<ul className={click ? 'nav-menu active' : 'nav-menu'}>
						<li className="nav-item">
							<Link to="/" className="nav-links" onClick={closeMobileMenu}>
								Home
							</Link>
						</li>
            <li className="nav-item">
									<Link to="/products" className="nav-links" onClick={closeMobileMenu}>
										Products
									</Link>
								</li>
						{(!user || !usr ) && (
							<>
                <li>
							<Link to="/login" className="nav-links" onClick={closeMobileMenu}>
								Login
							</Link>
						</li>
								<li>
									<Link to="/register" className="nav-links" onClick={closeMobileMenu}>
										Sign Up
									</Link>
								</li>
							</>
						)}
						{(user || usr) && (
							<li>
								<Link
									to="/login"
									className="nav-links"
									onClick={() => {
										dispatch(logout());
									}}
								>
									Log Out
								</Link>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</>
	);
}

const mapStateToProps = (state) => ({
	usr: state.login.user,
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
