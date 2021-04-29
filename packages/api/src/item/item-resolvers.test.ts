import gql from 'graphql-tag';
import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { MongoClient } from 'mongodb';
import resolvers from '@pbr-simcity/api/src/resolvers';
import typeDefs from '@pbr-simcity/api/src/typeDefs';
import ItemRepository from '@pbr-simcity/api/src/item/itemRepository';
import ItemDataSource from '@pbr-simcity/api/src/item/itemDataSource';
import BuilidingRepository from '@pbr-simcity/api/src/building/buildingRepository';
import BuildingDataSource from '@pbr-simcity/api/src/building/buildingDataSource';

function createDataSource(client: any) {
  const itemRepository = new ItemRepository(client.db().collection('item'));
  const itemDataSource = new ItemDataSource(itemRepository);

  const buildingRepository = new BuilidingRepository(client.db().collection('building'));
  const buildingDataSource = new BuildingDataSource(buildingRepository);

  return {
    item: itemDataSource,
    building: buildingDataSource,
  };
}

describe('Test Item Resolvers', () => {
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
    /** @ts-ignore */
    const { query: queryMock } = createTestClient(server);
    query = queryMock;
  });

  afterEach(async () => {
    await client.close();
  });

  it('Get Item Profit - Chairs', async () => {
    const ITEMS = gql`
      query {
        itemProfit(slug: "chairs") {
          slug
          buildings {
            slug
            name
            slots {
              slot
              item {
                _id
                slug
                name
              }
              schedule
              start
              complete
            }
          }
        }
      }
    `;

    const res = await query({ query: ITEMS });

    expect(res.errors).toBe(undefined);

    expect(res).toHaveProperty('data');

    const {
      data,
    } = res;

    expect(data).toHaveProperty('itemProfit');

    const {
      itemProfit,
    } = data;

    expect(itemProfit.slug).toEqual('chairs');

    const {
      buildings,
    } = itemProfit;

    const supplies = buildings.find((a: any) => a.slug === 'supplies');

    const {
      slots,
    } = supplies;

    expect(slots[0].item.slug).toEqual('nails');
  });

  it('Test find all Items for tables', async () => {
    const ITEMS = gql`
      query {
        items(order: "asc", orderBy: "slug", filter: { level: 43 }) {
          _id
          name
          slug
        }
      }
    `;

    const res = await query({ query: ITEMS });

    expect(res.errors).toBe(undefined);

    expect(res).toHaveProperty('data');

    const {
      data,
    } = res;

    expect(data).toHaveProperty('items');

    const {
      items,
    } = data;

    expect(items.length).toEqual(63);
  });

  it('Test Item Structure - Burgers', async () => {
    const ITEMS = gql`
      query {
        item(slug: "burgers", order: "asc", orderBy: "slug", filter: { level: 43 }) {
          _id
          name
          slug
        }
      }
    `;

    const res = await query({ query: ITEMS });

    expect(res.errors).toBe(undefined);

    expect(res).toHaveProperty('data');

    const {
      data,
    } = res;

    expect(data).toHaveProperty('item');

    const {
      item,
    } = data;

    expect(item.slug).toEqual('burgers');
    expect(item.name).toEqual('Burgers');
  });

  it('Test Item Structure - Beefs', async () => {
    const ITEMS = gql`
      query {
        item(slug: "beef", order: "asc", orderBy: "maxValue", filter: { level: 43 }) {
          _id
          name
          slug
          building {
            _id
            name
            slug
          }
          usedIn {
            _id
            name
            slug
          }
          depends {
            item {
              _id
              name
              slug
            }
            quantity
          }
        }
      }
    `;

    const res = await query({ query: ITEMS });

    expect(res.errors).toBe(undefined);

    expect(res).toHaveProperty('data');

    const {
      data,
    } = res;

    expect(data).toHaveProperty('item');

    const {
      item,
    } = data;

    expect(item.slug).toEqual('beef');
    expect(item.name).toEqual('Beef');

    expect(item).toHaveProperty('building');

    expect(item.building.slug).toEqual('farmers');
    expect(item.building.name).toEqual('Farmer\'s Market');

    expect(item.usedIn.length).toEqual(2);

    // expect(item.usedIn[0].slug).toEqual('pizza');
    // expect(item.usedIn[1].slug).toEqual('burgers');

    expect(item.depends.length).toEqual(1);
    expect(item.depends[0].quantity).toEqual(3);
    expect(item.depends[0].item.slug).toEqual('animal-feed');
  });

  it('Test Find Item by slug', async () => {
    const ADD_ITEM_TO_PROFIT = gql`
      query {
        item(slug: "planks") {
          _id
          name
          slug
        }
      }
    `;

    const res = await query({ query: ADD_ITEM_TO_PROFIT });

    expect(res.errors).toBe(undefined);
  });

  it('Test Find all items by building', async () => {
    const ITEMS = gql`
      query {
        itemsByBuilding(
          building: "farmers"
          order: "asc"
          orderBy: "slug"
          filter: { level: 43 }
        ) {
          _id
          name
          slug
        }
      }
    `;

    const res = await query({ query: ITEMS });

    expect(res.errors).toBe(undefined);

    expect(res).toHaveProperty('data');

    const {
      data,
    } = res;

    expect(data).toHaveProperty('itemsByBuilding');

    const {
      itemsByBuilding,
    } = data;

    expect(itemsByBuilding.length).toEqual(7);
  });

  it('Test Find all items used by building', async () => {
    const ITEMS = gql`
      query {
        itemsUsedByBuilding(
          building: "farmers"
          order: "asc"
          orderBy: "slug"
          filter: { level: 43 }
        ) {
          _id
          name
          slug
        }
      }
    `;

    const res = await query({ query: ITEMS });

    expect(res.errors).toBe(undefined);

    expect(res).toHaveProperty('data');

    const {
      data,
    } = res;

    expect(data).toHaveProperty('itemsUsedByBuilding');

    const {
      itemsUsedByBuilding,
    } = data;

    expect(itemsUsedByBuilding.length).toEqual(12);
  });

  it('Test Find all items depends by building', async () => {
    const ITEMS = gql`
      query {
        itemsDependsByBuilding(
          building: "farmers"
          order: "asc"
          orderBy: "slug"
          filter: { level: 43 }
        ) {
          _id
          name
          slug
        }
      }
    `;

    const res = await query({ query: ITEMS });

    expect(res.errors).toBe(undefined);

    expect(res).toHaveProperty('data');

    const {
      data,
    } = res;

    expect(data).toHaveProperty('itemsDependsByBuilding');

    const {
      itemsDependsByBuilding,
    } = data;

    expect(itemsDependsByBuilding.length).toEqual(5);
  });
});
