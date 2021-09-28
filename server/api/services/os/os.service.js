import constants from '../../../common/constants';
import engine from '../camunda-engine/camunda.service';

class OSService {
  constructor() {
    this.processDefinitionKey = constants.OS_PROCESS_INSTANCE_ID;
  }

  all() {
    return engine.getProcessInstances(this.processDefinitionKey);
  }

  taskByUser(params) {
    const { username } = params;
    return engine.getTasksByUser(this.processDefinitionKey, username);
  }

  byId(id) {
    return engine.getTaskById(id);
  }

  completeTask(params) {
    const { processInstanceId, variables } = params;
    return engine.completeTask(processInstanceId, variables);
  }

  startOS(params) {
    return engine.startOS(this.processDefinitionKey, params);
  }
}

export default new OSService();
