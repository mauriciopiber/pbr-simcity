import {
  IBuilding, IItemModel, IBuildingFilter, IBuildingArgs, IContext, IItemArgs,
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
    async items(parent: IItemModel, args: IItemArgs, context: IContext): Promise<IItemModel[]> {
      const { dataSources } = context;
      const { item } = dataSources;

      const items = await item.resolveFindItemsByBuildingId(parent._id, args);

      return items;
    },
  },
};

export default resolvers;
