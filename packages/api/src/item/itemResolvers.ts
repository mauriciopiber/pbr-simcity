import {
  IBuilding,
  IItem,
  IItemDependencyValues,
  IItemArgs,
} from '@pbr-simcity/types/types';

function toFixedNumber(num: number, digits: number, base: number): number {
  const pow = Math.pow(base || 10, digits);
  return Math.round(num * pow) / pow;
}

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
      console.log(data);
      return data;
    },
    async itemsUsedByBuilding(
      _: any,
      args: IItemArgs,
      context: any,
    ): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;
      // console.log(args);
      return item.findUsedByBuilding(args);
    },
    async item(_: any, args: any, context: any): Promise<IItem[]> {
      const { dataSources } = context;
      const { item } = dataSources;

      const model = await item.findOneBySlug(args.slug);

      return {
        ...model,
        // profitMongo: 2,
      };
      // return item.findBySlug(args.slug);
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
    async profit(parent: any, _args: any, context: any): Promise<any> {
      const { dataSources } = context;
      const { item } = dataSources;

      const { maxValue } = parent;
      const dependencyValues: IItemDependencyValues = await item.findItemDependencyCost(
        parent.depends,
      );

      // const productionTime = item.productionTime + dependencyValues.time;
      const { productionTime } = parent;
      const { cost } = dependencyValues;
      const profit = maxValue - cost;

      const profitByMinute = toFixedNumber(profit / productionTime, 2, 10);
      const profitByHour = toFixedNumber((profit / productionTime) * 60, 2, 10);

      return {
        cost,
        profit,
        profitByMinute,
        profitByHour,
      };
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
