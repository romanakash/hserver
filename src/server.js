const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const { getMLHUserData } = require('./mlhApi');
const { getFormData } = require('./getFormData');
const { modifyUser } = require('./modifyUser');

const cors = require('cors');

app.use(
	cors({
		origin:
			process.env.IN_HEROKU === 'yes'
				? 'https://created-signup.herokuapp.com'
				: 'http://localhost:3000'
	})
);
app.options('*', cors());

app.use((req, res, next) => {
	const authToken = req.get('auth');

	if (authToken !== process.env.AUTH_TOKEN) {
		res.status(401).send({
			status: 'error',
			error: { message: 'Unauthorised nice try' }
		});
	} else {
		next();
	}
});

app.get('/', (req, res) => {
	res.send('Hello there');
});

app.get('/form', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..') + '/client/build/index.html');
});

app.get('/api/authorise', async (req, res) => {
	const accessToken = req.query.access_token;
	const mlh_data = await getMLHUserData(accessToken);
	const form_data = await getFormData(mlh_data.id);

	if (mlh_data) {
		res.send({ status: 'OK', mlh_data, form_data });
	} else {
		res.send({
			status: 'error',
			error: { code: 401, message: 'Authorisation error' }
		});
	}
});

app.post('/api/submit-form', async (req, res) => {
	const userData = req.body.data;
	try {
		await modifyUser(userData);
		res.send({ status: 'OK' });
	} catch (e) {
		console.log(e);
		res.send({
			status: 'error',
			error: { code: 400, message: 'Error submitting form' }
		});
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

exports.app = app;
