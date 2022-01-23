import io from 'socket.io-client';
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? window.location.origin.replace(/^http/, 'ws')
    : '//127.0.0.1:2556';

let socket = io(BASE_URL, {
    transports: ['websocket', 'polling'],
  });

export default socket;
