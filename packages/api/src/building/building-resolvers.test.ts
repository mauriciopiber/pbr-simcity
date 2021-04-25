import gql from 'graphql-tag';
import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { MongoClient } from 'mongodb';
import resolvers from '@pbr-simcity/api/src/resolvers';
import typeDefs from '@pbr-simcity/api/src/typeDefs';
import BuilidingRepository from '@pbr-simcity/api/src/building/buildingRepository';
import BuildingDataSource from '@pbr-simcity/api/src/building/buildingDataSource';
import ItemRepository from '@pbr-simcity/api/src/item/itemRepository';
import ItemDataSource from '@pbr-simcity/api/src/item/itemDataSource';

function createDataSource(client: any) {
  const buildingRepository = new BuilidingRepository(client.db().collection('building'));
  const buildingDataSource = new BuildingDataSource(buildingRepository);

  const itemRepository = new ItemRepository(client.db().collection('item'));
  const itemDataSource = new ItemDataSource(itemRepository);

  return {
    building: buildingDataSource,
    item: itemDataSource,
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
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /** @ts-ignore */
      dataSources: () => createDataSource(client),
    });
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
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
          slug: "supplies"
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

    const {
      data,
    } = res;

    const {
      building,
    } = data;

    expect(building.items.length).toEqual(6);

    expect(building.name).toEqual('Supplies Store');
    expect(building.slug).toEqual('supplies');
  });
});
