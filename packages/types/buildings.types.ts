import {
  IItem,
} from './items.types';

export interface IBuilding {
  name: string;
  // items: IItem[],
  slots: number;
  parallel: boolean;
  slug: string;
  nextSlot: number | null;
}

export interface IBuildingModelItem extends IBuilding {
  items: IItem[]
}

export interface IBuildingFilter {
  slug?: string;
  level?: number;
  _id?: string;
}

export interface IBuildingArgs {
  filter: IBuildingFilter;
  order: string;
  orderBy: string;
}

export interface IBuildingDataSource {
  resolveAllBuildings(): Promise<IBuilding[]>
  resolveOneBuilding(filter: IBuildingFilter): Promise<IBuilding>
}

export interface IBuildingRepository {
  findAll(): Promise<IBuilding[]>
  findOneById(id: string): Promise<IBuilding>
  findOneBySlug(slug: string): Promise<IBuilding>
}
