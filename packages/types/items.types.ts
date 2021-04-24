import { IBuilding } from './buildings.types';

export interface IItemDependency {
  item?: any;
  quantity: number;
}

export interface IItem {
  name: string;
  productionTime: number;
  level: number;
  building: IBuilding;
  maxValue: number;
  slug: string;
  depends: IItemDependency[];
}
