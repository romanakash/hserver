const axios = require(axios);

const mlhApi = axios.create({
	baseURL: 'https://my.mlh.io/api/v2/'
});

async function getMLHUserData(accessToken) {
	try {
		const res = mlhApi.get('/user.json', {
			params: { access_token: accessToken }
		});
	} catch (e) {
		console.log(e);
	}
}
