import { IBuilding, IItem } from '../types/types';

const resolvers = {
  Query: {
    async buildings(_: any, _args: any, context: any): Promise<IBuilding[]> {
      const { dataSources } = context;

      const { building } = dataSources;

      return await building.getAll();
    },
    async building(_: any, args: any, context: any): Promise<IItem[]> {

      const { dataSources } = context;
      const { building } = dataSources;

      return await building.findById(args._id);
    },
  },
  Building: {
    async items(parent: any, _args: any, context: any): Promise<IItem[]> {

      const { dataSources } = context;
      const {
        item
      } = dataSources;

      const items = await item.findByBuilding(parent._id);

      return items;
    }
  }


};

export default resolvers;
