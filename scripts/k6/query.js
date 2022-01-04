import http from 'k6/http';

import { check } from 'k6';

const url = 'http://localhost:4000/graphql';
const params = { headers: { 'Content-Type': 'application/json' } };

const body = JSON.stringify({
  query: '{ orders { id } }',
});

export default () => {
  const res = http.post(url, body, params);

  check(res, { 'status was 200': (r) => r.status == 200 });
}
