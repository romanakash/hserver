const axios = require('axios');

const mlhApi = axios.create({
	baseURL: 'https://my.mlh.io/api/v2/'
});

async function getMLHUserData(accessToken) {
	try {
		const res = await mlhApi.get('/user.json', {
			params: { access_token: accessToken }
		});

		if (res.data.status === 'OK') {
			return res.data.data;
		} else {
			return null;
		}
	} catch (e) {
		console.log(e);
	}
}

exports.getMLHUserData = getMLHUserData;
