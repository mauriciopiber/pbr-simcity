"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongodb_1 = require("mongodb");
const resolvers_1 = __importDefault(require("@pbr-simcity/api/src/resolvers"));
const typeDefs_1 = __importDefault(require("@pbr-simcity/api/src/typeDefs"));
const repositories_1 = __importDefault(require("@pbr-simcity/api/src/repositories"));
const mongoStr = 'mongodb://localhost:27017/simcity';
const client = new mongodb_1.MongoClient(mongoStr, { useUnifiedTopology: true });
client.connect();
const server = new apollo_server_1.ApolloServer({
    resolvers: resolvers_1.default,
    typeDefs: typeDefs_1.default,
    dataSources: () => repositories_1.default(client),
});
// The `listen` method launches a web server.
server.listen().then(() => {
    console.log('running');
});
