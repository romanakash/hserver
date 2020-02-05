const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

const { getMLHUserData } = require('./mlhApi');
const { getFormData } = require('./getFormData');
const { modifyUser } = require('./modifyUser');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true
	})
);

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
	console.log(userData);
	try {
		await modifyUser(userData);
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
