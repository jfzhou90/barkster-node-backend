import express from 'express';
import config from './config';
import mongoose from 'mongoose';
import middlewares from './middlewares';
import routes from './routes';

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

middlewares(app);
routes(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('build'));
  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.listen(config.port, () => console.log(`Server is running on port ${config.port}.`));