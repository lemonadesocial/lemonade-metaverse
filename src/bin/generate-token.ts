#!/usr/bin/env node
import 'source-map-support/register';
import jwt from 'jsonwebtoken';
import readline from 'readline';

import { jwtKey } from '../config';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Payload: ', (s) => {
  try {
    const payload = JSON.parse(s);
    const token = jwt.sign(payload, jwtKey);

    console.log(token);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    rl.close();
  }
});
