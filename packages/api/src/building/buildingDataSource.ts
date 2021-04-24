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

  resolveOneBuilding(filter: IBuildingFilter): Promise<IBuilding> {
    const {
      slug,
      _id,
    } = filter;

    if (slug) {
      return this.buildingRepository.findOneBySlug(slug);
    }

    return this.buildingRepository.findOneById(_id);
  }
}
