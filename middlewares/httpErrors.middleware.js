module.exports.errorHandler = (error, req, res, next) => {
	console.error('-' * 1000);
	console.error(error);

	res.status(error.status || 500);

	const data = {};

	if (error instanceof mongoose.Error.ValidationError) {
		res.status(400);

		for (let field of Object.keys(error.errors)) {
			error.errors[field] = error.errors[field].message;
		}

		data.errors = error.errors;
	} else if (error instanceof mongoose.Error.CastError) {
		error = createError(404, 'Resource not found');
	}

	data.message = error.message;
	res.json(data);
};
