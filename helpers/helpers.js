module.exports.normalizePort = (val) => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
};

module.exports.generateRandomToken = () => {
	const characters =
		'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let token = '';
	for (let i = 0; i < 25; i++) {
		token += characters[Math.floor(Math.random() * characters.length)];
	}
	return token;
};

module.exports.returnRandomSubArray = (array, amount) => {
	const randElements = [];

	for (let i = 0; i < amount; i++) {
		const randIndex = Math.floor(Math.random() * array.length);
		const randElement = array[randIndex];

		randElements.push(randElement);
	}
	return randElements;
};

module.exports.returnRandomElement = (array) => {
		const randIndex = Math.floor(Math.random() * array.length);
		const randElement = array[randIndex];

		return randElement;
};