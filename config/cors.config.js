const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: ['Content-Type'],
  credentials: true
})

module.exports = corsMiddleware