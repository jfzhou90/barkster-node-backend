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

router.get('/:id', (request, response) => {
  DogPark.findById(request.params.id, function(error, dogPark) {
    if (error) return response.status(500).send(error);
    if (!dogPark) return response.status(404).send({Error:"Not Found"});
    dogPark.calculateSessions().save();
    response.send(dogPark);
  });
});

router.post('/:id/checkIn', (request,response) => {
  DogPark.findById(request.params.id, function(error, doc) {
    if (error) return response.status(500).send(error);
    if (!doc) return response.status(404).send({Error:"Not Found"});
    
    doc.addSession(request.body.duration, request.body.count).calculateSessions().save();
    response.send({currentDogCount:doc.currentDogCount});
  });
})

export default router;
