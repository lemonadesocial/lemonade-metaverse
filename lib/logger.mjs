import { Writable } from 'stream'
import fetch from 'node-fetch';
import https from 'https';

const agent = new https.Agent({ keepAlive: true });
const colors = {
  30: '#2EB67D', // info
  40: '#ECB22E', // warn
  50: '#E01E5A', // error
  60: '#E01E5A', // fatal
};

const flatten = (obj, keys = []) => {
  return Object.entries(obj).reduce((acc, [key, value]) => ({
    ...acc,
    ...value && typeof value === 'object' ? flatten(value, keys.concat(key)) : { [keys.concat(key).join('.')]: String(value) },
  }), {});
};

const process = async (log, { slackWebhookUrl }) => {
  const { msg, time, level, ...data } = JSON.parse(log);
  delete data.pid;
  delete data.hostname;

  const payload = {
    blocks: [],
  };

  if (msg) {
    payload.text = msg;
    payload.blocks.push({
      type: 'section',
      text: { type: 'mrkdwn', text: `\`\`\`${msg}\`\`\`` },
    });
  }

  const date = new Date(time);

  payload.blocks.push({
    type: 'context',
    elements: [{ type: 'mrkdwn', text: `<!date^${Math.floor(date.getTime() / 1000)}^Posted {date_pretty} at {time_secs}|Posted ${date}>` }],
  });

  const fields = Object.entries(flatten(data)).map(([title, value]) => ({
    title,
    value,
    short: value.length < 500,
  }));

  if (fields.length) {
    payload.attachments = [{
      color: colors[level],
      fields,
    }];
  }

  await fetch(slackWebhookUrl, {
    agent,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export default function logger(options) {
  return new Writable({
    write (chunk, enc, cb) {
      const logs = chunk.toString().split('\n\n');

      for (const log of logs) {
        process(log, options)
          .catch((err) => console.error(err)) // eslint-disable-line no-undef
          .then(() => cb());
      }
    },
  });
}
