const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
  origin: (origin, callback) => {
    // Only those on array(allowedOrigins) can access rest API / !origin sample: postman
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

module.exports = corsOptions