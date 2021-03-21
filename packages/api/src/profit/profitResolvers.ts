import { IProfit } from '../types/types';

const resolvers = {
  Query: {
    async profits(_: any, _args: any, context: any): Promise<IProfit[]> {


      const { dataSources } = context;

      const { profit } = dataSources;



      return await profit.getAll();
    },
    async profit(_: any, args: any, context: any): Promise<IProfit> {

      const { dataSources } = context;
      const { profit } = dataSources;

      return await profit.findById(args._id);
    },
  },
  Mutation: {
    async addProfit(_: any, args: any, context: any): Promise<IProfit> {
      const { dataSources } = context;
      const { profit } = dataSources;
      return await profit.addProfit(args);
    },
    async editProfit(_: any, args: any, context: any): Promise<IProfit> {
      const { dataSources } = context;
      const { profit } = dataSources;
      return await profit.editProfit(args);
    },
    async delProfit(_: any, args: any, context: any): Promise<IProfit> {
      const { dataSources } = context;
      const { profit } = dataSources;
      return await profit.delProfit(args._id);
    }
  }
};

export default resolvers;
