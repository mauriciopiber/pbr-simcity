import { IProfit, IProfitItem } from '@pbr-simcity/types/types';

const resolvers = {
  Query: {
    async profits(_: any, _args: any, context: any): Promise<IProfit[]> {
      const { dataSources } = context;

      const { profit } = dataSources;

      return profit.getAll();
    },
    async profit(_: any, args: any, context: any): Promise<IProfit> {
      const { dataSources } = context;
      const { profit } = dataSources;

      return profit.findById(args._id);
    },
  },
  Mutation: {
    async addProfit(_: any, args: any, context: any): Promise<IProfit> {
      const { dataSources } = context;
      const { profit } = dataSources;
      return profit.addProfit(args);
    },
    async addItemToProfit(_: any, args: any, context: any): Promise<IProfitItem> {
      const { dataSources } = context;
      const { profitItem, item } = dataSources;

      const response = await profitItem.addProfitItem(args.profit, args.item);

      const profitItemElm = await item.findById(args.item);

      return {
        ...response,
        item: profitItemElm,
      };
    },
    async delItemFromProfit(_: any, args: any, context: any): Promise<IProfit> {
      const { dataSources } = context;
      const { profitItem } = dataSources;

      return profitItem.removeById(args._id);
    },
    async editProfit(_: any, args: any, context: any): Promise<IProfit> {
      const { dataSources } = context;
      const { profit } = dataSources;
      return profit.editProfit(args);
    },
    async delProfit(_: any, args: any, context: any): Promise<IProfit> {
      const { dataSources } = context;
      const { profit } = dataSources;
      return profit.delProfit(args._id);
    },
  },
};

export default resolvers;
