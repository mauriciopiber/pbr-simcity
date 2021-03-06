import { MongoClient /* ObjectID */ } from 'mongodb';
import {
  IItemModel,
  IItemDoc,
} from '@pbr-simcity/types/types';

import ItemRepository from '@pbr-simcity/api/src/item/itemRepository';

describe('Item Repository', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let client: any;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let itemRepository: any;

  beforeEach(async () => {
    const mongoStr = 'mongodb://localhost:27017/simcity';
    client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    itemRepository = new ItemRepository(client.db().collection('item'));
  });

  afterEach(async () => {
    await client.close();
  });

  test('find all items depends by list of ids - planks', async () => {
    const findAll: IItemModel[] | null = await itemRepository.findDependsByItemsSlugs(
      ['planks'],
      {
        $match: {},
      },
      {
        $sort: {
          maxValue: 1,
        },
      },
    );

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }

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
  });

  test('find all items depends by list of ids - pizza', async () => {
    const findAll: IItemModel[] | null = await itemRepository.findDependsByItemsSlugs(
      ['pizza'],
      {
        $match: null,
      },
      {
        $sort: {
          maxValue: 1,
        },
      },
    );

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Pizza by Slug');
    }

    expect(findAll.length).toEqual(3);
    const findOne = findAll.find((a: IItemModel) => a.slug === 'beef');

    if (!findOne) {
      throw new Error('Missing Depends Item');
    }

    expect(findOne.name).toEqual('Beef');
    expect(findOne.slug).toEqual('beef');
    expect(findOne.productionTime).toEqual(150);
    expect(findOne.maxValue).toEqual(860);

    expect(findOne.depends.length).toEqual(1);
    expect(findOne.billTime).toEqual(360);
    expect(findOne.billCost).toEqual(420);
    expect(findOne.profitOwnProduction).toEqual(440);
  });

  test('find all items depends by list of ids - cherry', async () => {
    const findAll: IItemModel[] | null = await itemRepository.findDependsByItemsSlugs([
      'planks',
      'cherry-cheesecake',
    ], {
      $match: {},
    }, {
      $sort: { level: -1 },
    });

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }

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
  });

  test('find all items depends by list of slugs of furniture', async () => {
    const findAll: IItemModel[] | null = await itemRepository.findDependsByItemsSlugs([
      'chairs',
      'cupboard',
      'couch',
      'home-textiles',
      'tablets',
    ], {
      $match: {},
    }, {
      $sort: { level: -1 },
    });

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }

    expect(findAll.length).toEqual(10);
  });

  test('find all items depends by furniture', async () => {
    const findAll:
      | IItemModel[]
      | null = await itemRepository.findDependsByBuildingSlug(
        'furniture',
        {
          $match: {},
        }, {
          $sort: { level: -1 },
        },
      );

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }

    expect(findAll.length).toEqual(10);
  });

  test('find all items used by list of ids - planks only', async () => {
    const findAll: IItemModel[] | null = await itemRepository.findUsedInByItemsSlugs([
      'planks',
    ], {
      $match: {},
    }, {
      $sort: { level: -1 },
    });

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
  });

  test('find all items used by list of ids - planks and cheese', async () => {
    const findAll: IItemModel[] | null = await itemRepository.findUsedInByItemsSlugs([
      'cheese',
      'planks',
    ], {
      $match: {},
    }, {
      $sort: { level: -1 },
    });

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
  });

  test('find all items used by list of slugs of farmer', async () => {
    const findAll: IItemModel[] | null = await itemRepository.findUsedInByItemsSlugs([
      'beef',
      'corn',
      'vegetables',
      'fruit-and-berries',
      'flour-bag',
      'cream',
      'cheese',
    ], {
      $match: {},
    }, {
      $sort: {
        level: -1,
      },
    });

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }

    expect(findAll.length).toEqual(12);
  });

  test('find all items used by farmer', async () => {
    const findAll: IItemModel[] = await itemRepository.findUsedInByBuildingSlug(
      'farmers',
      {
        $match: {},
      },
      {
        $sort: {
          maxValue: -1,
        },
      },
    );

    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }

    expect(findAll.length).toEqual(12);
  });

  test('find many by filter', async () => {
    const findAll: IItemModel[] = await itemRepository.findAll(
      {
        $match: { level: { $lte: 5 } },
      },
      {
        $sort: {
          maxValue: -1,
        },
      },
    );


    if (!findAll || findAll.length < 1) {
      throw new Error('Missing Planks by ID');
    }

    expect(findAll.length).toEqual(6);
  });

  test('find one by id full data - Planks', async () => {
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
    }
  });

  test('find one by id full data - Cherry cheesecake', async () => {
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
    }
  });

  test('find one by id full data - burgers', async () => {
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
    }
  });

  test('get wood by slug', async () => {
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
    }
  });

  test('find one by id full data - green smoothie', async () => {
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
    }
  });

  test('find one by id full data - pizza', async () => {
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
    }
  });

  test('find one by id full data - lemonade', async () => {
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
    }
  });

  test('find one by id full data - Fire Pit', async () => {
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
    }
  });

  test('find one by id full data - flour bag', async () => {
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
    }
  });

  test('find one by id full data - donuts', async () => {
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
    }
  });

  test('find one by id full data - bread roll', async () => {
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
    }
  });

  test('find find doc - bread roll', async () => {
    const findOne: IItemDoc | null = await itemRepository.findDoc('bread-roll');

    if (!findOne) {
      throw new Error('Bread Roll not found');
    }

    try {
      expect(findOne.name).toEqual('Bread Roll');
      expect(findOne.slug).toEqual('bread-roll');
      expect(findOne.productionTime).toEqual(60);
      expect(findOne.maxValue).toEqual(1840);

      expect(findOne.depends.length).toEqual(2);
      return;
      // to add
      // expect(findOne.totalProductionTime).toEqual(555);
      // expect(findOne.hourProfitOwnProduction).toEqual(280);
    } catch (e) {
      throw new Error(e);
    }
  });
});
