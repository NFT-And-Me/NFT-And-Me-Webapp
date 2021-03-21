import feathers from '@feathersjs/client';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SUBMIT_PHOTO_ENDPOINT);

const ws = feathers();

ws.configure(feathers.socketio(socket,  {
  timeout: 300000 // 5 min
}));

export default ws;
