import { MongoClient } from 'mongodb';
import {
  IBuilding,
} from '@pbr-simcity/types/types';

import BuilidingRepository from '@pbr-simcity/api/src/building/buildingRepository';
import BuildingDataSource from '@pbr-simcity/api/src/building/buildingDataSource';

const mongoStr = 'mongodb://localhost:27017/simcity';

const collection = 'building';

describe('Building Data Source', () => {
  test('resolve find one', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const buildingRepository = new BuilidingRepository(client.db().collection(collection));
      const buildingDataSource = new BuildingDataSource(buildingRepository);

      const buildingBySlug: IBuilding | null = await buildingDataSource.resolveOneBuilding({ slug: 'supplies' });

      if (!buildingBySlug) {
        throw new Error('Missing supplies');
      }

      expect(buildingBySlug.name).toEqual('Supplies Store');
      expect(buildingBySlug.slug).toEqual('supplies');
      expect(buildingBySlug.parallel).toEqual(false);
      expect(buildingBySlug.nextSlot).toEqual(40);
      // expect(buildingBySlug.stars).toEqual(0);
    } finally {
      await client.close();
    }
  });

  test('resolve find all', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const buildingRepository = new BuilidingRepository(client.db().collection(collection));
      const buildingDataSource = new BuildingDataSource(buildingRepository);
      const buildings: IBuilding[] = await buildingDataSource.resolveAllBuildings();

      expect(buildings.length).toEqual(10);
    } finally {
      await client.close();
    }
  });
});
