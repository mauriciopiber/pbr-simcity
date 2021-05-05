import { MongoClient } from 'mongodb';
import {
  IItemModel,
  IItemProfit,
  IItemProfitDependency,
  IItemDependencyGraph,
  IItemProfitBuilding,
} from '@pbr-simcity/types/types';

import ItemRepository from '@pbr-simcity/api/src/item/itemRepository';
import ItemDataSource from '@pbr-simcity/api/src/item/itemDataSource';

describe('Item Data Source', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let client: any;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let itemDataSource: any;

  beforeEach(async () => {
    const mongoStr = 'mongodb://localhost:27017/simcity';
    client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));
    itemDataSource = new ItemDataSource(itemRepository);
  });

  afterEach(async () => {
    await client.close();
  });

  test('resolve find all', async () => {
    const args = {
      filter: {
        level: 50,
      },
      order: 'asc',
      orderBy: 'maxValue',
    };

    const items: IItemModel[] = await itemDataSource.resolveFindAll(args);

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
  });

  test('get dependency graph for - pizza', async () => {
    const item: IItemDependencyGraph = await itemDataSource.resolveItemDependencyGraph(
      'pizza',
    );

    expect(item.slug).toEqual('pizza');
    expect(item.criticalPath).toEqual(615);
  });

  test('get dependency graph for - burgers', async () => {
    const item: IItemDependencyGraph = await itemDataSource.resolveItemDependencyGraph(
      'burgers',
    );
    expect(item.slug).toEqual('burgers');
    expect(item.criticalPath).toEqual(510);
  });

  test('get dependency graph for - shoes', async () => {
    const item: IItemDependencyGraph = await itemDataSource.resolveItemDependencyGraph(
      'shoes',
    );
    expect(item.slug).toEqual('shoes');
    expect(item.criticalPath).toEqual(180);
  });
});

