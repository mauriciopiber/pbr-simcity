type BuildingSlugs = 'industry'
| 'supplies'
| 'hardware'
| 'farmers'
| 'furniture'
| 'gardening'
| 'donut'
| 'fashion'
| 'fast-food'
| 'home-appliances';


export interface IBuilding {
  name: string;
  // items: IItem[],
  slots: number;
  parallel: boolean;
  slug: BuildingSlugs;
  nextSlot: number | null;
  stars: number;
}

export interface IBuildingStatic extends IBuilding {

}

export interface IBuildingDoc extends IBuildingStatic {
  _id: string;
}

export interface IItemDocDependency {
  item: string;
  quantity: number;
}

export interface IItemPrimitive {
  name: string;
  productionTime: number;
  level: number;
  building: string;
  maxValue: number;
  slug: string;
}

export interface IItemStaticDependency {
  name: string;
  building: string;
  productionTime: number;
  level: number;
  maxValue: number;
  slug: string;
}

export interface IItemStatic {
  name: string;
  building: IBuildingStatic;
  productionTime: number;
  level: number;
  maxValue: number;
  slug: string;
  depends: IItemDependencyStatic[];
}

export interface IItemStaticWithoutDependency {
  name: string;
  building: string;
  productionTime: number;
  level: number;
  maxValue: number;
  slug: string;
  depends: IItemDependencyStatic[];
}

export interface IItemDependencyStatic {
  item: IItemStatic;
  quantity: number;
}
export interface IItemDoc extends IItemPrimitive {
  _id?: string;
  depends?: IItemDocDependency[];
}

export interface IItemModelDependency {
  item: IItemModel;
  quantity: number;
}
// export interface IItem {
//   name: string;
//   productionTime: number;
//   level: number;
//   building: IBuilding;
//   maxValue: number;
//   slug: string;
//   depends: IItemDependency[];
// }

export interface IItemModel extends IItemPrimitive {
  _id: string;
  billCost: number;
  billTime: number;
  profitOwnProduction: number;
  usedIn: IItemModel[];
  profitOwnByMinute: number;
  profitOwnByHour: number;
  depends: IItemModelDependency[];
}

export interface IBuildingModel extends IBuildingDoc {
  _id: string;
  items: IItemModel[];
}

/**
 * Item Filter - Used for repository filter
 */
export interface IItemFilter {
  level?: any;
}

/**
 * Item Args
 */
export interface IItemResolverArgs {
  order: string;
  orderBy: string;
  filter: IItemFilter;
}

/**
 * Profit
 */
export interface IProfit {
  name: string;
}

export interface IProfitItem {
  _id: string;
  item: IItemModel;
}

/**
 * Profit Cycle
 *
 * Cada ciclo que o usuário deverá interagir com o app para produção andar.
 */
export interface IProfitCycle {
  cycle: number;
  startProduction: string;
  endProduction: string;
  // quantity: number;
  items: IItemModel[];
  // building: IBuildingModel;
}

export interface IItemProfitDependency extends IItemModel {
  quantity: number;
}

/**
 * Profit - Building Slots
 *
 * Cada slot utilizado para build com a descrição do tempo de agendamento, início da produção e fim da produção
 */
export interface IItemProfitBuildingSlots {
  slot: number;
  item: IItemModel;
  schedule: number;
  start: number;
  complete: number;
}

/**
 * Profit - Building
 * Cada building do projeto e a descrição de como os slots de produção serão ocupados no ciclo.
 */
export interface IItemProfitBuilding {
  slots: IItemProfitBuildingSlots[];
}

/**
 * Profit - Building List
 * Todas buildings existentes e como seus slots serão ocupados
 */
export interface IItemProfitBuldingList {
  [key: string]: IItemProfitBuilding;
}

/**
 * Profit
 * O perfil do material / item / conjunto de itens, quantos ciclos são necessários e como as buildings serão ocupadas
 */
export interface IItemProfit {
  cycles: IProfitCycle[],
  buildings: IItemProfitBuldingList
};
