import { Client, logger } from 'camunda-external-task-client-js';

const baseUrl = `${process.env.CAMUNDA_ENGINE_URL}engine-rest`;

const config = {
  baseUrl,
  use: logger,
  asyncResponseTimeout: 10000,
};

export const camundaClient = new Client(config);

export default camundaClient;
