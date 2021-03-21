import feathers from '@feathersjs/client';
import axios from 'axios';

const app = feathers();

const restClient = feathers.rest(process.env.REACT_APP_SUBMIT_PHOTO_ENDPOINT);

const feathersClient = app.configure(restClient.axios(axios));

export default feathersClient;
