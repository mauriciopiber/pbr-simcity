import { ApolloServer } from 'apollo-server';
import { MongoClient } from 'mongodb';
import resolvers from '@pbr-simcity/api/src/resolvers';
import typeDefs from '@pbr-simcity/api/src/typeDefs';
import repositories from '@pbr-simcity/api/src/repositories';
import dataSource from '@pbr-simcity/api/src/dataSource';
import 'dotenv/config';

const mongoStr: string | undefined = process.env.MONGO_DATABASE;

if (!mongoStr) {
  throw new Error('Missing Mongo Database String');
}

const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
client.connect();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources: () => ({
    ...repositories(client),
    ...dataSource(client),
  }),
});

// The `listen` method launches a web server.
server.listen().then(() => {
  /* eslint-disable no-debugger, no-console */
  console.log();
  console.log('running');
});
