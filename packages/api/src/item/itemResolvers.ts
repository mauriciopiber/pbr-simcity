import {
  IBuilding,
  IItem,
  IItemArgs,
} from '@pbr-simcity/types/types';

const resolvers = {
  Query: {
    async items(_: any, args: IItemArgs, context: any): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;
      return item.findManyByFilter(args);
    },
    async itemsByBuilding(
      _: any,
      args: IItemArgs,
      context: any,
    ): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;
      const data = await item.findManyByBuildingSlug(args);
      return data;
    },
    async itemsDependsByBuilding(
      _: any,
      args: IItemArgs,
      context: any,
    ): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;
      const data = await item.findDependsByBuilding(args);
      return data;
    },
    async itemsUsedByBuilding(
      _: any,
      args: IItemArgs,
      context: any,
    ): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;

      return item.findUsedByBuilding(args);
    },
    async item(_: any, args: any, context: any): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;

      const model = await item.findOneBySlug(args.slug);

      return {
        ...model,
      };
    },
  },
  Item: {
    async building(
      parent: any,
      _args: any,
      context: any,
    ): Promise<IBuilding[]> {
      const { dataSources } = context;
      const { building } = dataSources;
      return building.findById(parent.building);
    },
    async usedIn(parent: any, _args: any, context: any): Promise<IBuilding[]> {
      const { dataSources } = context;
      const { item } = dataSources;

      const { _id } = parent;

      return item.findItemDependsById(_id);
    },
  },
  ItemDepends: {
    async item(parent: any, _args: any, context: any): Promise<IItem> {
      const { dataSources } = context;
      const { item } = dataSources;

      return item.findById(parent.item);
    },
  },
};

export default resolvers;
