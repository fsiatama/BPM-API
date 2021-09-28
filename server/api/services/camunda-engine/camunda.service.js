import axios from 'axios';
import { sortBy } from 'lodash';
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

  async getProcessInstances(processDefinitionKey) {
    try {
      let url = `${this.baseUrl}history/process-instance?processDefinitionKey=${processDefinitionKey}`;
      const result = await this.requestGet(url).then(async res => {
        if (!res.success) {
          return res;
        }
        const { data } = res;
        const items = [];

        await data.reduce(async (a, item) => {
          // Wait for the previous item to finish processing
          await a;
          // Process this item
          const { id } = item;
          url = `${this.baseUrl}history/activity-instance/?processInstanceId=${id}`;

          let history = await this.requestGet(url)
            .then(hs => {
              if (!hs.success) {
                return [];
              }
              return hs.data;
            })
            .catch(() => []);

          history = sortBy(history, dateObj => new Date(dateObj.startTime));

          items.push({
            ...item,
            history,
          });
        }, Promise.resolve());

        return {
          ...res,
          data: items,
        };
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.resolve({
        success: false,
        error: 'Error consultando el motor BPM',
      });
    }
  }

  async getTasksByUser(processDefinitionKey, username) {
    try {
      let url = `${this.baseUrl}task/?processDefinitionKey=${processDefinitionKey}`;

      if (username !== 'admin') {
        url += `&assignee=${username}`;
      }
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

  async startOS(processDefinitionKey, params) {
    try {
      const url = `${this.baseUrl}process-definition/key/${processDefinitionKey}/submit-form`;
      const result = await this.requestPost(url, params);
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
