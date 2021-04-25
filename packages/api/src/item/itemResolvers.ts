import {
  IBuilding,
  IItem,
  IItemModel,
  IItemArgs,
  IItemDependency,
  IContext,
} from '@pbr-simcity/types/types';

const resolvers = {
  Query: {
    async items(_: unknown, args: IItemArgs, context: IContext): Promise<IItemModel[]> {
      const { dataSources } = context;
      const { item } = dataSources;
      return item.resolveFindAll(args);
    },
    async itemsByBuilding(
      _: unknown,
      args: IItemArgs,
      context: IContext,
    ): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;
      const data = await item.resolveFindItemsByBuildingSlug(args);
      return data;
    },
    async itemsDependsByBuilding(
      _: unknown,
      args: IItemArgs,
      context: IContext,
    ): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;
      const data = await item.resolveFindItemsDependsByBuildingSlug(args);
      return data;
    },
    async itemsUsedByBuilding(
      _: unknown,
      args: IItemArgs,
      context: IContext,
    ): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;
      // console.log(args);
      return item.resolveFindItemsUsedInByBuildingSlug(args);
    },
    async item(_: unknown, args: any, context: IContext): Promise<IItemModel> {
      const { dataSources } = context;
      const { item } = dataSources;

      const model = await item.resolveFindOneItem(args);
      return model;
    },
  },
  Item: {
    async building(
      parent: IItemModel,
      _args: unknown,
      context: IContext,
    ): Promise<IBuilding> {
      const { dataSources } = context;
      const { building } = dataSources;
      /** @ts-ignore */
      return building.resolveOneBuildingByParentItemId(parent.building);
    },
    async usedIn(parent: IItemModel, args: IItemArgs, context: IContext): Promise<IItemModel[]> {
      const { dataSources } = context;
      const { item } = dataSources;

      const { _id } = parent;

      return item.resolveUsedInByItemId(_id, args);
    },
  },
  ItemDepends: {
    async item(parent: IItemDependency, _: unknown, context: IContext): Promise<IItemModel> {
      const { dataSources } = context;
      const { item } = dataSources;

      return item.resolveItemDependsByItemId(parent.item);
    },
  },
};

export default resolvers;
