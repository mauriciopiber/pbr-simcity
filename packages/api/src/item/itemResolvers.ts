import {
  IBuilding,
  IItem,
  IItemModel,
  IItemArgs,
  IItemDependency,
  IItemProfit,
  IContext,
  IItemSlugsArgs,
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
    async itemsDependsByItems(
      _: unknown,
      args: IItemSlugsArgs,
      context: IContext,
    ): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;

      const data = await item.resolveFindItemsDependsByItemsSlug(args);
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
    async itemsUsedByItems(
      _: unknown,
      args: IItemSlugsArgs,
      context: IContext,
    ): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;
      // console.log(args);
      return item.resolveFindItemsUsedInByItemsSlug(args);
    },
    async item(_: unknown, args: any, context: IContext): Promise<IItemModel> {
      const { dataSources } = context;
      const { item } = dataSources;

      const model = await item.resolveFindOneItem(args);
      return model;
    },
    async itemProfit(_: unknown, args: any, context: IContext): Promise<any> {
      const { dataSources } = context;
      const { item } = dataSources;

      const model: IItemProfit = await item.resolveItemProfit(args.slug);
      const buildings = Object.keys(model.buildings).map((a: any) => ({
        slug: a,
        name: model.buildings[a]?.name,
        order: model.buildings[a]?.order,
        slots: model.buildings[a]?.slots,
      }));

      // console.log(buildings);

      function compare(a: any, b: any) {
        if (a.order < b.order) {
          return -1;
        }

        if (a.order > b.order) {
          return 1;
        }
        return 0;
      }

      buildings.sort(compare);

      return {
        ...model,
        buildings,
      };
    },
  },
  Item: {
    async building(
      parent: IItemModel | IItem,
      _args: unknown,
      context: IContext,
    ): Promise<IBuilding> {
      const { dataSources } = context;
      const { building } = dataSources;

      return building.resolveOneBuildingByParentItemId(parent);
    },
    async usedIn(parent: IItemModel, args: IItemArgs, context: IContext): Promise<IItemModel[]> {
      const { dataSources } = context;
      const { item } = dataSources;

      const { _id } = parent;

      return item.resolveUsedInByItemId(_id, args);
    },
    async profitByMinute(parent: IItemModel, args: IItemArgs, context: IContext): Promise<number> {
      return 0;

      /**
       * profit
          profitByMinute
          profitByHour
          billTime
       */
    },
    async profitByHour(parent: IItemModel, args: IItemArgs, context: IContext): Promise<number> {
      return 0;

      /**
       * profit
          profitByMinute
          profitByHour
          billTime
       */
    },
    async billTime(parent: IItemModel, args: IItemArgs, context: IContext): Promise<number> {
      return 0;

      /**
       * profit
          profitByMinute
          profitByHour
          billTime
       */
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
