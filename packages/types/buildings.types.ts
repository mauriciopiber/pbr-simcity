import {
  IItem,
  IItemModel,
} from './items.types';

export type BuildingSlugs = 'industry'
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
  stars: number | null;
  order: number;
}

export interface IBuildingModel extends IBuilding {
  _id?: string;
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


export interface IBuildingRepository {
  findAll(): Promise<IBuilding[]>
  findOneById(id: string): Promise<IBuilding>
  findOneBySlug(slug: string): Promise<IBuilding>
}

export interface IBuildingDataSource {
  buildingRepository: IBuildingRepository;
  resolveAllBuildings(): Promise<IBuilding[]>
  resolveOneBuilding(filter: IBuildingFilter): Promise<IBuilding>
  resolveOneBuildingByParentItemId(parent: IItemModel | IItem): Promise<IBuilding>
}
