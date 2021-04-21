// import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb';
import {
  IItemDependency,
  IItemDependencyValues,
  IItemArgs,
  IItemProfit,
  IItemModel,
  IItemProfitDependency,
  IItemFilter,
  IItemProfitBuldingList,
  // IProfitCycle,
  IBuildingModel,
  IItemProfitBuildingSlots,
  IItemProfitBuilding,
} from '@pbr-simcity/types/types';
import Collection from '@pbr-simcity/api/src/collection';

class ItemRepository extends Collection {
  async getAll() {
    const docs = this.collection.find();
    return docs.toArray();
  }

  async findDependsItems(depends: IItemDependency[]): Promise<IItemProfitDependency[]> {
    const getDependsItems = depends.map(
      async (a: IItemDependency): Promise<IItemProfitDependency> => {
        const itemDepends = await this.findById(a.item);

        if (!itemDepends) {
          throw new Error('Missing Item from depends');
        }
        return {
          ...itemDepends,
          quantity: a.quantity,
        };
      },
    );

    const dependsItems: IItemProfitDependency[] = await Promise.all(getDependsItems);
    return dependsItems;
  }

  async recursiveDependency(depends: IItemDependency[]): Promise<IItemProfitDependency[]> {
    const dependsItems: IItemProfitDependency[] = await this.findDependsItems(depends);

    const dependsInner: IItemDependency[] = dependsItems.map(
      (a: IItemModel) => a.depends,
    ).flat();

    if (dependsInner.length <= 0) {
      return dependsItems;
    }

    const moreItems = await this.recursiveDependency(dependsInner);

    return [
      ...dependsItems,
      ...moreItems,
    ];
  }

  async flatItemsFromDependency(rootItem: string): Promise<IItemProfitDependency[]> {
    const itemModel: IItemModel | null = await this.findOneBySlug(rootItem);

    if (!itemModel) {
      throw new Error('Missing Item Model');
    }

    const { depends } = itemModel;

    const dependsItems: IItemProfitDependency[] = await this.recursiveDependency(depends);

    const groupItems = dependsItems.reduce((res: any, value: IItemProfitDependency) => {
      if (res[value.slug]) {
        res[value.slug].quantity += value.quantity;
        return res;
      }

      res[value.slug] = {
        ...value,
      };
      return res;
    }, {});

    const groupItemsValues: IItemProfitDependency[] = Object.values(groupItems);

    const allItems = [
      {
        ...itemModel,
        quantity: 1,
      },
      ...groupItemsValues,
    ];

    allItems.sort((a: IItemProfitDependency, b: IItemProfitDependency): number => {
      if (a.level > b.level) {
        return 1;
      }
      return -1;
    });

    return allItems;
  }

  static createParallelBuildingProfitSlots(
    items: IItemProfitDependency[],
    buildingId: string,
  ): IItemProfitBuilding {
    const itemsDependsIndustry: IItemProfitDependency[] = items.filter(
      (a: IItemProfitDependency) => `${a.building}` === `${buildingId}`,
    );

    const itemsExpandIndustry = itemsDependsIndustry.map((a: IItemDependency) => {
      const {
        quantity,
        ...rest
      } = a;

      if (quantity === 1) {
        return a;
      }

      return [...Array(quantity).keys()].map(() => rest);
    }).flat();

    const industrySlots: IItemProfitBuildingSlots[] = itemsExpandIndustry.map(
      (a : any, index: number) => {
        const slot: IItemProfitBuildingSlots = {
          slot: (index + 1),
          schedule: 0,
          start: 0,
          complete: a.productionTime,
          item: a,
        };
        return slot;
      },
    );
    const industryBuilding: IItemProfitBuilding = {
      slots: industrySlots,
    };
    return industryBuilding;
  }

  static getItemCriticalPath(item: IItemModel, items: IItemProfitDependency[]): number {
    const rootDepends = item.depends;

    const depends = rootDepends.map((a: IItemDependency) => {
      const itemDepends = items.filter((b: IItemModel) => `${b._id}` === `${a.item}`);
      return itemDepends;
    }).flat().map((a: IItemModel) => a.productionTime);
    return 5 + Math.max(...depends);
  }

