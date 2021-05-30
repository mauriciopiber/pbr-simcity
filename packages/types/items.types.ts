import { IBuilding } from './buildings.types';
import {
  IItemProfit,
  IItemProfitBuilding,
  IItemProfitDependency,
  IItemDependencyGraph,
} from './profits.types';

export interface IItemDependency {
  item?: any;
  quantity: number;
}

export interface IItemDependencyModel {
  item: string;
  quantity: string;
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
  totalTime: number;
  profitTotalByHour: number;
  profitTotalByMinute: number;
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

export interface IItemSlugsArgs {
  order: string;
  orderBy: string;
  filter: IItemFilter;
  building?: string;
  slugs: string[];
}

export interface ItemDependencyGraph {
  slug: string;
  building: string;
  quantity: number;
  parallel: boolean;
  productionTime: number;
  depends: ItemDependencyGraph[];
  innerPath: number;
  criticalPath: number;
}

interface MatchItem {
  [key: string]: string
}

interface MatchSort {
  [key: string]: number;
}

export interface ItemMatchRepository {
  $match: MatchItem;
}

export interface ItemSortRepository {
  $sort: MatchSort
}

// slug: itemDepends.slug,
//         building: itemDepends.building.slug,
//         quantity: a.quantity,
//         parallel: itemDepends.building.parallel,
//         productionTime: itemDepends.productionTime,
//         depends: innerDependencyGraph,
//         criticalPath: criticalPath + itemDepends.productionTime,
//         innerPath: criticalPath,

export interface IItemRepository {
  findBuildings(): Promise<IBuilding[]>
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
  resolveBillTime(item: string): Promise<number>
  resolveItemProfit(item: string): Promise<IItemProfit>
  /** Item itself */
  resolveFindAll(args: IItemArgs): Promise<IItemModel[]>
  resolveFindItemsByBuildingSlug(args: IItemArgs): Promise<IItemModel[]>
  resolveFindItemsDependsByBuildingSlug(args: IItemArgs): Promise<IItemModel[]>
  resolveFindItemsDependsByItemsSlug(args: IItemSlugsArgs): Promise<IItemModel[]>
  resolveFindItemsUsedInByBuildingSlug(args: IItemArgs): Promise<IItemModel[]>
  resolveFindItemsUsedInByItemsSlug(args: IItemSlugsArgs): Promise<IItemModel[]>
  resolveFindItemsByBuildingId(parent: string, args: IItemArgs): Promise<IItemModel[]>
  resolveUsedInByItemId(parent: string, args: IItemArgs): Promise<IItemModel[]>
  resolveItemDependsByItemId(parent: string): Promise<IItemModel>
  resolveFindOneItem(args: IItemArgs): Promise<IItemModel>
  resolveItemDependencyGraph(
    slug: string, buildingHistory: IItemProfitBuilding[]
  ): Promise<IItemDependencyGraph>
}
