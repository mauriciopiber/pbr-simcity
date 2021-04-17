import gql from 'graphql-tag';
import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { ObjectID } from 'mongodb';
import resolvers from '@pbr-simcity/api/src/resolvers';
import typeDefs from '@pbr-simcity/api/src/typeDefs';

const itemApi = {
  getAll: jest.fn(),
  getById: jest.fn(),
  findById: jest.fn(),
  count: jest.fn(),
  queryFilter: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  addProfit: jest.fn(),
  removeMany: jest.fn(),
  addItemToProfit: jest.fn(),
  addProfitItem: jest.fn(),
  removeById: jest.fn(),
  findOneBySlug: jest.fn(),
  findManyByBuilding: jest.fn(),
  findManyByFilter: jest.fn(),
  findManyByBuildingSlug: jest.fn(),
  findUsedByBuilding: jest.fn(),
  findDependsByBuilding: jest.fn(),
};

describe('Test Item Resolvers', () => {
  let query: any;

  beforeEach(() => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      /* @ts-ignore */
      dataSources: () => ({
        item: itemApi,
        // profitItem: profitItemApi,
      }),
    });
    /* @ts-ignore */
    const { query: queryMock } = createTestClient(server);
    query = queryMock;
  });

  it('Test Find Item by slug', async () => {
    // const item = new ObjectID();
    // const profit = new ObjectID();

    const response = {
      _id: new ObjectID(),
      name: 'Planks',
      slug: 'planks',
    };

    itemApi.findOneBySlug.mockReturnValueOnce(response);

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

    expect(itemApi.findOneBySlug).toBeCalled();

    expect(itemApi.findOneBySlug).toBeCalledWith('planks');
  });

  it('Test Find all Items', async () => {
    const response = {
      _id: new ObjectID(),
      name: 'Planks',
      slug: 'planks',
    };

    itemApi.findManyByFilter.mockReturnValueOnce([response]);

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

    expect(itemApi.findManyByFilter).toBeCalled();

    expect(itemApi.findManyByFilter).toBeCalledWith({
      filter: { level: 43 },
      order: 'asc',
      orderBy: 'slug',
    });
  });

  it('Test Find all items by building', async () => {
    const response = {
      _id: new ObjectID(),
      name: 'Planks',
      slug: 'planks',
    };

    itemApi.findManyByBuildingSlug.mockReturnValueOnce([response]);

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

    expect(itemApi.findManyByBuildingSlug).toBeCalled();

    expect(itemApi.findManyByBuildingSlug).toBeCalledWith({
      building: 'farmers',
      filter: { level: 43 },
      order: 'asc',
      orderBy: 'slug',
    });
  });

  it('Test Find all items used by building', async () => {
    const response = {
      _id: new ObjectID(),
      name: 'Planks',
      slug: 'planks',
    };

    itemApi.findUsedByBuilding.mockReturnValueOnce([response]);

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

    expect(itemApi.findUsedByBuilding).toBeCalled();

    expect(itemApi.findUsedByBuilding).toBeCalledWith({
      building: 'farmers',
      filter: { level: 43 },
      order: 'asc',
      orderBy: 'slug',
    });
  });

  it('Test Find all items depends by building', async () => {
    const response = {
      _id: new ObjectID(),
      name: 'Planks',
      slug: 'planks',
    };

    itemApi.findDependsByBuilding.mockReturnValueOnce([response]);

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

    expect(itemApi.findDependsByBuilding).toBeCalled();

    expect(itemApi.findDependsByBuilding).toBeCalledWith({
      building: 'farmers',
      filter: { level: 43 },
      order: 'asc',
      orderBy: 'slug',
    });
  });

  // it('Test Find all items depends from building', async () => {

  // });
});
