import {
  IItem,
  // IBuilding,
  IItemPrint,
  IItemDependency,
  IItemDependencyValues,
} from '@pbr-simcity/types/types';

function toFixedNumber(num: number, digits: number, base: number): number {
  const pow = Math.pow(base || 10, digits);
  return Math.round(num * pow) / pow;
}

export function dependency(items: IItemDependency[]): IItemDependencyValues {
  const cost = items.reduce((a: number, b: IItemDependency): number => {
    const maxValue = b?.item?.maxValue || 0;
    return a + maxValue * b.quantity;
  }, 0);

  const time = items.reduce((a: number, b: IItemDependency): number => {
    const maxTime = b?.item?.productionTime || 0;
    return a + maxTime;
  }, 0);

  return {
    cost,
    time,
  };
}

export function profit(items: IItem[]): IItemPrint[] {
  const calculateItems: IItemPrint[] = items.map((
    item: IItem,
  ): IItemPrint => {
    const { maxValue } = item;
    const dependencyValues: IItemDependencyValues = dependency(item.depends);

    // const productionTime = item.productionTime + dependencyValues.time;
    const { productionTime } = item;
    const { cost } = dependencyValues;
    const profit = maxValue - cost;

    const profitByMinute = toFixedNumber(profit / productionTime, 2, 10);
    const profitByHour = toFixedNumber((profit / productionTime) * 60, 2, 10);

    return {
      name: item.name,
      time: productionTime,
      maxValue,
      cost,
      profit,
      profitByMinute,
      profitByHour,
    };
  });
  return calculateItems;
}
