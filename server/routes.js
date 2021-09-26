import OSRouter from './api/controllers/os/router';

export default function routes(app) {
  app.use('/v1/os', OSRouter);
}
