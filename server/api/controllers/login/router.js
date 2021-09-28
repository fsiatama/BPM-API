import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/current-user', controller.currentUser)
  .get('/log-out', controller.outLogin)
  .post('/account', controller.account);
