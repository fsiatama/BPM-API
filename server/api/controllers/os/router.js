import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/', controller.all)
  .get('/task/:id', controller.byId)
  .post('/task-by-user', controller.byUser)
  .post('/start', controller.startOS)
  .post('/complete-task', controller.completeTask);
