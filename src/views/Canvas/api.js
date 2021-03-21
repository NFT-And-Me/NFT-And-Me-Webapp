import feathersClient from '../../feathers/wsClient';

export const upload = data => feathersClient.service('do-magic').create(data);