  static createSequentialBuildingProfitSlots(
    items: IItemProfitDependency[],
    buildingId: string,
  ): IItemProfitBuilding {
    const itemsDepends: IItemProfitDependency[] = items.filter(
      (a: IItemProfitDependency) => `${a.building}` === `${buildingId}`,
    );

    const itemsExpand = itemsDepends.map((a: IItemDependency) => {
      const {
        quantity,
        ...rest
      } = a;

      if (quantity === 1) {
        return a;
      }

      return [...Array(quantity).keys()].map(() => rest);
    }).flat();

    // let lastComplete = 0;
    // let start = 0;

    const industrySlots: IItemProfitBuildingSlots[] = itemsExpand.map(
      (a : any, index: number) => {
        const criticalPath = ItemRepository.getItemCriticalPath(a, items);

        // console.log(a.slug, criticalPath, lastComplete, start);

        // if (lastComplete === 0) {
        //   start = criticalPath;
        //   lastComplete = start + a.productionTime;
        // } else {
        //   start = criticalPath + lastComplete;
        //   lastComplete = start + a.productionTime;
        // }

        const slot: IItemProfitBuildingSlots = {
          slot: (index + 1),
          schedule: criticalPath,
          start: criticalPath,
          complete: criticalPath + a.productionTime,
          item: a,
        };
        return slot;
      },
    );
    const building: IItemProfitBuilding = {
      slots: industrySlots,
    };
    return building;
  }

  async createItemProfit(item: string): Promise<IItemProfit> {
    if (!item || item === '') {
      throw new Error('Missing item to analyse');
    }

    const buildings = await this.findBuildings();

    const buildingsProfit = buildings.reduce((a: any, b: IBuildingModel) => ({
      ...a,
      [b.slug]: {
        _id: b._id,
        name: b.name,
      },
    }), {});

    const items: IItemProfitDependency[] = await this.flatItemsFromDependency(item);

    // prepare buildings - industry

    const industryBuilding: IItemProfitBuilding = ItemRepository
      .createParallelBuildingProfitSlots(
        items,
        buildingsProfit.industry._id,
      );

    // prepare buildings - supplies

    const suppliesBuilding: IItemProfitBuilding = ItemRepository
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.supplies._id,
      );

    // prepare buildings - hardware

