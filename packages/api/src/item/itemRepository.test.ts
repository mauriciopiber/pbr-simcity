import { MongoClient, ObjectID } from 'mongodb';

const mongoStr = 'mongodb://localhost:27017/simcity';

import ItemRepository from './itemRepository';

describe('Item Repository', () => {

  test('find one by id full data - Planks', async () => {

    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));


    const findOne: any = await itemRepository.findByIdV2(new ObjectID('605fa6cfd9397142fe1793c4'));
    try {
      //console.log(JSON.stringify(findOne, null, 2))
      expect(findOne.name).toEqual('Planks');
      expect(findOne.slug).toEqual('planks');
      expect(findOne.productionTime).toEqual(30);
      expect(findOne.maxValue).toEqual(120);

      expect(findOne.depends.length).toEqual(1);
      // to add
      expect(findOne.billCost).toEqual(40);
      //expect(findOne.totalProductionTime).toEqual(555);
      expect(findOne.profitOwnProduction).toEqual(80);
      expect(findOne.billTime).toEqual(3);
      //expect(findOne.hourProfitOwnProduction).toEqual(280);

    } catch(e) {
      throw e;
    } finally {
      await client.close();
    }
  })

  test('find one by id full data - Cherry cheesecake', async () => {

    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));


    const findOne: any = await itemRepository.findByIdV2(new ObjectID('605fa6cfd9397142fe1793e4'));
    try {
      //console.log(JSON.stringify(findOne, null, 2));
      expect(findOne.name).toEqual('Cherry Cheesecake');
      expect(findOne.slug).toEqual('cherry-cheesecake');
      expect(findOne.productionTime).toEqual(90);
      expect(findOne.maxValue).toEqual(2240);

      expect(findOne.depends.length).toEqual(3);
      // to add
      expect(findOne.billCost).toEqual(1960);
      //expect(findOne.totalProductionTime).toEqual(555);
      expect(findOne.profitOwnProduction).toEqual(280);
      expect(findOne.billTime).toEqual(465);
      //expect(findOne.hourProfitOwnProduction).toEqual(280);

    } catch(e) {
      throw e;
    } finally {
      await client.close();
    }
  })

  test('find one by id full data - Fire Pit', async () => {

    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));


    const findOne: any = await itemRepository.findByIdV2(new ObjectID('605fa6cfd9397142fe1793d2'));
    try {
      //console.log(JSON.stringify(findOne, null, 2));
      expect(findOne.name).toEqual('Fire Pit');
      expect(findOne.slug).toEqual('fire-pit');
      expect(findOne.productionTime).toEqual(240);
      expect(findOne.maxValue).toEqual(1740);

      expect(findOne.depends.length).toEqual(3);
      // to add
      expect(findOne.billCost).toEqual(1410);
      //expect(findOne.totalProductionTime).toEqual(555);
      expect(findOne.profitOwnProduction).toEqual(330);
      expect(findOne.billTime).toEqual(220);
      //expect(findOne.hourProfitOwnProduction).toEqual(280);

    } catch(e) {
      throw e;
    } finally {
      await client.close();
    }
  })

  test('find one by id full data - flour bag', async () => {

    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));


    const findOne: any = await itemRepository.findByIdV2(new ObjectID('605fa6cfd9397142fe1793d6'));
    try {
      //console.log(JSON.stringify(findOne, null, 2));
      expect(findOne.name).toEqual('Flour Bag');
      expect(findOne.slug).toEqual('flour-bag');
      expect(findOne.productionTime).toEqual(30);
      expect(findOne.maxValue).toEqual(570);

      expect(findOne.depends.length).toEqual(2);
      // to add
      expect(findOne.billCost).toEqual(240);
      //expect(findOne.totalProductionTime).toEqual(555);
      expect(findOne.profitOwnProduction).toEqual(330);
      expect(findOne.billTime).toEqual(180);
      //expect(findOne.hourProfitOwnProduction).toEqual(280);

    } catch(e) {
      throw e;
    } finally {
      await client.close();
    }
  })

  test('find one by id full data - donuts', async () => {

    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));


    const findOne: any = await itemRepository.findByIdV2(new ObjectID('605fa6cfd9397142fe1793e1'));
    try {
      //console.log(JSON.stringify(findOne, null, 2));
      expect(findOne.name).toEqual('Donuts');
      expect(findOne.slug).toEqual('donuts');
      expect(findOne.productionTime).toEqual(45);
      expect(findOne.maxValue).toEqual(950);

      expect(findOne.depends.length).toEqual(2);
      // to add
      expect(findOne.billCost).toEqual(680);
      //expect(findOne.totalProductionTime).toEqual(555);
      expect(findOne.profitOwnProduction).toEqual(270);
      expect(findOne.billTime).toEqual(240);
      //expect(findOne.hourProfitOwnProduction).toEqual(280);

    } catch(e) {
      throw e;
    } finally {
      await client.close();
    }
  })



  test('find one by id full data - bread roll', async () => {

    const client = new MongoClient(mongoStr, { useUnifiedTopology: true });
    await client.connect();

    const itemRepository = new ItemRepository(client.db().collection('item'));


    const findOne: any = await itemRepository.findByIdV2(new ObjectID('605fa6cfd9397142fe1793e3'));
    try {

      expect(findOne.name).toEqual('Bread Roll');
      expect(findOne.slug).toEqual('bread-roll');
      expect(findOne.productionTime).toEqual(60);
      expect(findOne.maxValue).toEqual(1840);

      expect(findOne.depends.length).toEqual(2);
      // to add
      expect(findOne.billCost).toEqual(1580);
      //expect(findOne.totalProductionTime).toEqual(555);
      expect(findOne.profitOwnProduction).toEqual(260);
      expect(findOne.billTime).toEqual(435);
      //expect(findOne.hourProfitOwnProduction).toEqual(280);

    } catch(e) {
      throw e;
    } finally {
      await client.close();
    }
  })
})
