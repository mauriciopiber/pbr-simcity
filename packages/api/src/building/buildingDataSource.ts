import {
  IBuildingDataSource, IBuildingRepository, IBuilding, IBuildingFilter, IItemModel, IItem,
} from '@pbr-simcity/types/types';

export default class BuildingDataSource implements IBuildingDataSource {
  buildingRepository: IBuildingRepository;

  constructor(buildingRepository: IBuildingRepository) {
    this.buildingRepository = buildingRepository;
  }

  resolveAllBuildings(): Promise<IBuilding[]> {
    const allBuildings = this.buildingRepository.findAll();
    return allBuildings;
  }

  resolveOneBuildingByParentItemId(parent: IItemModel | IItem): Promise<IBuilding> {
    if (parent.building.slug) {
      return Promise.resolve(parent.building);
    }

    if (typeof parent.building === 'object') {
      return this.buildingRepository.findOneById(parent.building);
    }

    throw new Error('Missing parent to find building');
  }

  resolveOneBuilding(filter: IBuildingFilter): Promise<IBuilding> {
    const {
      slug,
      _id,
    } = filter;

    if (slug) {
      return this.buildingRepository.findOneBySlug(slug);
    }

    if (_id) {
      return this.buildingRepository.findOneById(_id);
    }

    throw new Error('Building not found');
  }
}
