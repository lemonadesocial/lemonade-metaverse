import ws from 'k6/ws';

import { check } from 'k6';

const url = 'ws://localhost:4000/graphql';
const params = { headers: { 'Sec-WebSocket-Protocol': 'graphql-ws' } };

const message = JSON.stringify({
  type: 'start',
  payload: { query: 'subscription { orders(query: true) { id } }' },
});

export default () => {
  const res = ws.connect(url, params, (socket) => {
    socket.on('open', () => {
      socket.send(message);
      socket.setTimeout(() => { socket.close(); }, 500);
    });

    // socket.on('message', (data) => console.log('message received: ', data));
    // socket.on('close', () => console.log('disconnected'));
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
