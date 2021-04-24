import {
  IBuilding,
} from './buildings.types';
import {
  IItem,
} from './items.types';

export * from './buildings.types';
export * from './items.types';
export * from './dataSource.types';
// export * from './profits.types';

export interface IItemDependencyValues {
  cost: number;
  time: number;
}

export interface ItemBuilding extends IItem {
  productionPlace?: IBuilding;
}

export interface IItemPrint {
  name: string;
  time: number;
  maxValue: number;
  cost: number;
  profit: number;
  profitByMinute: number;
  profitByHour: number;
  // structuralProfitMinute: number,
  // structuralProfitHour: number,
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

export interface IBuildingModel extends IBuilding {
  _id: string;
  items: IItemModel[];
}

export interface IItemFilter {
  level?: any;
}
export interface IItemArgs {
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
 * Cada slot utilizado para build com a descrição do tempo de agendamento,
 * início da produção e fim da produção
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
 * O perfil do material / item / conjunto de itens,
 * quantos ciclos são necessários e como as buildings serão ocupadas
 */
export interface IItemProfit {
  cycles: IProfitCycle[],
  buildings: IItemProfitBuldingList
}
