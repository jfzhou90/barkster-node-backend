import mongoose, { Schema } from 'mongoose';

const dogParkSchema = new Schema({
  parkName: { type: String, unique: true, required: true },
  address: { type: String, unique: true, required: true },
  city: { type: String, required: true },
  zipCode: {type: Number, required: true},
  hours: Object,
  numberOfDogsInPark: { type: Number, default: 0 },
  dateCreated: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  sessions: {
    '1800000': { type: Object, default: {} },
    '3600000': { type: Object, default: {} },
    '5400000': { type: Object, default: {} },
    '7200000': { type: Object, default: {} },
  },
});

dogParkSchema.methods.getCurrentNumOfDogs = function() {
  this.calculateSessions();
  return this.numberOfDogsInPark;
};

dogParkSchema.methods.addSession = function(sessionType, incomingDogsCount) {
  if (!sessionType || !this.sessions[sessionType]) return;

  this.sessions[sessionType][Date.now()] = incomingDogsCount;
  return this;
};

dogParkSchema.methods.calculateSessions = function() {
  let numberOfDogs = 0;
  Object.keys(this.sessions).forEach(duration => {
    const sessions = this.sessions[duration];
    Object.keys(sessions).forEach(session => {
      Date.now() - session >= duration
        ? delete sessions[session]
        : (numberOfDogs += sessions[session]);
    });
  });
  this.numberOfDogsInPark = numberOfDogs;
};

const DogPark = mongoose.model('DogPark', dogParkSchema);

export default DogPark;
