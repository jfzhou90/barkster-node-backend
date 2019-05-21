import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('*', (request,response) => {
  response.send('hello world');
})


app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))