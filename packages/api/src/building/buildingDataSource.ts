import {
  IBuildingDataSource, IBuildingRepository, IBuilding, IBuildingFilter,
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

  resolveOneBuildingByParentItemId(parent: string): Promise<IBuilding> {
    return this.buildingRepository.findOneById(parent);
  }

  resolveOneBuilding(filter: IBuildingFilter): Promise<IBuilding> {
    const {
      slug,
      _id,
    } = filter;

    console.log(slug, _id);

    if (slug) {
      return this.buildingRepository.findOneBySlug(slug);
    }

    if (_id) {
      return this.buildingRepository.findOneById(_id);
    }

    throw new Error('Building not found');
  }
}
