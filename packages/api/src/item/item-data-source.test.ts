import { MongoClient } from 'mongodb';
import {
  IItemModel,
  IItemProfit,
  IItemProfitDependency,
} from '@pbr-simcity/types/types';

import ItemRepository from '@pbr-simcity/api/src/item/itemRepository';
import ItemDataSource from '@pbr-simcity/api/src/item/itemDataSource';

const mongoStr = 'mongodb://localhost:27017/simcity';

const collection = 'item';

describe('Item Data Source', () => {
  test('resolve find all', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection(collection));
      const itemDataSource = new ItemDataSource(itemRepository);

      const args = {
        filter: {
          level: 50,
        },
        order: 'asc',
        orderBy: 'maxValue',
      };

      const items: IItemModel[] | null = await itemDataSource.resolveFindAll(args);

      expect(items.length).toEqual(63);

      expect(items[0]?.slug).toEqual('metal');
      expect(items[items.length - 1]?.slug).toEqual('burgers');

      const itemBySlug = items.find((a: IItemModel) => a.slug === 'planks');

      if (!itemBySlug) {
        throw new Error('Missing item by slug');
      }

      expect(itemBySlug.name).toEqual('Planks');
      expect(itemBySlug.slug).toEqual('planks');
      expect(itemBySlug.billCost).toEqual(40);
      // expect(itemBySlug.stars).toEqual(0);
    } finally {
      await client.close();
    }
  });
});

