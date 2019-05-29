import mongoose from 'mongoose';
import DogPark from '../../models/DogPark';
import config from '../../config';

describe('Dog Park Model', () => {
  let park1;
  beforeAll(done => {
    mongoose.connect(config.testMongoURI, { useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    park1 = new DogPark({
      parkName: 'Park1',
      address: 'Park1 Address',
      city: 'Park1 City',
      zipCode: '12345',
      sessions: { '1800000': {[Date.now()-1800000]:2} },
    });
    park1.save(done);
  });

  afterAll(done => {
    mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done));
  });

  describe('creating new dog park', () => {
    it('create dog park successfully', done => {
      expect(park1.parkName).toBe('Park1');
      done();
    });

    it('unable to create duplicate dog park', done => {
      let park2 = DogPark({ parkName: 'Park1', address: 'Park1 Address', city: 'Park1 City' });
      park2.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error when creating duplicate dog park.');
      });
    });
  });

  describe('get current number of dogs', () => {
    it('adds new session to the dog park', done => {
      expect(park1.getCurrentNumOfDogs()).toEqual(0);
      park1.addSession('1800000', 3);
      expect(park1.getCurrentNumOfDogs()).toEqual(3);
      done();
    });
  });
});
