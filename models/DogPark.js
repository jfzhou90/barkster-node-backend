import mongoose, { Schema } from 'mongoose';

const dogParkSchema = new Schema(
  {
    parkName: { type: String, unique: true, required: true },
    address: { type: String, unique: true, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true },
    hours: Object,
    currentDogCount: { type: Number, default: 0 },
    sessions: {
      type: Object,
      default: {
        '1800000': { type: Map, of: Number },
        '3600000': { type: Map, of: Number },
        '5400000': { type: Map, of: Number },
        '7200000': { type: Map, of: Number },
      },
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

dogParkSchema.methods.getCurrentNumOfDogs = function() {
  this.calculateSessions();
  return this.currentDogCount;
};

dogParkSchema.methods.addSession = function(sessionType, incomingDogsCount) {
  if (!sessionType || !this.sessions[sessionType]) return;

  this.set(`sessions.${sessionType}.${Date.now()}`, parseInt(incomingDogsCount))
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
  this.currentDogCount = numberOfDogs;
  this.lastUpdated = Date.now();
  return this;
};

const DogPark = mongoose.model('DogPark', dogParkSchema);

export default DogPark;
