import ParkRoutes from './parkRoutes';

export default (app) => {
  app.use('/api/parks', ParkRoutes);
};
