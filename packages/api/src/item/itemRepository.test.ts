import { MongoClient /* ObjectID */ } from 'mongodb';
import { IItemModel, IItemProfit, IItemProfitDependency } from '@pbr-simcity/types/types';

import ItemRepository from '@pbr-simcity/api/src/item/itemRepository';

const mongoStr = 'mongodb://localhost:27017/simcity';

describe('Item Repository', () => {
  test('workflow - planks', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));

      const findAll: IItemProfit = await itemRepository.createItemProfit('planks');

      expect(findAll.cycles.length).toEqual(0);
      expect(findAll.buildings).toHaveProperty('industry');
      expect(findAll.buildings).toHaveProperty('supplies');
      expect(findAll.buildings).toHaveProperty('hardware');
      expect(findAll.buildings).toHaveProperty('farmers');
      expect(findAll.buildings).toHaveProperty('furniture');
      expect(findAll.buildings).toHaveProperty('gardening');
      expect(findAll.buildings).toHaveProperty('fashion');
      expect(findAll.buildings).toHaveProperty('donuts');
      expect(findAll.buildings).toHaveProperty('fast-food');
      expect(findAll.buildings).toHaveProperty('home-appliances');
      expect(findAll.buildings).toHaveProperty('industry');

      const { industry, supplies } = findAll.buildings;

      expect(industry?.slots[0]?.slot).toEqual(1);
      expect(industry?.slots[0]?.item.slug).toEqual('wood');
      expect(industry?.slots[0]?.schedule).toEqual(0);
      expect(industry?.slots[0]?.start).toEqual(0);
      expect(industry?.slots[0]?.complete).toEqual(3);

      expect(industry?.slots[1]?.slot).toEqual(2);
      expect(industry?.slots[1]?.item.slug).toEqual('wood');
      expect(industry?.slots[1]?.schedule).toEqual(0);
      expect(industry?.slots[1]?.start).toEqual(0);
      expect(industry?.slots[1]?.complete).toEqual(3);

      expect(supplies?.slots[0]?.slot).toEqual(1);
      expect(supplies?.slots[0]?.item.slug).toEqual('planks');
      expect(supplies?.slots[0]?.schedule).toEqual(8);
      expect(supplies?.slots[0]?.start).toEqual(8);
      expect(supplies?.slots[0]?.complete).toEqual(38);

      // expect(findAll.cycles.length).toEqual(2);

      // expect(findAll.cycles[0]?.cycle).toEqual(1);
      // expect(findAll.cycles[0]?.items.length).toEqual(2);
      // expect(findAll.cycles[0]?.startProduction).toEqual(0);
      // expect(findAll.cycles[0]?.endProduction).toEqual(3);

      // expect(findAll.cycles[1]?.cycle).toEqual(2);
      // expect(findAll.cycles[0]?.items.length).toEqual(1);
      // expect(findAll.cycles[0]?.startProduction).toEqual(8);
      // expect(findAll.cycles[0]?.endProduction).toEqual(38);
    } finally {
      await client.close();
    }
  });

  test('workflow - pizza', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));

      const findAll: IItemProfit = await itemRepository.createItemProfit('pizza');

      expect(findAll.cycles.length).toEqual(0);

      expect(findAll.buildings).toHaveProperty('farmers');
      expect(findAll.buildings).toHaveProperty('industry');
      expect(findAll.buildings).toHaveProperty('industry');
      expect(findAll.buildings).toHaveProperty('supplies');
      expect(findAll.buildings).toHaveProperty('hardware');
      expect(findAll.buildings).toHaveProperty('farmers');
      expect(findAll.buildings).toHaveProperty('furniture');
      expect(findAll.buildings).toHaveProperty('gardening');
      expect(findAll.buildings).toHaveProperty('fashion');
      expect(findAll.buildings).toHaveProperty('fast-food');
      expect(findAll.buildings).toHaveProperty('home-appliances');
      expect(findAll.buildings).toHaveProperty('industry');

      const { industry, farmers } = findAll.buildings;
      const fastFood = findAll.buildings['fast-food'];

      expect(industry?.slots.length).toEqual(9);

      expect(industry?.slots[0]?.slot).toEqual(1);
      expect(industry?.slots[0]?.item.slug).toEqual('seeds');
      expect(industry?.slots[0]?.schedule).toEqual(0);
      expect(industry?.slots[0]?.start).toEqual(0);
      expect(industry?.slots[0]?.complete).toEqual(20);

      expect(industry?.slots[1]?.slot).toEqual(2);
      expect(industry?.slots[1]?.item.slug).toEqual('seeds');

      expect(industry?.slots[2]?.slot).toEqual(3);
      expect(industry?.slots[2]?.item.slug).toEqual('textiles');
      expect(industry?.slots[2]?.schedule).toEqual(0);
      expect(industry?.slots[2]?.start).toEqual(0);
      expect(industry?.slots[2]?.complete).toEqual(180);

      expect(industry?.slots[3]?.slot).toEqual(4);
      expect(industry?.slots[3]?.item.slug).toEqual('textiles');

      expect(industry?.slots[4]?.slot).toEqual(5);
      expect(industry?.slots[4]?.item.slug).toEqual('animal-feed');
      expect(industry?.slots[4]?.schedule).toEqual(0);
      expect(industry?.slots[4]?.start).toEqual(0);
      expect(industry?.slots[4]?.complete).toEqual(360);

      expect(industry?.slots[5]?.slot).toEqual(6);
      expect(industry?.slots[5]?.item.slug).toEqual('animal-feed');

      expect(industry?.slots[6]?.slot).toEqual(7);
      expect(industry?.slots[6]?.item.slug).toEqual('animal-feed');

      expect(industry?.slots[7]?.slot).toEqual(8);
      expect(industry?.slots[7]?.item.slug).toEqual('animal-feed');

      expect(industry?.slots[8]?.slot).toEqual(9);
      expect(industry?.slots[8]?.item.slug).toEqual('animal-feed');

      expect(farmers?.slots[0]?.slot).toEqual(1);
      expect(farmers?.slots[0]?.item.slug).toEqual('flour-bag');
      expect(farmers?.slots[0]?.schedule).toEqual(185);
      expect(farmers?.slots[0]?.start).toEqual(185);
      expect(farmers?.slots[0]?.complete).toEqual(215);

      expect(farmers?.slots[1]?.slot).toEqual(2);
      expect(farmers?.slots[1]?.item.slug).toEqual('cheese');
      expect(farmers?.slots[1]?.schedule).toEqual(365);
      expect(farmers?.slots[1]?.start).toEqual(365);
      expect(farmers?.slots[1]?.complete).toEqual(470);

      expect(farmers?.slots[2]?.slot).toEqual(3);
      expect(farmers?.slots[2]?.item.slug).toEqual('beef');
      expect(farmers?.slots[2]?.schedule).toEqual(365);
      expect(farmers?.slots[2]?.start).toEqual(470);
      expect(farmers?.slots[2]?.complete).toEqual(620);

      expect(fastFood?.slots[0]?.slot).toEqual(1);
      expect(fastFood?.slots[0]?.item.slug).toEqual('pizza');
      expect(fastFood?.slots[0]?.schedule).toEqual(625);
      expect(fastFood?.slots[0]?.start).toEqual(625);
      expect(fastFood?.slots[0]?.complete).toEqual(649);

      // expect(findAll.cycles.length).toEqual(4);

      // expect(findAll.cycles[0]?.cycle).toEqual(1);
      // expect(findAll.cycles[0]?.items.length).toEqual(9);
      // expect(findAll.cycles[0]?.startProduction).toEqual(0);
      // expect(findAll.cycles[0]?.endProduction).toEqual(360);

      // expect(findAll.cycles[1]?.cycle).toEqual(2);
      // expect(findAll.cycles[1]?.items.length).toEqual(1);
      // expect(findAll.cycles[1]?.startProduction).toEqual(185);
      // expect(findAll.cycles[1]?.endProduction).toEqual(215);

      // expect(findAll.cycles[2]?.cycle).toEqual(3);
      // expect(findAll.cycles[2]?.items.length).toEqual(2);
      // expect(findAll.cycles[2]?.startProduction).toEqual(365);
      // expect(findAll.cycles[2]?.endProduction).toEqual(620);

      // expect(findAll.cycles[3]?.cycle).toEqual(4);
      // expect(findAll.cycles[3]?.items.length).toEqual(1);
      // expect(findAll.cycles[3]?.startProduction).toEqual(625);
      // expect(findAll.cycles[3]?.endProduction).toEqual(649);
    } finally {
      await client.close();
    }
  });

  test('flat items from dependency - burgers', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));
      const findAll: IItemModel[] = await itemRepository.flatItemsFromDependency('burgers');

      expect(findAll.length).toEqual(13);
    } finally {
      await client.close();
    }
  });

  test('flat items from dependency - lemonade', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));
      const findAll: IItemProfitDependency[] = await itemRepository.flatItemsFromDependency('lemonade');

      expect(findAll.length).toEqual(10);

      expect(findAll[0]?.slug).toEqual('metal');
      expect(findAll[0]?.quantity).toEqual(1);
    } finally {
      await client.close();
    }
  });

  test('flat items from dependency - textiles', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));
      const findAll: IItemModel[] = await itemRepository.flatItemsFromDependency('textiles');

      expect(findAll.length).toEqual(1);
    } finally {
      await client.close();
    }
  });

  test('flat items from dependency - shoes', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));
      const findAll: IItemModel[] = await itemRepository.flatItemsFromDependency('shoes');

      expect(findAll.length).toEqual(5);
    } finally {
      await client.close();
    }
  });

  test('workflow - shoes', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));

      const findAll: IItemProfit = await itemRepository.createItemProfit('shoes');

      const { industry, supplies, fashion } = findAll.buildings;

      expect(industry?.slots.length).toEqual(6);
      expect(supplies?.slots.length).toEqual(1);
      expect(fashion?.slots.length).toEqual(1);

      // expect(findAll.cycles.length).toEqual(3);
    } finally {
      await client.close();
    }
  });

  test('workflow - cream', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));

      const findAll: IItemProfit = await itemRepository.createItemProfit('cream');

      const { industry, farmers } = findAll.buildings;

      expect(industry?.slots.length).toEqual(1);
      expect(farmers?.slots.length).toEqual(1);

      // expect(findAll.cycles.length).toEqual(2);
    } finally {
      await client.close();
    }
  });

  test('workflow - textiles', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));

      const findAll: IItemProfit = await itemRepository.createItemProfit('textiles');

      const { industry, farmers } = findAll.buildings;

      expect(industry?.slots.length).toEqual(1);
      expect(farmers?.slots.length).toEqual(0);

      expect(industry?.slots[0]?.slot).toEqual(1);
      expect(industry?.slots[0]?.schedule).toEqual(0);
      expect(industry?.slots[0]?.start).toEqual(0);
      expect(industry?.slots[0]?.complete).toEqual(180);
      expect(industry?.slots[0]?.item.slug).toEqual('textiles');

      // expect(findAll.cycles.length).toEqual(2);
    } finally {
      await client.close();
    }
  });

  test('workflow - burgers', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));

      const findAll: IItemProfit = await itemRepository.createItemProfit('burgers');

      expect(findAll.cycles.length).toEqual(0);
      // expect(findAll.buildings).toHaveProperty('farmers');
      // expect(findAll.buildings).toHaveProperty('industry');
      const {
        industry,
        farmers,
        hardware,
        donuts,
      } = findAll.buildings;
      const fastFood = findAll.buildings['fast-food'];
      const homeApp = findAll.buildings['home-appliances'];

      expect(industry?.slots.length).toEqual(17);

      // 1 to 5
      expect(industry?.slots[0]?.slot).toEqual(1);
      expect(industry?.slots[0]?.item.slug).toEqual('metal');

      // 6 to 7
      expect(industry?.slots[5]?.slot).toEqual(6);
      expect(industry?.slots[5]?.item.slug).toEqual('wood');

      // 8 to 9
      expect(industry?.slots[7]?.slot).toEqual(8);
      expect(industry?.slots[7]?.item.slug).toEqual('plastic');

      // 10 to 11
      expect(industry?.slots[9]?.slot).toEqual(10);
      expect(industry?.slots[9]?.item.slug).toEqual('seeds');

      // 12 to 13
      expect(industry?.slots[11]?.slot).toEqual(12);
      expect(industry?.slots[11]?.item.slug).toEqual('textiles');

      // 14 to 15
      expect(industry?.slots[13]?.slot).toEqual(14);
      expect(industry?.slots[13]?.item.slug).toEqual('animal-feed');
      expect(industry?.slots[13]?.schedule).toEqual(0);
      expect(industry?.slots[13]?.start).toEqual(0);
      expect(industry?.slots[13]?.complete).toEqual(360);

      expect(hardware?.slots.length).toEqual(1);

      expect(hardware?.slots[0]?.slot).toEqual(1);
      expect(hardware?.slots[0]?.item.slug).toEqual('cooking-utensils');
      expect(hardware?.slots[0]?.schedule).toEqual(14);
      expect(hardware?.slots[0]?.start).toEqual(14);
      expect(hardware?.slots[0]?.complete).toEqual(59);

      expect(farmers?.slots.length).toEqual(4);

      expect(farmers?.slots[0]?.slot).toEqual(1);
      expect(farmers?.slots[0]?.item.slug).toEqual('flour-bag');
      expect(farmers?.slots[0]?.schedule).toEqual(185);
      expect(farmers?.slots[0]?.start).toEqual(185);
      expect(farmers?.slots[0]?.complete).toEqual(215);

      expect(farmers?.slots[1]?.slot).toEqual(2);
      expect(farmers?.slots[1]?.item.slug).toEqual('flour-bag');
      expect(farmers?.slots[1]?.schedule).toEqual(185);
      expect(farmers?.slots[1]?.start).toEqual(215);
      expect(farmers?.slots[1]?.complete).toEqual(245);

      expect(farmers?.slots[2]?.slot).toEqual(3);
      expect(farmers?.slots[2]?.item.slug).toEqual('cream');
      expect(farmers?.slots[2]?.schedule).toEqual(365);
      expect(farmers?.slots[2]?.start).toEqual(365);
      expect(farmers?.slots[2]?.complete).toEqual(440);

      expect(farmers?.slots[3]?.slot).toEqual(4);
      expect(farmers?.slots[3]?.item.slug).toEqual('beef');
      expect(farmers?.slots[3]?.schedule).toEqual(365);
      expect(farmers?.slots[3]?.start).toEqual(440);
      expect(farmers?.slots[3]?.complete).toEqual(590);

      expect(donuts?.slots.length).toEqual(1);
      expect(donuts?.slots[0]?.slot).toEqual(1);
      expect(donuts?.slots[0]?.item.slug).toEqual('bread-roll');
      expect(donuts?.slots[0]?.schedule).toEqual(425);
      expect(donuts?.slots[0]?.start).toEqual(425);
      expect(donuts?.slots[0]?.complete).toEqual(485);

      expect(homeApp?.slots.length).toEqual(1);
      expect(homeApp?.slots[0]?.slot).toEqual(1);
      expect(homeApp?.slots[0]?.item.slug).toEqual('bbg-grill');
      // expect(homeApp?.slots[0]?.schedule).toEqual(425);
      // expect(homeApp?.slots[0]?.start).toEqual(425);
      // expect(donuts?.slots[0]?.complete).toEqual(485);

      expect(fastFood?.slots.length).toEqual(1);
      expect(fastFood?.slots[0]?.slot).toEqual(1);
      expect(fastFood?.slots[0]?.item.slug).toEqual('burgers');

      // expect(findAll.cycles.length).toEqual(7);

      // expect(findAll.cycles[0]?.cycle).toEqual(1);
      // expect(findAll.cycles[0]?.items.length).toEqual(11);
      // expect(findAll.cycles[0]?.startProduction).toEqual(0);
      // expect(findAll.cycles[0]?.endProduction).toEqual(9);

      // // cooking
      // expect(findAll.cycles[0]?.cycle).toEqual(2);
      // expect(findAll.cycles[0]?.items.length).toEqual(1);
      // expect(findAll.cycles[0]?.startProduction).toEqual(14);
      // expect(findAll.cycles[0]?.endProduction).toEqual(59);

      // // bgg grill
      // expect(findAll.cycles[0]?.cycle).toEqual(3);
      // expect(findAll.cycles[0]?.items.length).toEqual(1);
      // expect(findAll.cycles[0]?.startProduction).toEqual(64);
      // expect(findAll.cycles[0]?.endProduction).toEqual(229);

      // // farmers items 1 180
      // expect(findAll.cycles[0]?.cycle).toEqual(4);
      // expect(findAll.cycles[0]?.items.length).toEqual(1);
      // expect(findAll.cycles[0]?.startProduction).toEqual(185);
      // expect(findAll.cycles[0]?.endProduction).toEqual(215);

      // // farmers items 2 cream - beef
      // expect(findAll.cycles[0]?.cycle).toEqual(5);
      // expect(findAll.cycles[0]?.items.length).toEqual(2);
      // expect(findAll.cycles[0]?.startProduction).toEqual(365);
      // expect(findAll.cycles[0]?.endProduction).toEqual(590);

      // // donuts bread roll
      // expect(findAll.cycles[0]?.cycle).toEqual(6);
      // expect(findAll.cycles[0]?.items.length).toEqual(1);
      // expect(findAll.cycles[0]?.startProduction).toEqual(435);
      // expect(findAll.cycles[0]?.endProduction).toEqual(495);

      // // burgers
      // expect(findAll.cycles[0]?.cycle).toEqual(6);
      // expect(findAll.cycles[0]?.items.length).toEqual(1);
      // expect(findAll.cycles[0]?.startProduction).toEqual(595);
      // expect(findAll.cycles[0]?.endProduction).toEqual(640);
    } finally {
      await client.close();
    }
  });

  test('find all items depends by list of ids - planks', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findAll: IItemModel[] | null = await itemRepository.findDepends([
      'planks',
    ]);

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }
    try {
      expect(findAll.length).toEqual(1);
      const findOne = findAll.find((a: IItemModel) => a.slug === 'wood');

      if (!findOne) {
        throw new Error('Missing Depends Item');
      }

      expect(findOne.name).toEqual('Wood');
      expect(findOne.slug).toEqual('wood');
      expect(findOne.productionTime).toEqual(3);
      expect(findOne.maxValue).toEqual(20);

      expect(findOne.depends.length).toEqual(0);
      expect(findOne.billTime).toEqual(0);
      expect(findOne.billCost).toEqual(0);
      expect(findOne.profitOwnProduction).toEqual(20);
    } finally {
      await client.close();
    }
  });

  test('find all items depends by list of ids - cherry', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findAll: IItemModel[] | null = await itemRepository.findDepends([
      'planks',
      'cherry-cheesecake',
    ]);

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }

    try {
      expect(findAll.length).toEqual(4);

      const findOne = findAll.find((a: IItemModel) => a.slug === 'flour-bag');

      if (!findOne) {
        throw new Error('Missing Depends');
      }

      expect(findOne.name).toEqual('Flour Bag');
      expect(findOne.slug).toEqual('flour-bag');
      expect(findOne.productionTime).toEqual(30);
      expect(findOne.maxValue).toEqual(570);

      expect(findOne.depends.length).toEqual(2);
      expect(findOne.billTime).toEqual(180);
      expect(findOne.billCost).toEqual(240);
      expect(findOne.profitOwnProduction).toEqual(330);
    } finally {
      await client.close();
    }
  });

  test('find all items depends by list of slugs of furniture', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findAll: IItemModel[] | null = await itemRepository.findDepends([
      'chairs',
      'cupboard',
      'couch',
      'home-textiles',
      'tablets',
    ]);

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }

    try {
      expect(findAll.length).toEqual(10);
    } finally {
      await client.close();
    }
  });

  test('find all items depends by furniture', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findAll: IItemModel[] | null = await itemRepository.findDependsByBuilding({
      building: 'furniture',
      order: 'asc',
      orderBy: 'maxValue',
      filter: {},
    });

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }

    try {
      expect(findAll.length).toEqual(10);
    } finally {
      await client.close();
    }
  });

  test('find all items used by list of ids - planks only', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));

      const findAll: IItemModel[] | null = await itemRepository.findUsedBy([
        'planks',
      ]);

      if (!findAll || findAll.length < 1) {
        throw new Error('Missing Planks by ID');
      }

      expect(findAll.length).toEqual(4);

      const findOne = findAll.find((a: IItemModel) => a.slug === 'cupboard');

      if (!findOne) {
        throw new Error('Missing Used In');
      }

      expect(findOne.name).toEqual('Cupboard');
      expect(findOne.slug).toEqual('cupboard');
      expect(findOne.productionTime).toEqual(45);
      expect(findOne.maxValue).toEqual(900);

      expect(findOne.depends.length).toEqual(3);
      expect(findOne.billTime).toEqual(300);
      expect(findOne.billCost).toEqual(800);
      expect(findOne.profitOwnProduction).toEqual(100);
    } finally {
      await client.close();
    }
  });

  test('find all items used by list of ids - planks and cheese', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));

      const findAll: IItemModel[] | null = await itemRepository.findUsedBy([
        'cheese',
        'planks',
      ]);

      if (!findAll || findAll.length < 1) {
        throw new Error('Missing Planks by ID');
      }

      expect(findAll.length).toEqual(7);

      const findOne = findAll.find((a: IItemModel) => a.slug === 'cupboard');

      if (!findOne) {
        throw new Error('Missing Used In');
      }

      expect(findOne.name).toEqual('Cupboard');
      expect(findOne.slug).toEqual('cupboard');
      expect(findOne.productionTime).toEqual(45);
      expect(findOne.maxValue).toEqual(900);

      expect(findOne.depends.length).toEqual(3);
      expect(findOne.billTime).toEqual(300);
      expect(findOne.billCost).toEqual(800);
      expect(findOne.profitOwnProduction).toEqual(100);
    } finally {
      await client.close();
    }
  });

  test('find all items used by list of slugs of farmer', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));

      const findAll: IItemModel[] | null = await itemRepository.findUsedBy([
        'beef',
        'corn',
        'vegetables',
        'fruit-and-berries',
        'flour-bag',
        'cream',
        'cheese',
      ]);

      if (!findAll || findAll.length < 1) {
        throw new Error('Missing Planks by ID');
      }

      expect(findAll.length).toEqual(12);
    } finally {
      await client.close();
    }
  });

  test('find all items used by farmer', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection('item'));

      const findAll: IItemModel[] | null = await itemRepository.findUsedByBuilding({
        building: 'farmers',
        order: 'asc',
        orderBy: 'maxValue',
        filter: {},
      });

      if (!findAll || findAll.length < 1) {
        throw new Error('Missing Planks by ID');
      }

      expect(findAll.length).toEqual(12);
    } finally {
      await client.close();
    }
  });

  test('find many by filter', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findAll: IItemModel[] = await itemRepository.findManyByFilter(
      { filter: { level: 5 }, order: 'asc', orderBy: 'maxValue' },
    );

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }
    try {
      expect(findAll.length).toEqual(6);
      return;
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - Planks', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: IItemModel | null = await itemRepository.findOneBySlug(
      'planks',
    );

    if (!findOne) {
      throw new Error('Missing Planks by ID');
    }

    try {
      expect(findOne.name).toEqual('Planks');
      expect(findOne.slug).toEqual('planks');
      expect(findOne.productionTime).toEqual(30);
      expect(findOne.maxValue).toEqual(120);

      expect(findOne.depends.length).toEqual(1);
      expect(findOne.billTime).toEqual(3);
      expect(findOne.billCost).toEqual(40);
      expect(findOne.profitOwnProduction).toEqual(80);
      return;
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - Cherry cheesecake', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: IItemModel | null = await itemRepository.findOneBySlug(
      'cherry-cheesecake',
    );
    if (!findOne) {
      throw new Error('Cherry Cheesecake not found');
    }

    try {
      expect(findOne.name).toEqual('Cherry Cheesecake');
      expect(findOne.slug).toEqual('cherry-cheesecake');
      expect(findOne.productionTime).toEqual(90);
      expect(findOne.maxValue).toEqual(2240);

      expect(findOne.depends.length).toEqual(3);
      expect(findOne.billCost).toEqual(1960);
      expect(findOne.profitOwnProduction).toEqual(280);
      expect(findOne.billTime).toEqual(465);
      return;
      // to add
      // expect(findOne.totalProductionTime).toEqual(555);
      // expect(findOne.hourProfitOwnProduction).toEqual(280);
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - burgers', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: IItemModel | null = await itemRepository.findOneBySlug(
      'burgers',
    );

    if (!findOne) {
      throw new Error('Burgers not found');
    }
    try {
      expect(findOne.name).toEqual('Burgers');
      expect(findOne.slug).toEqual('burgers');
      expect(findOne.productionTime).toEqual(35);
      expect(findOne.maxValue).toEqual(3620);

      expect(findOne.depends.length).toEqual(3);
      expect(findOne.billCost).toEqual(3230);
      expect(findOne.profitOwnProduction).toEqual(390);

      /** @TODO add not parallel sum to */
      // expect(findOne.billTime).toEqual(150+105+360);
      expect(findOne.billTime).toEqual(510);
      return;
      // to add
      // expect(findOne.totalProductionTime).toEqual(555);
      // expect(findOne.hourProfitOwnProduction).toEqual(280);
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });

  test('get wood by slug', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));
    const findOne: IItemModel | null = await itemRepository.findOneBySlug(
      'wood',
    );
    if (!findOne) {
      throw new Error('Wood not found');
    }

    try {
      expect(findOne.maxValue).toEqual(20);
      expect(findOne.level).toEqual(2);
      expect(findOne.depends.length).toEqual(0);
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - green smoothie', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: IItemModel | null = await itemRepository.findOneBySlug(
      'green-smoothie',
    );

    if (!findOne) {
      throw new Error('Green Smoothie not found');
    }

    try {
      expect(findOne.name).toEqual('Green Smoothie');
      expect(findOne.slug).toEqual('green-smoothie');
      expect(findOne.productionTime).toEqual(30);
      expect(findOne.maxValue).toEqual(1150);

      expect(findOne.depends.length).toEqual(2);
      expect(findOne.billCost).toEqual(890);
      expect(findOne.profitOwnProduction).toEqual(260);
      /** @TODO parallel sum */
      // expect(findOne.billTime).toEqual(219);
      expect(findOne.billTime).toEqual(180);
      // return;
      // to add
      // expect(findOne.totalProductionTime).toEqual(555);
      // expect(findOne.hourProfitOwnProduction).toEqual(280);
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - pizza', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: IItemModel | null = await itemRepository.findOneBySlug(
      'pizza',
    );
    if (!findOne) {
      throw new Error('Pizza not found');
    }
    try {
      expect(findOne.name).toEqual('Pizza');
      expect(findOne.slug).toEqual('pizza');
      expect(findOne.productionTime).toEqual(24);
      expect(findOne.maxValue).toEqual(2560);

      expect(findOne.depends.length).toEqual(3);
      expect(findOne.billCost).toEqual(2090);
      expect(findOne.profitOwnProduction).toEqual(470);
      /** @TODO sequential parallel sum */
      // expect(findOne.billTime).toEqual(615);
      expect(findOne.billTime).toEqual(510);

      // to add
      // expect(findOne.totalProductionTime).toEqual(555);
      // expect(findOne.hourProfitOwnProduction).toEqual(280);
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - lemonade', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: IItemModel | null = await itemRepository.findOneBySlug(
      'lemonade',
    );
    if (!findOne) {
      throw new Error('Lemonade not found');
    }
    try {
      expect(findOne.name).toEqual('Lemonade');
      expect(findOne.slug).toEqual('lemonade');
      expect(findOne.productionTime).toEqual(60);
      expect(findOne.maxValue).toEqual(1690);

      expect(findOne.depends.length).toEqual(3);
      expect(findOne.billCost).toEqual(1190);
      expect(findOne.profitOwnProduction).toEqual(500);
      expect(findOne.billTime).toEqual(300);
      return;
      // to add
      // expect(findOne.totalProductionTime).toEqual(555);
      // expect(findOne.hourProfitOwnProduction).toEqual(280);
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - Fire Pit', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: IItemModel | null = await itemRepository.findOneBySlug(
      'fire-pit',
    );
    if (!findOne) {
      throw new Error('Fire Pit not found');
    }
    try {
      expect(findOne.name).toEqual('Fire Pit');
      expect(findOne.slug).toEqual('fire-pit');
      expect(findOne.productionTime).toEqual(240);
      expect(findOne.maxValue).toEqual(1740);

      expect(findOne.depends.length).toEqual(3);
      expect(findOne.billCost).toEqual(1410);
      expect(findOne.profitOwnProduction).toEqual(330);
      expect(findOne.billTime).toEqual(220);
      return;
      // to add
      // expect(findOne.totalProductionTime).toEqual(555);
      // expect(findOne.hourProfitOwnProduction).toEqual(280);
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - flour bag', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: IItemModel | null = await itemRepository.findOneBySlug(
      'flour-bag',
    );

    if (!findOne) {
      throw new Error('Flour Bag not found');
    }

    try {
      expect(findOne.name).toEqual('Flour Bag');
      expect(findOne.slug).toEqual('flour-bag');
      expect(findOne.productionTime).toEqual(30);
      expect(findOne.maxValue).toEqual(570);

      expect(findOne.depends.length).toEqual(2);
      expect(findOne.billCost).toEqual(240);
      expect(findOne.profitOwnProduction).toEqual(330);
      // to add
      expect(findOne.billTime).toEqual(180);
      return;
      // expect(findOne.totalProductionTime).toEqual(555);
      // expect(findOne.hourProfitOwnProduction).toEqual(280);
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - donuts', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: IItemModel | null = await itemRepository.findOneBySlug(
      'donuts',
    );

    if (!findOne) {
      throw new Error('Donuts not found');
    }

    try {
      expect(findOne.name).toEqual('Donuts');
      expect(findOne.slug).toEqual('donuts');
      expect(findOne.productionTime).toEqual(45);
      expect(findOne.maxValue).toEqual(950);
      expect(findOne.billCost).toEqual(680);
      expect(findOne.depends.length).toEqual(2);
      expect(findOne.billTime).toEqual(240);
      expect(findOne.profitOwnProduction).toEqual(270);
      expect(findOne.profitOwnByMinute).toEqual(6);
      expect(findOne.profitOwnByHour).toEqual(360);

      // to add
      // expect(findOne.totalProductionTime).toEqual(555);
      // expect(findOne.hourProfitOwnProduction).toEqual(280);
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - bread roll', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: IItemModel | null = await itemRepository.findOneBySlug(
      'bread-roll',
    );

    if (!findOne) {
      throw new Error('Bread Roll not found');
    }

    try {
      expect(findOne.name).toEqual('Bread Roll');
      expect(findOne.slug).toEqual('bread-roll');
      expect(findOne.productionTime).toEqual(60);
      expect(findOne.maxValue).toEqual(1840);

      expect(findOne.depends.length).toEqual(2);
      expect(findOne.billCost).toEqual(1580);
      expect(findOne.profitOwnProduction).toEqual(260);
      expect(findOne.billTime).toEqual(435);
      return;
      // to add
      // expect(findOne.totalProductionTime).toEqual(555);
      // expect(findOne.hourProfitOwnProduction).toEqual(280);
    } catch (e) {
      throw new Error(e);
    } finally {
      await client.close();
    }
  });
});
