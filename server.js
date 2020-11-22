const express = require('express');
const bcrypt = require('bcrypt-nodejs');
// const bodyParser = require('body-parser');
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

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			johned: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			johned: new Date()
		}
	]

	// login: [

	// ]
}

app.get('/', (req, res) => {
	res.send(database.users);
	// db.select('*').from('users')
	// .then(user => {
	// 	res.send(users);
	// })
	// .catch(err => res.status(400).json('unable to get users'))
})

app.post('/signin', (req, res) => {
	// db.select('email', 'hash').from('login')
	// 	.where('email', '=', req.body.email)
	// 	.then(data => {
	// 		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
	// 		if (isValid) {
	// 			return db.select('*').from('users')
	// 				.where('email', '=', req.body.email)
	// 				.then(user => {
	// 				res.json(user[0])
	// 				})
	// 				.catch(err => res.status(400).json('unable to get user'))
	// 		} else {
	// 			res.status(400).json('wrong credentials')
	// 		}
	// 	})
	// 	.catch(err => res.status(400).json('wrong credentials'))

	// bcrypt.compare("cookies", "$2a$10$66DcvLJNVfysOrMBTUSnDOrIzxWS4FTVaMK2SLGNCMmy887dXeNkm", function (err, res) {
	// 	console.log("first guess", res)
	// })
	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json(database.users[0]);
		// res.json('success');
	} else {
		res.status(400).json("error loging in");
		// res.status(400).json(database.users);
		// res.status(400).json(req.body);
	}

	// res.json('signing');
})

app.post('/register', (req, res) => {
	const {email, name, password } = req.body;
	// const hash = bcrypt.hashSync(password);
	// db.transaction(trx => {
	// 	trx.insert({
	// 		hash: hash,
	// 		email: email
	// 	})
	// 	.into('login')
	// 	.returning('email')
	// 	.then(loginEmail => {
	// 		return trx('users')
	// 			.returning('*')
	// 			.insert({
	// 				email: loginEmail[0],
 //            		name: name,
 //            		joined: new Date()
	// 			})
	// 			.then(user => {
	// 				res.json(user[0]);
	// 			})
	// 	})
	// 	.then(trx.commit)
	// 	.catch(trx.rollback)
	// })
	// .catch(err => res.status(400).json('unable to register'))

	// bcrypt.hash('cookies', null, null, function(err, hash) {
	// 	console.log(hash)
	// })
	database.users.push({
		id: '125',
		name: name,
		email: email,
		// password: password,
		entries: 0,
		joined: new Date()
	});
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } =req.params;
	// db.select('*').from('users').where({id})
	// 	.then(user => {
	// 		if (user.length) {
	// 			res.json(user[0])
	// 		} else {
	// 			res.status(404).json('Not found')
	// 		}
	// 	})
	// 	.catch(err => res.status(400).json('error getting user'))

	let found = false;
	database.users.forEach(user => {
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
	// db('users').where('id', '=', id)
 //  		.increment('entries', 1)
	// 	.returning('entries')
	// 	.then(entries => {
	// 		res.json(entries[0]);
	// 	})
	// 	.catch(err => res.status(400).json('unable to get entries'));

	let found = false;
	database.users.forEach(user => {
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

app.post('/image', (req, res) => {
	const { id } =req.body;
	let found = false;
	database.users.forEach(user => {
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