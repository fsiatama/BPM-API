import OSRouter from './api/controllers/os/router';
import LoginRouter from './api/controllers/login/router';

export default function routes(app) {
  app.use('/v1/os', OSRouter);
  app.use('/v1/login', LoginRouter);
}
