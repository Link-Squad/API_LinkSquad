const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

mongoose
	.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.info(`Established connection to the database on ${DB_URI}`))
	.catch(error => console.error('Database connection unsuccesful', error));

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.info('Closing mongoose connection on app termination');
		process.exit(0);
	});
});
