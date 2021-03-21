import { IBuilding, IItem } from '../types/types';

const resolvers = {
  Query: {
    async items(_: any, _args: any, context: any): Promise<IItem[]> {


      const { dataSources } = context;

      const { item } = dataSources;



      return await item.getAll();
    },
    async item(_: any, args: any, context: any): Promise<IItem[]> {

      const { dataSources } = context;
      const { item } = dataSources;

      return await item.findById(args._id);
    },
  },
  Item: {
    async building(parent: any, _args: any, context: any): Promise<IBuilding[]> {
      const { dataSources } = context;
      const { building } = dataSources;
      return await building.findById(parent.building);
    },
    async usedIn(parent: any, _args: any, context: any): Promise<IBuilding[]> {
      const { dataSources } = context;
      const { item } = dataSources;

      const { _id } = parent;

      return await item.findItemDependsById(_id);


    }
  }

};

export default resolvers;
