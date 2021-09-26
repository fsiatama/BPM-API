import constants from '../../../common/constants';
import engine from '../camunda-engine/camunda.service';

class OSService {
  all() {
    return false;
  }

  byUser(params) {
    const { username } = params;
    return engine.getTasksByUser(username);
  }

  byId(id) {
    return engine.getTaskById(id);
  }

  completeTask(params) {
    const { processInstanceId, variables } = params;
    return engine.completeTask(processInstanceId, variables);
  }

  startOS(params) {
    const processDefinitionId = constants.OS_PROCESS_INSTANCE_ID;
    const { variables } = params;
    return engine.startOS(processDefinitionId, variables);
  }
}

export default new OSService();
