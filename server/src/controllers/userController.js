const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		console.log(error);
	}
};

exports.getOneUser = async (req, res) => {
	const id = req.params.userId;
	User.findById(id)
		.then((user) => {
			res.json(user);
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.register = async (req, res) => {
	//Check if that email already exists
	const emailExists = await User.findOne({
		email: req.body.email,
	});
	if (emailExists) return res.status(400).send('Email already exists!');

	//Check if username exists
	const usernameExists = await User.findOne({
		username: req.body.username,
	});
	if (usernameExists) return res.status(400).send('Username already exists!');

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	try {
		const newUser = new User({
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
			password: hashedPassword,
			username: req.body.username,
		});

		const savedUser = await newUser.save();
		res.json({ message: 'User added', user: savedUser });
	} catch (error) {
		console.log(error);
	}
};

exports.login = async (req, res, next) => {
	const user = await User.findOne({
		username: req.body.username,
	});
	if (!user) return res.status(400).send('Username or password wrong!');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid Password!');

	res.send({
		user: user,
	});
};
