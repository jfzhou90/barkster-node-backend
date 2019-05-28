export default Object.freeze({
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URI,
  testMongoURI: process.env.TEST_MONGODB_URI,
})