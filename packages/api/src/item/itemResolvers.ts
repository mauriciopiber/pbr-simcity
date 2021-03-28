import { IBuilding, IItem, IItemDependencyValues } from '@pbr-simcity/types/types';

function toFixedNumber(num: number, digits: number, base: number) : number {
  var pow = Math.pow(base||10, digits);
  return Math.round(num*pow) / pow;
}


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


      return await item.findBySlug(args.slug);
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
    },
    async profit(parent: any, _args: any, context: any): Promise<any> {
      const { dataSources } = context;
      const { item } = dataSources;

      const maxValue = parent.maxValue;
      const dependencyValues: IItemDependencyValues = await item.findItemDependencyCost(parent.depends);


      // const productionTime = item.productionTime + dependencyValues.time;
      const productionTime = parent.productionTime;
      const cost = dependencyValues.cost;
      const profit = maxValue - cost;

      const profitByMinute = toFixedNumber(profit/productionTime, 2, 10);
      const profitByHour = toFixedNumber((profit/productionTime)*60, 2, 10);

      return {
        cost,
        profit,
        profitByMinute,
        profitByHour,
      }
    },
  },
  ItemDepends: {
    async item(parent: any, _args: any, context: any): Promise<IItem> {
      const { dataSources } = context;
      const { item } = dataSources;

      console.log(parent);
      return await item.findById(parent.item);
    }
  }

};

export default resolvers;
