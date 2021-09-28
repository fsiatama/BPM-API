import l from '../../../common/logger';

import OSService from '../../services/os/os.service';

export class Controller {
  all(req, res) {
    OSService.all().then(r => res.json(r));
  }

  byId(req, res) {
    OSService.byId(req.params.id)
      .then(r => res.json(r))
      .catch(err => {
        l.error('error in get task by id');
        return res.status(422).json({
          success: false,
          error: err.message,
        });
      });
  }

  taskByUser(req, res) {
    OSService.taskByUser(req.body)
      .then(r => res.json(r))
      .catch(err => {
        l.error('error in get task by id');
        return res.status(422).json({
          success: false,
          error: err.message,
        });
      });
  }

  completeTask(req, res) {
    OSService.completeTask(req.body)
      .then(r => res.json(r))
      .catch(err => {
        l.error('error in complete task id');
        return res.status(422).json({
          success: false,
          error: err.message,
        });
      });
  }

  startOS(req, res) {
    OSService.startOS(req.body)
      .then(r => res.json(r))
      .catch(err => {
        l.error('error in complete task id');
        return res.status(422).json({
          success: false,
          error: err.message,
        });
      });
  }
}
export default new Controller();
