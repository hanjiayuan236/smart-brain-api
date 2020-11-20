const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'jiayuanhan',
		password : '',
		database : 'smart-brain'
	}
})

const app = express();

app.use(express.json());
app.use(cors())
// const database = {
// 	users: [
// 		{
// 			id: '123',
// 			name: 'John',
// 			email: 'john@gmail.com',
// 			password: 'cookies',
// 			entries: 0,
// 			johned: new Date()
// 		},
// 		{
// 			id: '124',
// 			name: 'Sally',
// 			email: 'sally@gmail.com',
// 			password: 'bananas',
// 			entries: 0,
// 			johned: new Date()
// 		}
// 	]
// }

app.get('/', (req, res) => {
	// res.send(database.users);
	db.select('*').from('users')
	.then(user => {
		res.send(users);
	})
	.catch(err => res.status(400).json('unable to get users'))
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json('success');
	} else {
		res.status(400).json("error loging in")
	}
	// res.json('signing');
})

app.post('/register', (req, res) => {
	const {email, name, password } = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	});
	res.json(database.users[datebased.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } =req.params;
	let found = false;
	database.users.forEach(users => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}		
	})
	if (!found) {
		res.status(404).json('no such user');
	}
})

app.put('/image', (req, res) => {
	const { id } =req.body;
	let found = false;
	database.users.forEach(users => {
		if (user.id === id) {
			found = true;
			user.entries ++;
			return res.json(user.entries);
		}		
	})
	if (!found) {
		res.status(404).json('no such user');
	}
})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})