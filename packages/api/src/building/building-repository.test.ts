import { MongoClient /* ObjectID */ } from 'mongodb';
import {
  IBuildingDoc,
  IBuildingModel
} from '@pbr-simcity/types/types';

import BuilidingRepository from '@pbr-simcity/api/src/building/buildingRepository';

const mongoStr = 'mongodb://localhost:27017/simcity';

const collection = 'building';

describe('Item Repository', () => {
  test('find one doc', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const buildingRepository = new BuilidingRepository(client.db().collection(collection));

      const buildingBySlug: IBuildingDoc | null = await buildingRepository.findOneDocBySlug('supplies');

      if (!buildingBySlug) {
        throw new Error('Missing supplies');
      }

      expect(buildingBySlug.name).toEqual('Supplies Store');
      expect(buildingBySlug.slug).toEqual('supplies');
      expect(buildingBySlug.parallel).toEqual(false);
      expect(buildingBySlug.nextSlot).toEqual(40);
      expect(buildingBySlug.stars).toEqual(0);
    } finally {
      await client.close();
    }
  });

  test('find all docs', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new BuilidingRepository(client.db().collection(collection));

      const buildings: IBuildingDoc[] = await itemRepository.findAllDocs();

      expect(buildings.length).toEqual(10);
    } finally {
      await client.close();
    }
  });

  test('find one model', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new BuilidingRepository(client.db().collection(collection));

      const buildingBySlug: IBuildingModel = await itemRepository.findOneBySlug('supplies');

      if (!buildingBySlug) {
        throw new Error('Missing supplies');
      }

      expect(buildingBySlug.name).toEqual('Supplies Store');
      expect(buildingBySlug.slug).toEqual('supplies');
      expect(buildingBySlug.parallel).toEqual(false);
      expect(buildingBySlug.nextSlot).toEqual(40);
      expect(buildingBySlug.stars).toEqual(0);
    } finally {
      await client.close();
    }
  });

  test('find many model', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new BuilidingRepository(client.db().collection(collection));

      const buildings: IBuildingModel[] = await itemRepository.findAll();

      expect(buildings.length).toEqual(10);
    } finally {
      await client.close();
    }
  });
});
