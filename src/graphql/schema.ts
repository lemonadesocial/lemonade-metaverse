import { buildSchema } from 'type-graphql';
import * as path from 'path';

export const build = async () => {
  const resolversPath = path.join(__dirname, '/resolvers/**/*.{ts,js}');

  return await buildSchema({
    resolvers: [resolversPath],
  });
};
