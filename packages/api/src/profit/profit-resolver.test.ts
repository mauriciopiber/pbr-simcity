import gql from 'graphql-tag';
import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { ObjectID } from 'mongodb';
import resolvers from '@pbr-simcity/api/src/resolvers';
import typeDefs from '@pbr-simcity/api/src/typeDefs';
// import { jest } from '@jest/globals';
// import repository from '@pbr/sim-city/src/repositories';
const profitItemApi = {
  getAll: jest.fn(),
  getById: jest.fn(),
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
};

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
};

describe('Test Brand resolvers', () => {
  let query: any;

  beforeEach(() => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      /* @ts-ignore */
      dataSources: () => ({
        item: itemApi,
        profitItem: profitItemApi,
      }),
    });
    /* @ts-ignore */
    const { query: queryMock } = createTestClient(server);
    query = queryMock;
  });

  // it('Test add Profit', async () => {
  //   profitItemApi.addProfit.mockReturnValueOnce({
  //     _id: new ObjectID(),
  //     name: 'Teste 5',
  //   });

  //   const ADD_PROFIT = gql`
  //     mutation {
  //       addProfit(
  //         name: "Teste 5"
  //       ) {
  //         _id
  //         name
  //       }
  //     }
  //   `;

  //   const res = await query({ query: ADD_PROFIT });

  //   expect(res.errors).toBe(undefined);

  //   expect(profitItemApi.addProfit).toBeCalled();
  //   expect(profitItemApi.addProfit).toBeCalledWith({
  //     name: 'Teste 5',
  //   });
  // });

  it('Test add Item to Profit', async () => {
    const item = new ObjectID();
    const profit = new ObjectID();

    profitItemApi.addProfitItem.mockReturnValueOnce({
      item,
      profit,
    });

    const ADD_ITEM_TO_PROFIT = gql`
      mutation {
        addItemToProfit(
          item: "${item}"
          profit: "${profit}"
        ) {
          _id
          item {
            _id
            name
          }
        }
      }
    `;

    const res = await query({ query: ADD_ITEM_TO_PROFIT });

    expect(res.errors).toBe(undefined);

    expect(profitItemApi.addProfitItem).toBeCalled();
    // expect(profitItemApi.addProfitItem).toBeCalledWith(profit, item);
  });

  it('Test Del Item from Profit', async () => {
    const itemProfitId = new ObjectID();

    profitItemApi.removeById.mockReturnValueOnce(itemProfitId);

    const DEL_ITEM_FROM_PROFIT = gql`
      mutation {
        delItemFromProfit(
          _id: "${itemProfitId}"
        )
      }
    `;

    const res = await query({ query: DEL_ITEM_FROM_PROFIT });

    expect(res.errors).toBe(undefined);

    expect(profitItemApi.removeById).toBeCalled();
    // expect(profitItemApi.removeById).toBeCalledWith(itemProfitId);
  });
});
