import express from 'express';
import DogPark from '../models/DogPark';
const router = express.Router();

router.post('/new', (request, response) => {
  const { parkName, address, city, state, zipCode } = request.body;
  const dogPark = new DogPark({
    parkName,
    address,
    city,
    state,
    zipCode,
  });

  dogPark.save();
  response.send(dogPark);
});

router.get('/:id', (request,response) => {
  DogPark.findById(request.params.id, function(error,dogPark) {
    if(error) response.status(500).send(error);
    dogPark.calculateSessions();
    dogPark.save();
    response.send(dogPark);
  })
})

export default router;
