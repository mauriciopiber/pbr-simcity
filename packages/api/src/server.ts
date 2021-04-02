import { ApolloServer } from 'apollo-server';
import { MongoClient } from 'mongodb';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import repository from './repositories';

const mongoStr = 'mongodb://localhost:27017/simcity';

const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
client.connect();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources: () => repository(client),
});

// The `listen` method launches a web server.
server.listen().then(() => {

});
