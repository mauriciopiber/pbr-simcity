import { IBuilding, IBuildingModel } from './buildings.types';
import {
  IItemProfit,
  // IItemProfitBuilding,
  IItemProfitDependency,
} from './profits.types';

export interface IItemDependency {
  item?: any;
  quantity: number;
}

export interface IItemDependencyDoc {
  item: string;
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

export interface IItemDoc {
  name: string;
  productionTime: number;
  level: number;
  building: string;
  maxValue: number;
  slug: string;
  depends: IItemDependencyDoc[];
}

export interface IItemModel extends IItem {
  _id: string;
  billCost: number;
  billTime: number;
  profitOwnProduction: number;
  usedIn: IItemModel[];
  profitOwnByMinute: number;
  profitOwnByHour: number;
}

export interface IItemFilter {
  level?: any;
  slug?: string;
}

export interface IItemArgs {
  order: string;
  orderBy: string;
  filter: IItemFilter;
  building?: string;
  id?: string;
  slug?: string;
}

export interface IItemRepository {
  findBuildings(): Promise<IBuildingModel[]>
  findAll(match: any, sort: any): Promise<IItemModel[]>
  findByBuildingId(building: string, match: any, sort: any): Promise<IItemModel[]>
  findByBuildingSlug(building: string, match: any, sort: any): Promise<IItemModel[]>
  findDependsByItemsSlugs(items: string[], match: any, sort: any): Promise<IItemModel[]>
  findUsedInByItemsSlugs(items: string[], match: any, sort: any): Promise<IItemModel[]>
  findDependsByBuildingSlug(slug: string, match: any, sort: any): Promise<IItemModel[]>
  findUsedInByBuildingSlug(slug: string, match: any, sort: any): Promise<IItemModel[]>
  findOneById(id: string): Promise<IItemModel | null>
  findOneBySlug(slug: string): Promise<IItemModel | null>
  // findDependsByItemId(id: string, match: any, sort: any): Promise<IItemModel[]>
  findUsedInByItemId(id: string, match: any, sort: any): Promise<IItemModel[]>
}

export interface IItemDataSource {
  itemRepository: IItemRepository;
  /** Item Profit */
  findDependsItems(depends: IItemDependency[]): Promise<IItemProfitDependency[]>;
  recursiveDependency(depends: IItemDependency[]): Promise<IItemProfitDependency[]>;
  flatItemsFromDependency(rootItem: string): Promise<IItemProfitDependency[]>;
  // createParallelBuildingProfitSlots(
  //   items: IItemProfitDependency[],
  //   buildingId: string
  // ): IItemProfitBuilding;
  // createSequentialBuildingProfitSlots(): IItemProfitBuilding;
  // getItemCriticalPath(item: IItemProfitDependency, items: IItemProfitDependency[]): number;
  resolveItemProfit(item: string): Promise<IItemProfit>
  /** Item itself */
  resolveFindAll(args: IItemArgs): Promise<IItemModel[]>
  resolveFindItemsByBuildingSlug(args: IItemArgs): Promise<IItemModel[]>
  resolveFindItemsDependsByBuildingSlug(args: IItemArgs): Promise<IItemModel[]>
  resolveFindItemsUsedInByBuildingSlug(args: IItemArgs): Promise<IItemModel[]>
  resolveFindItemsByBuildingId(parent: string, args: IItemArgs): Promise<IItemModel[]>
  resolveUsedInByItemId(parent: string, args: IItemArgs): Promise<IItemModel[]>
  resolveItemDependsByItemId(parent: string): Promise<IItemModel>
  resolveFindOneItem(args: IItemArgs): Promise<IItemModel>
}
