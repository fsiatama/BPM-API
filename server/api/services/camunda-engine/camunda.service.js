import axios from 'axios';
import l from '../../../common/logger';

class CamundaService {
  constructor() {
    this.baseUrl = `${process.env.CAMUNDA_ENGINE_URL}engine-rest/`;
  }

  async requestGet(url) {
    return axios
      .get(url)
      .then(res => ({
        success: true,
        total: res.data.length,
        data: res.data,
      }))
      .catch(error => {
        l.error(error);
        return {
          success: false,
          error: 'Error consultando el motor BPM',
        };
      });
  }

  async requestPost(url, variables = {}) {
    return axios
      .post(url, {
        ...variables,
      })
      .then(res => ({
        success: true,
        total: res.data.length,
        data: res.data,
      }))
      .catch(error => {
        l.error(error);
        return {
          success: false,
          error: 'Error consultando el motor BPM',
        };
      });
  }

  async getTaskById(processInstanceId) {
    try {
      const url = `${this.baseUrl}task/?processInstanceId=${processInstanceId}`;
      const result = await this.requestGet(url);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.resolve({
        success: false,
        error: 'Error consultando el motor BPM',
      });
    }
  }

  async getTasksByUser(username) {
    try {
      const url =
        username === 'admin'
          ? `${this.baseUrl}task/`
          : `${this.baseUrl}task/?assignee=${username}`;
      const result = await this.requestGet(url);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.resolve({
        success: false,
        error: 'Error consultando el motor BPM',
      });
    }
  }

  async completeTask(processInstanceId) {
    try {
      const url = `${this.baseUrl}task/${processInstanceId}/complete`;
      const result = await this.requestPost(url);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.resolve({
        success: false,
        error: 'Error consultando el motor BPM',
      });
    }
  }

  async startOS(processDefinitionId) {
    try {
      const url = `${this.baseUrl}process-definition/key/${processDefinitionId}/submit-form`;
      const result = await this.requestPost(url);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.resolve({
        success: false,
        error: 'Error consultando el motor BPM',
      });
    }
  }
}

export default new CamundaService();
