import {
  IBuildingDataSource,
} from './buildings.types';
import {
  IItemDataSource
} from './items.types';

export interface IDataSource {
  building: IBuildingDataSource
  item: IItemDataSource;
}

export interface IContext {
  dataSources: IDataSource;
}