describe('Items Profit - Critical Path', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let client: any;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let itemDataSource: any;

  beforeEach(async () => {
    const mongoStr = 'mongodb://localhost:27017/simcity';
    client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));
    itemDataSource = new ItemDataSource(itemRepository);
  });

  afterEach(async () => {
    await client.close();
  });

  test('workflow - planks', async () => {
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
    expect(findAll.buildings).toHaveProperty('donut');
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
    expect(supplies?.slots[0]?.schedule).toEqual(3);
    expect(supplies?.slots[0]?.start).toEqual(3);
    expect(supplies?.slots[0]?.complete).toEqual(33);

    // expect(findAll.cycles.length).toEqual(2);

    // expect(findAll.cycles[0]?.cycle).toEqual(1);
    // expect(findAll.cycles[0]?.items.length).toEqual(2);
    // expect(findAll.cycles[0]?.startProduction).toEqual(0);
    // expect(findAll.cycles[0]?.endProduction).toEqual(3);

    // expect(findAll.cycles[1]?.cycle).toEqual(2);
    // expect(findAll.cycles[0]?.items.length).toEqual(1);
    // expect(findAll.cycles[0]?.startProduction).toEqual(8);
    // expect(findAll.cycles[0]?.endProduction).toEqual(38);
  });

  test('workflow - pizza', async () => {
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
    expect(farmers?.slots[0]?.schedule).toEqual(180);
    expect(farmers?.slots[0]?.start).toEqual(180);
    expect(farmers?.slots[0]?.complete).toEqual(210);

    expect(farmers?.slots[1]?.slot).toEqual(2);
    expect(farmers?.slots[1]?.item.slug).toEqual('cheese');
    expect(farmers?.slots[1]?.schedule).toEqual(360);
    expect(farmers?.slots[1]?.start).toEqual(360);
    expect(farmers?.slots[1]?.complete).toEqual(465);

    expect(farmers?.slots[2]?.slot).toEqual(3);
    expect(farmers?.slots[2]?.item.slug).toEqual('beef');
    expect(farmers?.slots[2]?.schedule).toEqual(360);
    expect(farmers?.slots[2]?.start).toEqual(465);
    expect(farmers?.slots[2]?.complete).toEqual(615);

    expect(fastFood?.slots[0]?.slot).toEqual(1);
    expect(fastFood?.slots[0]?.item.slug).toEqual('pizza');
    expect(fastFood?.slots[0]?.schedule).toEqual(615);
    expect(fastFood?.slots[0]?.start).toEqual(615);
    expect(fastFood?.slots[0]?.complete).toEqual(639);

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
  });

  function expectSlot(
    building: IItemProfitBuilding | undefined,
    slot: number,
    slug: string,
    schedule: number,
    start: number,
    complete: number,
  ) {
    if (!building) {
      throw new Error('Building undefined');
    }
    const index = slot - 1;

    expect(building?.slots[index]?.slot).toEqual(1);
    expect(building?.slots[index]?.item.slug).toEqual(slug);
    expect(building?.slots[index]?.schedule).toEqual(schedule);
    expect(building?.slots[index]?.start).toEqual(start);
    expect(building?.slots[index]?.complete).toEqual(complete);
  }

  test('workflow - path - cement', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'cement',
    );
    const { supplies } = itemProfit.buildings;

    expectSlot(supplies, 1, 'cement', 120, 120, 170);
  });

  test('workflow - path - bricks', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'bricks',
    );
    const { supplies } = itemProfit.buildings;

    expectSlot(supplies, 1, 'bricks', 30, 30, 50);
  });

  test('workflow - path - glue', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'glue',
    );
    const { supplies } = itemProfit.buildings;

    expectSlot(supplies, 1, 'glue', 120, 120, 180);
  });

  test('workflow - path - planks', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'planks',
    );
    const { supplies } = itemProfit.buildings;

    expectSlot(supplies, 1, 'planks', 3, 3, 33);
  });

  test('workflow - path - paint', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'paint',
    );
    const { supplies } = itemProfit.buildings;

    expectSlot(supplies, 1, 'paint', 120, 120, 180);
  });

  test('workflow - path - nails', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'nails',
    );
    const { supplies } = itemProfit.buildings;

    expectSlot(supplies, 1, 'nails', 1, 1, 6);
  });

  test('workflow - path - hammer', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'hammer',
    );
    const { hardware } = itemProfit.buildings;

    expectSlot(hardware, 1, 'hammer', 3, 3, 17);
  });

  test('workflow - path - drill', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'drill',
    );
    const { hardware } = itemProfit.buildings;

    expectSlot(hardware, 1, 'drill', 420, 420, 540);
  });

  test('workflow - path - measuring-tape', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'measuring-tape',
    );
    const { hardware } = itemProfit.buildings;

    expectSlot(hardware, 1, 'measuring-tape', 9, 9, 29);
  });

  test('workflow - path - ladder', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'ladder',
    );
    const { hardware } = itemProfit.buildings;

    expectSlot(hardware, 1, 'ladder', 63, 63, 123);
  });

  test('workflow - path - shovel', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'shovel',
    );
    const { hardware } = itemProfit.buildings;

    expectSlot(hardware, 1, 'shovel', 9, 9, 39);
  });

  test('workflow - path - cooking-utensils', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'cooking-utensils',
    );
    const { hardware } = itemProfit.buildings;

    expectSlot(hardware, 1, 'cooking-utensils', 9, 9, 54);
  });

  test('workflow - path - backpack', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'backpack',
    );
    const { fashion } = itemProfit.buildings;

    expectSlot(fashion, 1, 'backpack', 180, 180, 330);
  });

  test('workflow - path - business-suits', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'business-suits',
    );
    const { fashion } = itemProfit.buildings;

    expectSlot(fashion, 1, 'business-suits', 180, 180, 390);
  });

  test('workflow - path - watch', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'watch',
    );
    const { fashion } = itemProfit.buildings;

    expectSlot(fashion, 1, 'watch', 300, 300, 390);
  });

  test('workflow - path - cap', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'cap',
    );
    const { fashion } = itemProfit.buildings;

    expectSlot(fashion, 1, 'cap', 180, 180, 240);
  });

  test('workflow - path - shoes', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'shoes',
    );
    const { fashion } = itemProfit.buildings;

    expectSlot(fashion, 1, 'shoes', 180, 180, 255);
  });

  test('workflow - path - chairs', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'chairs',
    );
    const { furniture } = itemProfit.buildings;

    expectSlot(furniture, 1, 'chairs', 17, 17, 37);
  });

  test('workflow - path - cupboard', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'cupboard',
    );
    const { furniture } = itemProfit.buildings;

    expectSlot(furniture, 1, 'cupboard', 300, 300, 345);
  });

  test('workflow - path - couch', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'couch',
    );
    const { furniture } = itemProfit.buildings;

    expectSlot(furniture, 1, 'couch', 540, 540, 690);
  });

  test('workflow - path - home-textiles', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'home-textiles',
    );
    const { furniture } = itemProfit.buildings;

    expectSlot(furniture, 1, 'home-textiles', 180, 180, 255);
  });

  test('workflow - path - tables', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'tables',
    );
    const { furniture } = itemProfit.buildings;

    expectSlot(furniture, 1, 'tables', 44, 44, 74);
  });

  test('workflow - path - lawn-mower', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'lawn-mower',
    );
    const { gardening } = itemProfit.buildings;

    expectSlot(gardening, 1, 'lawn-mower', 420, 420, 540);
  });

  test('workflow - path - fire-pit', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'fire-pit',
    );
    const { gardening } = itemProfit.buildings;

    expectSlot(gardening, 1, 'fire-pit', 220, 220, 460);
  });

  test('workflow - path - garden-gnomes', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'garden-gnomes',
    );
    const { gardening } = itemProfit.buildings;

    expectSlot(gardening, 1, 'garden-gnomes', 280, 280, 370);
  });

  test('workflow - path - garden-furniture', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'garden-furniture',
    );
    const { gardening } = itemProfit.buildings;

    expectSlot(gardening, 1, 'garden-furniture', 180, 180, 315);
  });

  test('workflow - path - grass', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'grass',
    );
    const { gardening } = itemProfit.buildings;

    expectSlot(gardening, 1, 'grass', 39, 39, 69);
  });

  test('workflow - path - tree-saplings', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'tree-saplings',
    );
    const { gardening } = itemProfit.buildings;

    expectSlot(gardening, 1, 'tree-saplings', 39, 39, 129);
  });

  test('workflow - path - cream', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'cream',
    );
    const { farmers } = itemProfit.buildings;

    expectSlot(farmers, 1, 'cream', 360, 360, 435);
  });

  test('workflow - path - vegetables', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'vegetables',
    );
    const { farmers } = itemProfit.buildings;

    expectSlot(farmers, 1, 'vegetables', 20, 20, 40);
  });

  test('workflow - path - cheese', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'cheese',
    );
    const { farmers } = itemProfit.buildings;

    expectSlot(farmers, 1, 'cheese', 360, 360, 465);
  });

  test('workflow - path - beef', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'beef',
    );
    const { farmers } = itemProfit.buildings;

    expectSlot(farmers, 1, 'beef', 360, 360, 510);
  });

  test('workflow - path - corn', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'corn',
    );
    const { farmers } = itemProfit.buildings;

    expectSlot(farmers, 1, 'corn', 30, 30, 90);
  });

  test('workflow - path - flour-bag', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'flour-bag',
    );
    const { farmers } = itemProfit.buildings;

    expectSlot(farmers, 1, 'flour-bag', 180, 180, 210);
  });

  test('workflow - path - fruit-and-berries', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'fruit-and-berries',
    );
    const { farmers } = itemProfit.buildings;

    expectSlot(farmers, 1, 'fruit-and-berries', 129, 129, 219);
  });

  test('workflow - path - frozen-yogurt', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'frozen-yogurt',
    );
    const { donut } = itemProfit.buildings;

    expectSlot(donut, 1, 'frozen-yogurt', 435, 435, 675);
  });

  test('workflow - path - coffee', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'coffee',
    );
    const { donut } = itemProfit.buildings;

    expectSlot(donut, 1, 'coffee', 435, 435, 495);
  });

  test('workflow - path - donuts', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'donuts',
    );
    const { donut } = itemProfit.buildings;

    expectSlot(donut, 1, 'donuts', 240, 240, 285);
  });

  test('workflow - path - cherry-cheesecake', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'cherry-cheesecake',
    );
    const { donut } = itemProfit.buildings;

    expectSlot(donut, 1, 'cherry-cheesecake', 465, 465, 555);
  });

  test('workflow - path - bread-roll', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'bread-roll',
    );
    const { donut } = itemProfit.buildings;

    expectSlot(donut, 1, 'bread-roll', 435, 435, 495);
  });

  test('workflow - path - green-smoothie', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'green-smoothie',
    );
    const { donut } = itemProfit.buildings;

    expectSlot(donut, 1, 'green-smoothie', 129, 129, 159);
  });

  test('workflow - path - tv', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'tv',
    );
    const home = itemProfit.buildings['home-appliances'];

    expectSlot(home, 1, 'tv', 420, 420, 570);
  });

  test('workflow - path - lighting-system', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'lighting-system',
    );
    const home = itemProfit.buildings['home-appliances'];

    expectSlot(home, 1, 'lighting-system', 420, 420, 525);
  });

  test('workflow - path - refrigerator', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'refrigerator',
    );
    const home = itemProfit.buildings['home-appliances'];

    expectSlot(home, 1, 'refrigerator', 420, 420, 630);
  });

  test('workflow - path - bbg-grill', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'bbg-grill',
    );
    const home = itemProfit.buildings['home-appliances'];

    expectSlot(home, 1, 'bbg-grill', 54, 54, 219);
  });

  test('workflow - path - microwave-oven', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'microwave-oven',
    );
    const home = itemProfit.buildings['home-appliances'];

    expectSlot(home, 1, 'microwave-oven', 420, 420, 540);
  });

  test('workflow - path - lemonade', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'lemonade',
    );
    const food = itemProfit.buildings['fast-food'];

    expectSlot(food, 1, 'lemonade', 300, 300, 360);
  });

  test('workflow - path - cheese-fries', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'cheese-fries',
    );
    const food = itemProfit.buildings['fast-food'];

    expectSlot(food, 1, 'cheese-fries', 465, 465, 485);
  });

  test('workflow - path - ice-cream-sandwich', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'ice-cream-sandwich',
    );
    const food = itemProfit.buildings['fast-food'];

    expectSlot(food, 1, 'ice-cream-sandwich', 510, 510, 524);
  });

  test('workflow - path - pizza', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'pizza',
    );
    const food = itemProfit.buildings['fast-food'];

    expectSlot(food, 1, 'pizza', 615, 615, 639);
  });

  test('workflow - path - pop-corn', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'pop-corn',
    );
    const food = itemProfit.buildings['fast-food'];

    expectSlot(food, 1, 'pop-corn', 540, 540, 570);
  });

  test('workflow - path - burgers', async () => {
    const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
      'burgers',
    );
    const food = itemProfit.buildings['fast-food'];

    expectSlot(food, 1, 'burgers', 585, 585, 615);
  });
  // test('workflow - path - business-suits', async () => {
  //   const itemProfit: IItemProfit = await itemDataSource.resolveItemProfit(
  //     'business-suits',
  //   );
  //   const { fashion } = itemProfit.buildings;

  //   expectSlot(fashion, 1, 'business-suits', 180, 180, 330);
  // });

  test('flat items from dependency - burgers', async () => {
    const findAll: IItemModel[] = await itemDataSource.flatItemsFromDependency(
      'burgers',
    );

    expect(findAll.length).toEqual(13);
  });

  test('flat items from dependency - lemonade', async () => {
    const findAll: IItemProfitDependency[] = await itemDataSource.flatItemsFromDependency(
      'lemonade',
    );

    expect(findAll.length).toEqual(10);

    expect(findAll[0]?.slug).toEqual('metal');
    expect(findAll[0]?.quantity).toEqual(1);
  });

  test('flat items from dependency - textiles', async () => {
    const findAll: IItemModel[] = await itemDataSource.flatItemsFromDependency(
      'textiles',
    );

    expect(findAll.length).toEqual(1);
  });

  test('flat items from dependency - shoes', async () => {
    const findAll: IItemModel[] = await itemDataSource.flatItemsFromDependency(
      'shoes',
    );

    expect(findAll.length).toEqual(5);
  });

  test('workflow - shoes', async () => {
    const findAll: IItemProfit = await itemDataSource.resolveItemProfit(
      'shoes',
    );

    const { industry, supplies, fashion } = findAll.buildings;

    expect(industry?.slots.length).toEqual(6);
    expect(supplies?.slots.length).toEqual(1);
    expect(fashion?.slots.length).toEqual(1);
  });

  test('workflow - cream', async () => {
    const findAll: IItemProfit = await itemDataSource.resolveItemProfit(
      'cream',
    );

    const { industry, farmers } = findAll.buildings;

    expect(industry?.slots.length).toEqual(1);
    expect(farmers?.slots.length).toEqual(1);
  });

  test('workflow - textiles', async () => {
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
  });

  test('workflow - burgers', async () => {
    const findAll: IItemProfit = await itemDataSource.resolveItemProfit(
      'burgers',
    );

    expect(findAll.cycles.length).toEqual(0);
    // expect(findAll.buildings).toHaveProperty('farmers');
    // expect(findAll.buildings).toHaveProperty('industry');
    const { industry, farmers, hardware, donut } = findAll.buildings;
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
    expect(hardware?.slots[0]?.schedule).toEqual(9);
    expect(hardware?.slots[0]?.start).toEqual(9);
    expect(hardware?.slots[0]?.complete).toEqual(54);

    expect(farmers?.slots.length).toEqual(4);

    expect(farmers?.slots[0]?.slot).toEqual(1);
    expect(farmers?.slots[0]?.item.slug).toEqual('flour-bag');
    expect(farmers?.slots[0]?.schedule).toEqual(180);
    expect(farmers?.slots[0]?.start).toEqual(180);
    expect(farmers?.slots[0]?.complete).toEqual(210);

    expect(farmers?.slots[1]?.slot).toEqual(2);
    expect(farmers?.slots[1]?.item.slug).toEqual('flour-bag');
    expect(farmers?.slots[1]?.schedule).toEqual(180);
    expect(farmers?.slots[1]?.start).toEqual(210);
    expect(farmers?.slots[1]?.complete).toEqual(240);

    expect(farmers?.slots[2]?.slot).toEqual(3);
    expect(farmers?.slots[2]?.item.slug).toEqual('cream');
    expect(farmers?.slots[2]?.schedule).toEqual(360);
    expect(farmers?.slots[2]?.start).toEqual(360);
    expect(farmers?.slots[2]?.complete).toEqual(435);

    expect(farmers?.slots[3]?.slot).toEqual(4);
    expect(farmers?.slots[3]?.item.slug).toEqual('beef');
    expect(farmers?.slots[3]?.schedule).toEqual(360);
    expect(farmers?.slots[3]?.start).toEqual(435);
    expect(farmers?.slots[3]?.complete).toEqual(585);

    expect(donut?.slots.length).toEqual(1);
    expect(donut?.slots[0]?.slot).toEqual(1);
    expect(donut?.slots[0]?.item.slug).toEqual('bread-roll');
    expect(donut?.slots[0]?.schedule).toEqual(435);
    expect(donut?.slots[0]?.start).toEqual(435);
    expect(donut?.slots[0]?.complete).toEqual(495);

    expect(homeApp?.slots.length).toEqual(1);
    expect(homeApp?.slots[0]?.slot).toEqual(1);
    expect(homeApp?.slots[0]?.item.slug).toEqual('bbg-grill');
    // expect(homeApp?.slots[0]?.schedule).toEqual(425);
    // expect(homeApp?.slots[0]?.start).toEqual(425);
    // expect(donut?.slots[0]?.complete).toEqual(485);

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

    // // donut bread roll
    // expect(findAll.cycles[0]?.cycle).toEqual(6);
    // expect(findAll.cycles[0]?.items.length).toEqual(1);
    // expect(findAll.cycles[0]?.startProduction).toEqual(435);
    // expect(findAll.cycles[0]?.endProduction).toEqual(495);

    // // burgers
    // expect(findAll.cycles[0]?.cycle).toEqual(6);
    // expect(findAll.cycles[0]?.items.length).toEqual(1);
    // expect(findAll.cycles[0]?.startProduction).toEqual(595);
    // expect(findAll.cycles[0]?.endProduction).toEqual(640);
  });

  test('create sequential order of slots in building', async () => {
    const items = [
      {
        _id: '608398a336051c27a775b9e0',
        name: 'Flour Bag',
        level: 17,
        building: {
          _id: '608398a336051c27a775b9bb',
          name: "Farmer's Market",
          slug: 'farmers',
          parallel: false,
        },
        slug: 'flour-bag',
        productionTime: 30,
        maxValue: 570,
        billTime: 180,
        billCost: 240,
        profitOwnProduction: 330,
        profitOwnByMinute: 11,
        depends: [
          { item: '608398a336051c27a775b9c8', quantity: 2 },
          { item: '608398a336051c27a775b9c5', quantity: 2 },
        ],
        profitOwnByHour: 660,
      },
      {
        _id: '608398a336051c27a775b9e0',
        name: 'Flour Bag',
        level: 17,
        building: {
          _id: '608398a336051c27a775b9bb',
          name: "Farmer's Market",
          slug: 'farmers',
          parallel: false,
        },
        slug: 'flour-bag',
        productionTime: 30,
        maxValue: 570,
        billTime: 180,
        billCost: 240,
        profitOwnProduction: 330,
        profitOwnByMinute: 11,
        depends: [
          { item: '608398a336051c27a775b9c8', quantity: 2 },
          { item: '608398a336051c27a775b9c5', quantity: 2 },
        ],
        profitOwnByHour: 660,
      },
      {
        _id: '608398a336051c27a775b9e2',
        name: 'Cream',
        level: 23,
        building: {
          _id: '608398a336051c27a775b9bb',
          name: "Farmer's Market",
          slug: 'farmers',
          parallel: false,
        },
        slug: 'cream',
        productionTime: 75,
        maxValue: 440,
        billTime: 360,
        billCost: 140,
        profitOwnProduction: 300,
        profitOwnByMinute: 4,
        depends: [{ item: '608398a336051c27a775b9cb', quantity: 1 }],
        profitOwnByHour: 240,
        quantity: 1,
      },
      {
        _id: '608398a336051c27a775b9e5',
        name: 'Beef',
        level: 27,
        building: {
          _id: '608398a336051c27a775b9bb',
          name: "Farmer's Market",
          slug: 'farmers',
          parallel: false,
        },
        slug: 'beef',
        productionTime: 150,
        maxValue: 860,
        billTime: 360,
        billCost: 420,
        profitOwnProduction: 440,
        profitOwnByMinute: 2.933333333333333,
        depends: [{ item: '608398a336051c27a775b9cb', quantity: 3 }],
        profitOwnByHour: 176,
        quantity: 1,
      },
    ];

    const farmerSlots: any[] = await itemDataSource.resolveItemProfitSequentialSlots(
      items,
    );

    expect(farmerSlots.length).toEqual(4);

    expect(farmerSlots[0]?.slot).toEqual(1);
    expect(farmerSlots[0]?.item.slug).toEqual('flour-bag');
    expect(farmerSlots[0]?.schedule).toEqual(180);
    expect(farmerSlots[0]?.start).toEqual(180);
    expect(farmerSlots[0]?.complete).toEqual(210);

    expect(farmerSlots[1]?.slot).toEqual(2);
    expect(farmerSlots[1]?.item.slug).toEqual('flour-bag');
    expect(farmerSlots[1]?.schedule).toEqual(180);
    expect(farmerSlots[1]?.start).toEqual(210);
    expect(farmerSlots[1]?.complete).toEqual(240);

    expect(farmerSlots[2]?.slot).toEqual(3);
    expect(farmerSlots[2]?.item.slug).toEqual('cream');
    expect(farmerSlots[2]?.schedule).toEqual(360);
    expect(farmerSlots[2]?.start).toEqual(360);
    expect(farmerSlots[2]?.complete).toEqual(435);

    expect(farmerSlots[3]?.slot).toEqual(4);
    expect(farmerSlots[3]?.item.slug).toEqual('beef');
    expect(farmerSlots[3]?.schedule).toEqual(360);
    expect(farmerSlots[3]?.start).toEqual(435);
    expect(farmerSlots[3]?.complete).toEqual(585);
  });
});
