import express from 'express';
import DogPark from '../models/DogPark';
const router = express.Router();

router.post('/new', (request, response) => {
  response.send({parkName: "TestPark", id:"123"});
});

export default router;