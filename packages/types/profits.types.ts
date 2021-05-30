import {
  IItemModel,
} from './items.types';
import {
  BuildingSlugs,
  IBuilding,
  IBuildingModel,
} from './buildings.types';

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

export interface IItemProfitBuildingSlotsCycle extends IItemProfitBuildingSlots {
  building: string;
}

/**
 * Profit - Building
 * Cada building do projeto e a descrição de como os slots de produção serão ocupados no ciclo.
 */
export interface IItemProfitBuilding {
  name: string;
  slug: BuildingSlugs;
  order: number;
  slots: IItemProfitBuildingSlots[];
}

/**
 * Profit Cycle
 *
 * Cada ciclo que o usuário deverá interagir com o app para produção andar.
 */
export interface IProfitCycle {
  cycle: number;
  startProduction: number;
  endProduction: number;
  // quantity: number;
  slots: IItemProfitBuildingSlots[];
  // building: IBuildingModel;
}
/**
 * Profit - Building List
 * Todas buildings existentes e como seus slots serão ocupados
 */
export interface IItemProfitBuldingList {
  [key: string]: IItemProfitBuilding;
}

export interface IItemProfitBuildingPreviewList {
 [key: string]: IBuildingModel
}
/**
 * Profit
 * O perfil do material / item / conjunto de itens,
 * quantos ciclos são necessários e como as buildings serão ocupadas
 */
export interface IItemProfit {
  slug: string;
  cycles: IProfitCycle[],
  buildings: IItemProfitBuldingList
}

export interface IItemDependencyGraph {
  slug: string;
  building: IBuilding;
  criticalPath: number;
  productionTime: number;
  maxTime: number;
}