describe('Items Profit - Critical Path', () => {
  const itemsCriticalPath = [
    {
      _id: '6067df64e0fc61d7365eb58c',
      name: 'Metal',
      level: 1,
      building: '6067df64e0fc61d7365eb582',
      slug: 'metal',
      productionTime: 1,
      maxValue: 10,
      billTime: 0,
      billCost: 0,
      profitOwnProduction: 10,
      profitOwnByMinute: 10,
      depends: [],
      profitOwnByHour: 600,
      quantity: 5,
    },
    {
      _id: '6067df64e0fc61d7365eb58d',
      name: 'Wood',
      level: 2,
      building: '6067df64e0fc61d7365eb582',
      slug: 'wood',
      productionTime: 3,
      maxValue: 20,
      billTime: 0,
      billCost: 0,
      profitOwnProduction: 20,
      profitOwnByMinute: 6.666666666666667,
      depends: [],
      profitOwnByHour: 400,
      quantity: 2,
    },
    {
      _id: '6067df64e0fc61d7365eb58e',
      name: 'Plastic',
      level: 5,
      building: '6067df64e0fc61d7365eb582',
      slug: 'plastic',
      productionTime: 9,
      maxValue: 25,
      billTime: 0,
      billCost: 0,
      profitOwnProduction: 25,
      profitOwnByMinute: 2.7777777777777777,
      depends: [],
      profitOwnByHour: 166.66666666666666,
      quantity: 2,
    },
    {
      _id: '6067df64e0fc61d7365eb58f',
      name: 'Seeds',
      level: 7,
      building: '6067df64e0fc61d7365eb582',
      slug: 'seeds',
      productionTime: 20,
      maxValue: 30,
      billTime: 0,
      billCost: 0,
      profitOwnProduction: 30,
      profitOwnByMinute: 1.5,
      depends: [],
      profitOwnByHour: 90,
      quantity: 2,
    },
    {
      _id: '6067df64e0fc61d7365eb592',
      name: 'Textiles',
      level: 15,
      building: '6067df64e0fc61d7365eb582',
      slug: 'textiles',
      productionTime: 180,
      maxValue: 90,
      billTime: 0,
      billCost: 0,
      profitOwnProduction: 90,
      profitOwnByMinute: 0.5,
      depends: [],
      profitOwnByHour: 30,
      quantity: 2,
    },
    {
      _id: '6067df64e0fc61d7365eb5a0',
      name: 'Cooking Utensils',
      level: 17,
      building: '6067df64e0fc61d7365eb584',
      slug: 'cooking-utensils',
      productionTime: 45,
      maxValue: 250,
      billTime: 9,
      billCost: 110,
      profitOwnProduction: 140,
      profitOwnByMinute: 3.111111111111111,
      depends: [
        { item: '6067df64e0fc61d7365eb58d', quantity: 2 },
        { item: '6067df64e0fc61d7365eb58c', quantity: 2 },
        { item: '6067df64e0fc61d7365eb58e', quantity: 2 },
      ],
      profitOwnByHour: 186.66666666666666,
      quantity: 1,
    },
    {
      _id: '6067df64e0fc61d7365eb5aa',
      name: 'Flour Bag',
      level: 17,
      building: '6067df64e0fc61d7365eb585',
      slug: 'flour-bag',
      productionTime: 30,
      maxValue: 570,
      billTime: 180,
      billCost: 240,
      profitOwnProduction: 330,
      profitOwnByMinute: 11,
      depends: [
        { item: '6067df64e0fc61d7365eb592', quantity: 2 },
        { item: '6067df64e0fc61d7365eb58f', quantity: 2 },
      ],
      profitOwnByHour: 660,
      quantity: 2,
    },
    {
      _id: '6067df64e0fc61d7365eb5ac',
      name: 'Cream',
      level: 23,
      building: '6067df64e0fc61d7365eb585',
      slug: 'cream',
      productionTime: 75,
      maxValue: 440,
      billTime: 360,
      billCost: 140,
      profitOwnProduction: 300,
      profitOwnByMinute: 4,
      depends: [{ item: '6067df64e0fc61d7365eb595', quantity: 1 }],
      profitOwnByHour: 240,
      quantity: 1,
    },
    {
      _id: '6067df64e0fc61d7365eb595',
      name: 'Animal Feed',
      level: 23,
      building: '6067df64e0fc61d7365eb582',
      slug: 'animal-feed',
      productionTime: 360,
      maxValue: 140,
      billTime: 0,
      billCost: 0,
      profitOwnProduction: 140,
      profitOwnByMinute: 0.3888888888888889,
      depends: [],
      profitOwnByHour: 23.333333333333332,
      quantity: 4,
    },
    {
      _id: '6067df64e0fc61d7365eb5b7',
      name: 'Bread Roll',
      level: 24,
      building: '6067df64e0fc61d7365eb588',
      slug: 'bread-roll',
      productionTime: 60,
      maxValue: 1840,
      billTime: 435,
      billCost: 1580,
      profitOwnProduction: 260,
      profitOwnByMinute: 4.333333333333333,
      depends: [
        { item: '6067df64e0fc61d7365eb5ac', quantity: 1 },
        { item: '6067df64e0fc61d7365eb5aa', quantity: 2 },
      ],
      profitOwnByHour: 260,
      quantity: 1,
    },
    {
      _id: '6067df64e0fc61d7365eb5af',
      name: 'Beef',
      level: 27,
      building: '6067df64e0fc61d7365eb585',
      slug: 'beef',
      productionTime: 150,
      maxValue: 860,
      billTime: 360,
      billCost: 420,
      profitOwnProduction: 440,
      profitOwnByMinute: 2.933333333333333,
      depends: [{ item: '6067df64e0fc61d7365eb595', quantity: 3 }],
      profitOwnByHour: 176,
      quantity: 1,
    },
    {
      _id: '6067df64e0fc61d7365eb5c6',
      name: 'BBG Grill',
      level: 29,
      building: '6067df64e0fc61d7365eb58b',
      slug: 'bbg-grill',
      productionTime: 165,
      maxValue: 530,
      billTime: 54,
      billCost: 280,
      profitOwnProduction: 250,
      profitOwnByMinute: 1.5151515151515151,
      depends: [
        { item: '6067df64e0fc61d7365eb58c', quantity: 3 },
        { item: '6067df64e0fc61d7365eb5a0', quantity: 1 },
      ],
      profitOwnByHour: 90.9090909090909,
      quantity: 1,
    },
    {
      _id: '6067df64e0fc61d7365eb5c2',
      name: 'Burgers',
      level: 31,
      building: '6067df64e0fc61d7365eb58a',
      slug: 'burgers',
      productionTime: 35,
      maxValue: 3620,
      billTime: 510,
      billCost: 3230,
      profitOwnProduction: 390,
      profitOwnByMinute: 11.142857142857142,
      depends: [
        { item: '6067df64e0fc61d7365eb5af', quantity: 1 },
        { item: '6067df64e0fc61d7365eb5b7', quantity: 1 },
        { item: '6067df64e0fc61d7365eb5c6', quantity: 1 },
      ],
      profitOwnByHour: 668.5714285714286,
      quantity: 1,
    },
  ];

  const burgers = {
    _id: '6067df64e0fc61d7365eb5c2',
    name: 'Burgers',
    level: 31,
    building: '6067df64e0fc61d7365eb58a',
    slug: 'burgers',
    productionTime: 35,
    maxValue: 3620,
    billTime: 510,
    billCost: 3230,
    profitOwnProduction: 390,
    profitOwnByMinute: 11.142857142857142,
    depends: [
      { item: '6067df64e0fc61d7365eb5af', quantity: 1 },
      { item: '6067df64e0fc61d7365eb5b7', quantity: 1 },
      { item: '6067df64e0fc61d7365eb5c6', quantity: 1 },
    ],
    profitOwnByHour: 668.5714285714286,
    quantity: 1,
  };

  const breadRoll = {
    _id: '6067df64e0fc61d7365eb5b7',
    name: 'Bread Roll',
    level: 24,
    building: '6067df64e0fc61d7365eb588',
    slug: 'bread-roll',
    productionTime: 60,
    maxValue: 1840,
    billTime: 435,
    billCost: 1580,
    profitOwnProduction: 260,
    profitOwnByMinute: 4.333333333333333,
    depends: [
      { item: '6067df64e0fc61d7365eb5ac', quantity: 1 },
      { item: '6067df64e0fc61d7365eb5aa', quantity: 2 },
    ],
    usedIn: [],
    profitOwnByHour: 260,
    // quantity: 1,
  };

  const bbgGrill = {
    _id: '6067df64e0fc61d7365eb5c6',
    name: 'BBG Grill',
    level: 29,
    building: '6067df64e0fc61d7365eb58b',
    slug: 'bbg-grill',
    productionTime: 165,
    maxValue: 530,
    billTime: 54,
    billCost: 280,
    profitOwnProduction: 250,
    profitOwnByMinute: 1.5151515151515151,
    depends: [
      { item: '6067df64e0fc61d7365eb58c', quantity: 3 },
      { item: '6067df64e0fc61d7365eb5a0', quantity: 1 },
    ],
    profitOwnByHour: 90.9090909090909,
    quantity: 1,
  };

  const beef = {
    _id: '6067df64e0fc61d7365eb5af',
    name: 'Beef',
    level: 27,
    building: '6067df64e0fc61d7365eb585',
    slug: 'beef',
    productionTime: 150,
    maxValue: 860,
    billTime: 360,
    billCost: 420,
    profitOwnProduction: 440,
    profitOwnByMinute: 2.933333333333333,
    depends: [{ item: '6067df64e0fc61d7365eb595', quantity: 3 }],
    profitOwnByHour: 176,
    quantity: 1,
  };

  test('critical path - bread roll', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      /** @ts-ignore */
      const criticalPath = ItemDataSource.getItemCriticalPath(breadRoll, itemsCriticalPath);
      expect(criticalPath).toEqual(440);
    } finally {
      await client.close();
    }
  });

  test('critical path - burgers', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      /** @ts-ignore */
      const criticalPath = ItemDataSource.getItemCriticalPath(burgers, itemsCriticalPath);
      expect(criticalPath).toEqual(555);
    } finally {
      await client.close();
    }
  });

  test('critical path - beefs', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      /** @ts-ignore */
      const criticalPath = ItemDataSource.getItemCriticalPath(beef, itemsCriticalPath);
      expect(criticalPath).toEqual(365);
    } finally {
      await client.close();
    }
  });

  test('critical path - bbg grill', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      /** @ts-ignore */
      const criticalPath = ItemDataSource.getItemCriticalPath(bbgGrill, itemsCriticalPath);
      expect(criticalPath).toEqual(59);
    } finally {
      await client.close();
    }
  });

  test('workflow - planks', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection(collection));
      const itemDataSource = new ItemDataSource(itemRepository);

      const findAll: IItemProfit = await itemDataSource.resolveItemProfit(
        'planks',
      );

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
      const itemRepository = new ItemRepository(client.db().collection(collection));
      const itemDataSource = new ItemDataSource(itemRepository);

      const findAll: IItemProfit = await itemDataSource.resolveItemProfit(
        'pizza',
      );

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
      const itemRepository = new ItemRepository(client.db().collection(collection));
      const itemDataSource = new ItemDataSource(itemRepository);
      const findAll: IItemModel[] = await itemDataSource.flatItemsFromDependency(
        'burgers',
      );

      expect(findAll.length).toEqual(13);
    } finally {
      await client.close();
    }
  });

  test('flat items from dependency - lemonade', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection(collection));
      const itemDataSource = new ItemDataSource(itemRepository);
      const findAll: IItemProfitDependency[] = await itemDataSource.flatItemsFromDependency(
        'lemonade',
      );

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
      const itemRepository = new ItemRepository(client.db().collection(collection));
      const itemDataSource = new ItemDataSource(itemRepository);

      const findAll: IItemModel[] = await itemDataSource.flatItemsFromDependency(
        'textiles',
      );

      expect(findAll.length).toEqual(1);
    } finally {
      await client.close();
    }
  });

  test('flat items from dependency - shoes', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection(collection));
      const itemDataSource = new ItemDataSource(itemRepository);

      const findAll: IItemModel[] = await itemDataSource.flatItemsFromDependency(
        'shoes',
      );

      expect(findAll.length).toEqual(5);
    } finally {
      await client.close();
    }
  });

  test('workflow - shoes', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    try {
      const itemRepository = new ItemRepository(client.db().collection(collection));
      const itemDataSource = new ItemDataSource(itemRepository);

      const findAll: IItemProfit = await itemDataSource.resolveItemProfit(
        'shoes',
      );

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
      const itemRepository = new ItemRepository(client.db().collection(collection));
      const itemDataSource = new ItemDataSource(itemRepository);

      const findAll: IItemProfit = await itemDataSource.resolveItemProfit(
        'cream',
      );

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
      const itemRepository = new ItemRepository(client.db().collection(collection));
      const itemDataSource = new ItemDataSource(itemRepository);

      const findAll: IItemProfit = await itemDataSource.resolveItemProfit(
        'textiles',
      );

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
      const itemRepository = new ItemRepository(client.db().collection(collection));
      const itemDataSource = new ItemDataSource(itemRepository);

      const findAll: IItemProfit = await itemDataSource.resolveItemProfit(
        'burgers',
      );

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
});
