import gql from 'graphql-tag';
import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { MongoClient } from 'mongodb';
import resolvers from '@pbr-simcity/api/src/resolvers';
import typeDefs from '@pbr-simcity/api/src/typeDefs';
import BuilidingRepository from '@pbr-simcity/api/src/building/buildingRepository';
import BuildingDataSource from '@pbr-simcity/api/src/building/buildingDataSource';

function createDataSource(client: any) {
  const buildingRepository = new BuilidingRepository(client.db().collection('building'));
  const buildingDataSource = new BuildingDataSource(buildingRepository);

  return {
    building: buildingDataSource,
  };
}

describe('Test Brand resolvers', () => {
  let query: any;
  let client: any;

  beforeEach(async () => {
    const mongoStr = 'mongodb://localhost:27017/simcity';
    client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      /** @ts-ignore */
      dataSources: () => createDataSource(client),
    });
    /* @ts-ignore */
    const { query: queryMock } = createTestClient(server);
    query = queryMock;
  });

  afterEach(async () => {
    await client.close();
  });

  it('Get All Buildings', async () => {
    const ALL_BUILDING = gql`
      query {
        buildings {
          _id
          name
          slug
          items {
            _id
            name
          }
        }
      }
    `;

    const res = await query({ query: ALL_BUILDING });
    expect(res.errors).toBe(undefined);
  });

  it('Get One Building By Slug', async () => {
    const ONE_BUILDING_BY_SLUG = gql`
      query {
        building(
          filter: {
            slug: "supplies"
          }
        ) {
          _id
          name
          slug
          items {
            _id
            name
          }
        }
      }
    `;

    const res = await query({ query: ONE_BUILDING_BY_SLUG });
    expect(res.errors).toBe(undefined);
  });
});
