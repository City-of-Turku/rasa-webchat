import io from 'socket.io-client';

export default function (socketUrl, customData, path) {
  const options = path ? { path } : {};
  const socket = io(socketUrl, options);
  socket.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log(`connect:${socket.id}`);
    socket.customData = customData;
  });

  socket.on('connect_error', (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

  socket.on('disconnect', (reason) => {
    // eslint-disable-next-line no-console
    console.log(reason);
  });

  return socket;
}
