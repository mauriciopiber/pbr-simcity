export interface IItem {
  name: string;
  productionTime: number;
  level: number;
  building: IBuilding,
  maxValue: number,
  depends: IItemDependency[],
}

export interface IItemDependency {
  item?: IItem,
  quantity: number,
}

export interface IItemDependencyValues {
  cost: number;
  time: number,
}

export interface ItemBuilding extends IItem {
  productionPlace?: IBuilding
}

export interface IBuilding {
  name: string;
  //items: IItem[],
  slots: number,
  parallel: boolean,
  nextSlot: number | null,
}

export interface IProfit {
  name: string;
}

export interface IItemPrint {
  name: string,
  time: number,
  maxValue: number,
  cost: number,
  profit: number,
  profitByMinute: number,
  profitByHour: number,
  // structuralProfitMinute: number,
  // structuralProfitHour: number,
}
