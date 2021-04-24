import {
  IBuilding, IItem, IBuildingFilter, IBuildingArgs, IContext,
} from '@pbr-simcity/types/types';

const resolvers = {
  Query: {
    async buildings(_: unknown, _args: IBuildingArgs, context: IContext): Promise<IBuilding[]> {
      const { dataSources } = context;
      const {
        building,
      } = dataSources;

      return building.resolveAllBuildings();
    },
    async building(_: unknown, args: IBuildingFilter, context: IContext): Promise<IBuilding> {
      const { dataSources } = context;
      const {
        building,
      } = dataSources;

      return building.resolveOneBuilding(args);
    },
  },
  Building: {
    async items(parent: any, _args: any, context: IContext): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;

      const items = await item.findManyByBuilding(parent._id);

      return items;
    },
  },
};

export default resolvers;
