import { ApolloServer } from 'apollo-server';
import { MongoClient } from 'mongodb';
import resolvers from '@pbr-simcity/api/src/resolvers';
import typeDefs from '@pbr-simcity/api/src/typeDefs';
import repositories from '@pbr-simcity/api/src/repositories';
import dataSource from '@pbr-simcity/api/src/dataSource';

const mongoStr = 'mongodb://localhost:27017/simcity';

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
  console.log();
  console.log('running');
});
