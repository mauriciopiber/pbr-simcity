import { IBuilding, IItem } from '@pbr-simcity/types/types';

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

      return await building.findOneBySlug(args.slug);
    },
  },
  Building: {
    async items(parent: any, _args: any, context: any): Promise<IItem[]> {

      const { dataSources } = context;
      const {
        item
      } = dataSources;

      const items = await item.findManyByBuilding(parent._id);

      return items;
    }
  }


};

export default resolvers;
