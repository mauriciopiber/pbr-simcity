import { IItem, IBuilding } from '@pbr-simcity/types/types';
import { MongoClient } from 'mongodb';
import { buildingsList, itemsList } from '@pbr-simcity/api/src/itemList';
import 'dotenv/config';

async function persistModel(
  buildings: IBuilding[],
  items: IItem[],
): Promise<void> {
  const mongoStr: string | undefined = process.env.MONGO_DATABASE;

  if (!mongoStr) {
    throw new Error('Missing Mongo Database String');
  }

  const client = new MongoClient(mongoStr, { useUnifiedTopology: true });

  try {
    client.connect();

    const buildingsCollection = client.db().collection('building');
    const { ops: buildingsDb } = await buildingsCollection.insertMany(
      buildings,
    );
    //
    const itemsCollection = client.db().collection('item');

    const itemsWithBuildings = items.map((p) => {
      const building = buildingsDb.find((a) => a.name === p.building.name);

      return {
        ...p,
        building: building._id,
      };
    });

    const { ops: itemsDb } = await itemsCollection.insertMany(
      itemsWithBuildings,
    );

    const itemsWithDepends = itemsDb.map((a) => {
      const { depends } = a;

      const dependsWithId = depends.map((b: any) => {
        const itemId = itemsDb.find((c) => c.name === b.item.name);
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

    const itemPromises = itemsWithDepends.map(async (a: any) => {
      const { _id, ...rest } = a;

      return itemsCollection.updateOne({ _id: { $eq: _id } }, { $set: rest });
    });

    await Promise.all(itemPromises);

    // const userCollection = client.db().collection('user');
    // await userCollection.insertMany(userList);
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await client.close();
  }

  // const calculateItems: IItemPrint[] = profit(buildings, items.filter(p => p.level <= 21));
  // renderTable(calculateItems)
}

persistModel(buildingsList, itemsList);
