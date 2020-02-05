const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

const { getMLHUserData } = require('./mlhApi');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello there');
});

app.get('/form', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..') + '/client/build/index.html');
});

app.get('/api/authorise', async (req, res) => {
	const accessToken = req.query.access_token;
	const userData = await getMLHUserData(accessToken);

	if (userData) {
		res.send(userData);
	} else {
		res.send({
			status: 'error',
			error: { code: 401, message: 'Authorisation error' }
		});
	}
});

app.get('/api/submit-form', async (req, res) => {
	const userData = req.body;
	try {
		await addUser(userData);
	} catch (e) {
		console.log(e);
		res.send({
			status: 'error',
			error: { code: 400, message: 'Error submitting form' }
		});
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const { addUser } = require('./addUser');

exports.app = app;
