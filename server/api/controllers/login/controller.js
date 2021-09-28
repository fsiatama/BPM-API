import l from '../../../common/logger';
import LoginService from '../../services/login/login.service';

export class Controller {
  account(req, res) {
    LoginService.account(req.body)
      .then(r => res.json(r))
      .catch(err => {
        l.error('error in login');
        return res.status(422).json({
          success: false,
          error: err.message,
        });
      });
  }

  currentUser(req, res) {
    LoginService.currentUser(req.body)
      .then(r => res.json(r))
      .catch(err => {
        l.error('error in get curren user');
        return res.status(422).json({
          success: false,
          error: err.message,
        });
      });
  }

  outLogin(req, res) {
    LoginService.outLogin()
      .then(r => res.json(r))
      .catch(err => {
        l.error('error in log out user');
        return res.status(422).json({
          success: false,
          error: err.message,
        });
      });
  }
}
export default new Controller();