    const hardwareBuilding: IItemProfitBuilding = ItemRepository
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.hardware._id,
      );

    // prepare buildings - fashion

    const fashionBuilding: IItemProfitBuilding = ItemRepository
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.fashion._id,
      );

    // prepare buildings - furniture

    const furnitureBuilding: IItemProfitBuilding = ItemRepository
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.furniture._id,
      );

    // prepare buildings - gardening

    const gardeningBuilding: IItemProfitBuilding = ItemRepository
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.gardening._id,
      );

    // prepare buildings - farmers market

    const farmersBuilding: IItemProfitBuilding = ItemRepository
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.farmers._id,
      );

    // prepare buildings - donut shop

    const donutBuilding: IItemProfitBuilding = ItemRepository
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.donut._id,
      );

    // prepare buildings - fast food restaurante
    const fastFoodBuilding: IItemProfitBuilding = ItemRepository
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit['fast-food']._id,
      );

    const homeAppliancesBuilding: IItemProfitBuilding = ItemRepository
      .createParallelBuildingProfitSlots(
        items,
        buildingsProfit['home-appliances']._id,
      );

    const profitBuildings: IItemProfitBuldingList = {
      industry: industryBuilding,
      'fast-food': fastFoodBuilding,
      'home-appliances': homeAppliancesBuilding,
      donuts: donutBuilding,
      farmers: farmersBuilding,
      furniture: furnitureBuilding,
      gardening: gardeningBuilding,
      fashion: fashionBuilding,
      hardware: hardwareBuilding,
      supplies: suppliesBuilding,
    };

    const itemProfit : IItemProfit = {
      cycles: [],
      buildings: profitBuildings,
    };

    // find depends.
    return itemProfit;
  }

  async findBuildings(): Promise<IBuildingModel[]> {
    const docs = this.collection.aggregate([
      {
        $lookup: {
          from: 'building',
          localField: 'building',
          foreignField: '_id',
          as: 'building',
        },
      },
      { $unwind: '$building' },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { _id: '$building._id' },
              { name: '$building.name' },
              { slug: '$building.slug' },
            ],
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          slug: { $first: '$slug' },
        },
      },
    ]);

    const buildings: IBuildingModel[] = await docs.toArray();
    return buildings;
  }

  async findDependsByBuilding(args: any): Promise<IItemModel[]> {
    const {
      building,
    } = args;

    const {
      match,
      sort,
    }: any = await ItemRepository.createMatchFilter(args);

    const docs = this.collection.aggregate([
      {
        $lookup: {
          from: 'building',
          localField: 'building',
          foreignField: '_id',
          as: 'building',
        },
      },
      { $unwind: '$building' },
      { $match: { 'building.slug': { $eq: building } } },
      { $unwind: { path: '$depends', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'item',
          localField: 'depends.item',
          foreignField: '_id',
          as: 'items.item',
        },
      },
      { $unwind: { path: '$items.item', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$items.item._id',
          slug: { $first: '$items.item.slug' },
          name: { $first: '$items.item.name' },
          maxValue: { $first: '$items.item.maxValue' },
          level: { $first: '$items.item.level' },
          productionTime: { $first: '$items.item.productionTime' },
          depends: { $first: '$items.item.depends' },
          building: { $first: '$items.item.building' },
        },
      },
      ...this.pipeline,
      { $match: match },
      sort && {
        $sort: sort,
      },
    ]);
    return docs.toArray();
  }

  async findDepends(_ids: string[]): Promise<IItemModel[]> {
    const docs = this.collection.aggregate([
      { $match: { slug: { $in: _ids } } },
      { $unwind: { path: '$depends', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'item',
          localField: 'depends.item',
          foreignField: '_id',
          as: 'items.item',
        },
      },
      { $unwind: { path: '$items.item', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$items.item._id',
          slug: { $first: '$items.item.slug' },
          name: { $first: '$items.item.name' },
          maxValue: { $first: '$items.item.maxValue' },
          productionTime: { $first: '$items.item.productionTime' },
          depends: { $first: '$items.item.depends' },
          building: { $first: '$items.item.building' },
        },
      },
      ...this.pipeline,

      // { $match: { 'items.item.slug': { $in: _ids } } },
    ]);
    return docs.toArray();
  }

  async findUsedByBuilding(args: any): Promise<IItemModel[]> {
    const {
      match,
      sort,
    }: any = await ItemRepository.createMatchFilter(args);

    const {
      building,
    } = args;

    const docs = this.collection.aggregate([
      { $unwind: { path: '$depends', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'item',
          localField: 'depends.item',
          foreignField: '_id',
          as: 'items.item',
        },
      },
      { $unwind: { path: '$items.item', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'building',
          localField: 'items.item.building',
          foreignField: '_id',
          as: 'building',
        },
      },
      { $unwind: '$building' },
      { $match: { 'building.slug': { $eq: building } } },
      // { $match: { 'items.item.slug': { $in: _ids } } },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { refName: '$items.item.name' },
              { refSlug: '$items.item.slug' },
              { refMaxValue: '$items.item.maxValue' },
              { refBuilding: '$items.item.building' },
              { depends: '$depends' },
              { _id: '$_id' },
              { name: '$name' },
              { slug: '$slug' },
            ],
          },
        },
      },
      {
        $lookup: {
          localField: '_id',
          as: 'itemTemp',
          from: 'item',
          foreignField: '_id',
        },
      },
      { $unwind: { path: '$itemTemp', preserveNullAndEmptyArrays: true } },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { _id: '$itemTemp._id' },
              { name: '$itemTemp.name' },
              { slug: '$itemTemp.slug' },
              { level: '$itemTemp.level' },
              { building: '$itemTemp.building' },
              { maxValue: '$itemTemp.maxValue' },
              { productionTime: '$itemTemp.productionTime' },
              { depends: '$itemTemp.depends' },
            ],
          },
        },
      },
      ...this.pipeline,
      { $match: match },
      {
        $sort: sort,
      },
    ]);

    return docs.toArray();
  }

  async findUsedBy(_ids: string[]): Promise<IItemModel[]> {
    const docs = this.collection.aggregate([
      { $unwind: { path: '$depends', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'item',
          localField: 'depends.item',
          foreignField: '_id',
          as: 'items.item',
        },
      },
      { $unwind: { path: '$items.item', preserveNullAndEmptyArrays: true } },
      { $match: { 'items.item.slug': { $in: _ids } } },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { refName: '$items.item.name' },
              { refSlug: '$items.item.slug' },
              { refMaxValue: '$items.item.maxValue' },
              { depends: '$depends' },
              { _id: '$_id' },
              { name: '$name' },
              { slug: '$slug' },
            ],
          },
        },
      },
      {
        $lookup: {
          localField: '_id',
          as: 'itemTemp',
          from: 'item',
          foreignField: '_id',
        },
      },
      { $unwind: { path: '$itemTemp', preserveNullAndEmptyArrays: true } },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { _id: '$itemTemp._id' },
              { name: '$itemTemp.name' },
              { slug: '$itemTemp.slug' },
              { level: '$itemTemp.level' },
              { building: '$itemTemp.building' },
              { maxValue: '$itemTemp.maxValue' },
              { productionTime: '$itemTemp.productionTime' },
              { depends: '$itemTemp.depends' },
            ],
          },
        },
      },
      ...this.pipeline,
    ]);
    return docs.toArray();
  }

  static async createMatchFilter(args: IItemArgs) {
    if (!args) {
      return {};
    }

    const order = (args.order === 'desc' && 1) || -1;

    const sort = { [args.orderBy]: order };

    const match: IItemFilter = {};

    if (args.filter?.level) {
      match.level = { $lte: args.filter.level };
    }

    return {
      match,
      sort,
    };
  }

  async findManyByFilter(args: IItemArgs): Promise<IItemModel[]> {
    const {
      match,
      sort,
    }: any = await ItemRepository.createMatchFilter(args);

    const docs = await this.collection
      .aggregate([
        { $match: match },
        // { $match: {
        //   _id: new ObjectId(id)
        // }},
        ...this.pipeline,
        {
          $sort: sort,
        },
      ])
      .toArray();

    // const docs = await this.collection.findOne({_id: {$eq: new ObjectId(id)}});
    // return docs;

    return docs.map(
      (p: IItemModel): IItemModel => ({
        ...p,
        depends: p.depends.filter((p: any) => p.item),
      }),
    );
  }

  async findManyByBuildingSlug(args: any): Promise<IItemModel[]> {
    const { building } = args;
    const docs = await this.collection
      .aggregate([
        {
          $lookup: {
            from: 'building',
            localField: 'building',
            foreignField: '_id',
            as: 'building',
          },
        },
        { $unwind: '$building' },
        { $match: { 'building.slug': { $eq: building } } },
        {
          $addFields: {
            building: '$building._id',
          },
        },
        // { $match: {
        //   _id: new ObjectId(id)
        // }},
        ...this.pipeline,
      ])
      .toArray();

    return docs;
  }

  async findManyByBuilding(building: ObjectId): Promise<IItemModel[]> {
    const docs = await this.collection
      .aggregate([
        { $match: { building: { $eq: new ObjectId(building) } } },
        // { $match: {
        //   _id: new ObjectId(id)
        // }},
        ...this.pipeline,
      ])
      .toArray();

    return docs;
  }

  pipeline = [
    { $unwind: { path: '$depends', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'building',
        localField: 'building',
        foreignField: '_id',
        as: 'building',
      },
    },
    { $unwind: '$building' },
    {
      $lookup: {
        from: 'item',
        localField: 'depends.item',
        foreignField: '_id',
        as: 'depends.item',
      },
    },
    { $unwind: { path: '$depends.item', preserveNullAndEmptyArrays: true } },
    {
      $unwind: {
        path: '$depends.item.depends',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'building',
        localField: 'depends.item.building',
        foreignField: '_id',
        as: 'depends.item.building',
      },
    },
    {
      $unwind: {
        path: '$depends.item.building',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'item',
        localField: 'depends.item.depends.item',
        foreignField: '_id',
        as: 'depends.item.depends.item',
      },
    },
    {
      $unwind: {
        path: '$depends.item.depends.item',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'building',
        localField: 'depends.item.depends.item.building',
        foreignField: '_id',
        as: 'depends.item.depends.item.building',
      },
    },
    {
      $unwind: {
        path: '$depends.item.depends.item.building',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        building: { $first: '$building' },
        slug: { $first: '$slug' },
        productionTime: { $first: '$productionTime' },
        maxValue: { $first: '$maxValue' },
        level: { $first: '$level' },
        depends: {
          $addToSet: {
            item: '$depends.item._id',
            quantity: '$depends.quantity',
            billTimeLvl2: {
              $max: {
                $cond: {
                  if: '$depends.item.building.parallel',
                  then: '$depends.item.productionTime',
                  else: {
                    $multiply: [
                      '$depends.item.productionTime',
                      '$depends.quantity',
                    ],
                  },
                },
              },
            },
            billTimeLvl3: {
              $max: {
                $cond: {
                  if: '$depends.item.depends.item.building.parallel',
                  then: '$depends.item.depends.item.productionTime',
                  else: {
                    $multiply: [
                      '$depends.item.depends.item.productionTime',
                      '$depends.item.depends.quantity',
                    ],
                  },
                },
              },
            },
          },
        },
        // billCost: {$sum: {$multiply: ['$depends.item.maxValue', '$depends.quantity']}},
      },
    },
    { $unwind: '$depends' },
    {
      $project: {
        name: 1,
        slug: 1,
        building: '$building._id',
        productionTime: 1,
        level: 1,
        maxValue: 1,
        depends: 1,
        billTime: {
          $max: { $sum: ['$depends.billTimeLvl2', '$depends.billTimeLvl3'] },
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        level: { $first: '$level' },
        building: { $first: '$building' },
        slug: { $first: '$slug' },
        productionTime: { $first: '$productionTime' },
        maxValue: { $first: '$maxValue' },
        depends: {
          $addToSet: {
            item: '$depends.item',
            quantity: '$depends.quantity',
          },
        },
        billTime: { $max: '$billTime' },
        // billCost: {$sum: {$multiply: ["$depends.item.maxValue", "$depends.quantity"]}},
      },
    },
    { $unwind: { path: '$depends', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'item',
        localField: 'depends.item',
        foreignField: '_id',
        as: 'depends.item',
      },
    },
    { $unwind: { path: '$depends.item', preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        level: { $first: '$level' },
        building: { $first: '$building' },
        slug: { $first: '$slug' },
        productionTime: { $first: '$productionTime' },
        maxValue: { $first: '$maxValue' },
        depends: {
          $addToSet: {
            item: '$depends.item._id',
            quantity: '$depends.quantity',
          },
        },
        billTime: { $first: '$billTime' },
        billCost: {
          $sum: { $multiply: ['$depends.item.maxValue', '$depends.quantity'] },
        },
        //   depends: {$push: "$depends"},
      },
    },
    {
      $addFields: {
        profitOwnProduction: { $subtract: ['$maxValue', '$billCost'] },
      },
    },
    {
      $project: {
        // dependsLvl2: "$dependsItem.depends",
        name: 1,
        slug: 1,
        productionTime: 1,
        level: 1,
        building: 1,
        maxValue: 1,
        profitOwnProduction: 1,
        profitOwnByMinute: {
          $divide: ['$profitOwnProduction', '$productionTime'],
        },

        billCost: 1,
        billTime: 1,
        // billTime: {$max: {$sum: ['$billTimeLvl2', "$billTimeLvl3"]}},
        depends: {
          $filter: {
            input: '$depends',
            as: 'itemDepends',
            cond: { $gt: ['$$itemDepends.quantity', 0] },
          },
        },
      },
    },
    {
      $addFields: {
        // profitOwnProduction: { $subtract: [ "$maxValue", "$billCost"  ] },
        profitOwnByHour: { $multiply: ['$profitOwnByMinute', 60] },
      },
    },
  ];

  // async findByIdV2(id: ObjectId) {

  //   const docs = await this.collection.aggregate(
  //     [
  //       { $match: {
  //         _id: new ObjectId(id)
  //       }},
  //       ...this.pipeline
  //     ]

  //   ).toArray();

  //   return docs[0];
  //   //return docs[0] || null;
  // }

  async findById(id: ObjectId): Promise<IItemModel | null> {
    const docs = await this.collection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        ...this.pipeline,
      ])
      .toArray();

    // const docs = await this.collection.findOne({_id: {$eq: new ObjectId(id)}});
    // return docs;
    const model: IItemModel | undefined = docs[0];

    if (!model) {
      return null;
    }

    return {
      ...model,
      depends: model.depends.filter((p: any) => p.item),
    };
  }

  async findOneBySlug(slug: string): Promise<IItemModel | null> {
    const docs = await this.collection
      .aggregate([
        {
          $match: {
            slug,
          },
        },
        ...this.pipeline,
      ])
      .toArray();

    // const docs = await this.collection.findOne({_id: {$eq: new ObjectId(id)}});
    // return docs;
    // return docs[0] || null;
    // const docs = await this.collection.findOne({slug: {$eq: slug}});

    const model: IItemModel | undefined = docs[0];

    if (!model) {
      return null;
    }

    return {
      ...model,
      depends: model.depends.filter((p: any) => p.item),
    };
  }

  async findItemDependsById(id: ObjectId) {
    const docs = await this.collection.find({
      'depends.item': { $eq: new ObjectId(id) },
    });

    return docs.toArray();
    // return [];
  }

  async findItemDependencyCost(
    items: IItemDependency[],
  ): Promise<IItemDependencyValues> {
    const itemsPromise = items.map(async (p) => ({
      item: await this.findById(p.item),
      quantity: p.quantity,
    }));

    const itemsDeps = await Promise.all(itemsPromise);

    const cost = itemsDeps.reduce((a: number, b: IItemDependency): number => {
      const maxValue = b?.item?.maxValue || 0;
      return a + maxValue * b.quantity;
    }, 0);

    const time = itemsDeps.reduce((a: number, b: IItemDependency): number => {
      const maxTime = b?.item?.productionTime || 0;
      return a + maxTime;
    }, 0);

    return {
      cost,
      time,
    };
  }
}

export default ItemRepository;
