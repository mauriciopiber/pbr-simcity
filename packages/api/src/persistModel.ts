import {
  IItemStatic,
  IBuildingStatic,
  IBuildingDoc,
  IItemStaticWithoutDependency,
  IItemDependencyStatic,
  IItemDocDependency,
  IItemDoc,
} from '@pbr-simcity/types/types';
import { MongoClient } from 'mongodb';
import { buildingsList, itemsList } from '@pbr-simcity/api/src/itemList';

async function persistModel(
  buildings: IBuildingStatic[],
  items: IItemStatic[],
): Promise<void> {
  const mongoStr = 'mongodb://localhost:27017/simcity';
  const client = new MongoClient(mongoStr, { useUnifiedTopology: true });

  try {
    client.connect();

    const buildingsCollection = client.db().collection('building');
    const { ops: buildingsDb } = await buildingsCollection.insertMany(
      buildings,
    );
    //
    const itemsCollection = client.db().collection('item');

    const itemsWithBuildings = items.map((p: IItemStatic): IItemStaticWithoutDependency => {
      const building: IBuildingDoc = buildingsDb.find(
        (a: IBuildingDoc) => a.name === p.building.name,
      );

      return {
        ...p,
        building: building._id,
        // depends: [],
      };
    });

    const { ops: itemsDb } = await itemsCollection.insertMany(
      itemsWithBuildings,
    );

    const itemsWithDepends = itemsDb.map((a: IItemStaticWithoutDependency): IItemDoc => {
      const { depends } = a;

      const dependsWithId = depends.map((b: IItemDependencyStatic): IItemDocDependency => {
        const itemId = itemsDb.find(
          (c: IItemStaticWithoutDependency): boolean => c.name === b.item.name,
        );
        return {
          ...b,
          item: itemId._id,
        };
      });

      return {
        ...a,
        depends: dependsWithId,
      };
    });

    const itemPromises = itemsWithDepends.map(async (a: IItemDoc) => {
      const { _id, ...rest } = a;

      return itemsCollection.updateOne({ _id: { $eq: _id } }, { $set: rest });
    });

    await Promise.all(itemPromises);
  } finally {
    await client.close();
  }
}

persistModel(buildingsList, itemsList);
