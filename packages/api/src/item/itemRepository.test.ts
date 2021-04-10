import { MongoClient, ObjectID } from 'mongodb';
import { IItemModel } from '@pbr-simcity/types/types';

import ItemRepository from './itemRepository';

const mongoStr = 'mongodb://localhost:27017/simcity';

describe('Item Repository', () => {
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
      throw e;
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - Cherry cheesecake', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: any = await itemRepository.findOneBySlug(
      'cherry-cheesecake',
    );
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
      throw e;
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - burgers', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: any = await itemRepository.findOneBySlug('burgers');
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
      throw e;
    } finally {
      await client.close();
    }
  });

  test('get wood by slug', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    try {
      const findOne: any = await itemRepository.findOneBySlug('wood');

      expect(findOne.maxValue).toEqual(20);
      expect(findOne.level).toEqual(2);
      expect(findOne.depends.length).toEqual(0);
    } catch (e) {
      throw e;
    } finally {
      await client.close();
    }
  });

  // test('validate legacy', async () => {

  //   const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
  //   await client.connect();

  //   const itemRepository = new ItemRepository(client.db().collection('item'));

  //   const findv1: any = await itemRepository.findOneBySlug(new ObjectID('605fa6cfd9397142fe1793e2'));
  //   const findv2: any = await itemRepository.findOneBySlug(new ObjectID('605fa6cfd9397142fe1793e2'));

  //   expect(findv1).toEqual(findv2);

  // });

  test('find one by id full data - green smoothie', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: any = await itemRepository.findOneBySlug('green-smoothie');

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
      throw e;
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - pizza', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: any = await itemRepository.findOneBySlug('pizza');
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
      throw e;
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - lemonade', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: any = await itemRepository.findOneBySlug('lemonade');
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

    const findOne: any = await itemRepository.findOneBySlug('fire-pit');
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
      throw e;
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - flour bag', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: any = await itemRepository.findOneBySlug('flour-bag');
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
      throw e;
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
      throw e;
    } finally {
      await client.close();
    }
  });

  test('find one by id full data - bread roll', async () => {
    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));

    const findOne: any = await itemRepository.findOneBySlug('bread-roll');
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
      throw e;
    } finally {
      await client.close();
    }
  });
});
