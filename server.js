import express from 'express';
import config from './config';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

app.get('*', (request, response) => {
  response.send('hello world');
});

app.listen(config.port, () => console.log(`Server is running on port ${config.port}.`));