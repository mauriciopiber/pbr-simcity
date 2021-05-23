// import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb';
import {
  IItemModel,
  IItemDoc,
  IItemRepository,
  IBuildingModel,
} from '@pbr-simcity/types/types';
import Collection from '@pbr-simcity/api/src/collection';

export default class ItemRepository extends Collection implements IItemRepository {
  async findDoc(slug: string): Promise<IItemDoc> {
    return this.collection.findOne({ slug });
  }

  async findAll(match: any, sort: any): Promise<IItemModel[]> {
    const docs = this.collection.aggregate(
      [
        ...this.pipeline,
        match || null,
        sort || null,
      ],
    );
    return docs.toArray();
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
              { parallel: '$building.parallel' },
              { order: '$building.order' },
            ],
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          slug: { $first: '$slug' },
          parallel: { $first: '$parallel' },
          order: { $first: '$order' },
        },
      },
      {
        $sort: {
          order: -1,
        },
      },
    ]);

    const buildings: IBuildingModel[] = await docs.toArray();
    return buildings;
  }

  async findDependsByBuildingSlug(slug: string, match: any, sort: any): Promise<IItemModel[]> {
    // const { building } = args;

    // const { match, sort }: any = await ItemRepository.createMatchFilter(args);

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
      { $match: { 'building.slug': { $eq: slug } } },
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
      match || null,
      sort || null,
      // { $match: match },
      // sort && {
      //   $sort: sort,
      // },
    ]);
    return docs.toArray();
  }

  async findDependsByItemsSlugs(items: string[]): Promise<IItemModel[]> {
    const docs = this.collection.aggregate([
      { $match: { slug: { $in: items } } },
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
          level: { $first: '$items.item.level' },
        },
      },
      {
        $sort: {
          'building.order': 1,
        },
      },
      ...this.pipeline,

      // match || null,
      // sort || null,

      // { $match: { 'items.item.slug': { $in: _ids } } },
    ]);
    return docs.toArray();
  }

  async findUsedInByItemId(id: string, match: any, sort: any): Promise<IItemModel[]> {
    const docs = await this.collection.aggregate([
      {
        $match: { 'depends.item': { $eq: new ObjectId(id) } },
      },
      ...this.pipeline,
      match || null,
      sort || null,
    ]);

    return docs.toArray();
  }

  async findUsedInByBuildingSlug(slug: string): Promise<IItemModel[]> {
    // const { match, sort }: any = await ItemRepository.createMatchFilter(args);

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
      { $match: { 'building.slug': { $eq: slug } } },
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
      {
        $sort: {
          'building.slug': 1,
        },
      },
      // match || null,
      // sort || null,

      // { $match: match },
      // {
      //   $sort: sort,
      // },
    ]);

    return docs.toArray();
  }

  async findUsedInByItemsSlugs(items: string[]): Promise<IItemModel[]> {
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
      { $match: { 'items.item.slug': { $in: items } } },
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

  // async findManyByFilter(args: IItemArgs): Promise<IItemModel[]> {
  //   const { match, sort }: any = await ItemRepository.createMatchFilter(args);

  //   const docs = await this.collection
  //     .aggregate([
  //       { $match: match },
  //       // { $match: {
  //       //   _id: new ObjectId(id)
  //       // }},
  //       ...this.pipeline,
  //       {
  //         $sort: sort,
  //       },
  //     ])
  //     .toArray();

  //   // const docs = await this.collection.findOne({_id: {$eq: new ObjectId(id)}});
  //   // return docs;

  //   return docs.map(
  //     (p: IItemModel): IItemModel => ({
  //       ...p,
  //       depends: p.depends.filter((p: any) => p.item),
  //     }),
  //   );
  // }

  async findByBuildingSlug(building: string): Promise<IItemModel[]> {
    // const { building } = args;
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

  // async findByBuildingId(building: string): Promise<IItemModel[]> {
  //   // const { building } = args;
  //   const docs = await this.collection
  //     .aggregate([
  //       {
  //         $lookup: {
  //           from: 'building',
  //           localField: 'building',
  //           foreignField: '_id',
  //           as: 'building',
  //         },
  //       },
  //       { $unwind: '$building' },
  //       { $match: { 'building._id': { $eq: new ObjectId(building) } } },
  //       {
  //         $addFields: {
  //           building: '$building._id',
  //         },
  //       },
  //       // { $match: {
  //       //   _id: new ObjectId(id)
  //       // }},
  //       ...this.pipeline,
  //     ])
  //     .toArray();

  //   return docs;
  // }

  async findByBuildingId(building: string, match: any, sort: any): Promise<IItemModel[]> {
    const docs = await this.collection
      .aggregate([
        { $match: { building: { $eq: new ObjectId(building) } } },
        // { $match: {
        //   _id: new ObjectId(id)
        // }},
        ...this.pipeline,
        match || null,
        sort || null,
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
          $round: [{ $divide: ['$profitOwnProduction', '$productionTime'] }, 2],
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
        profitOwnByHour: {
          $round: [{ $multiply: ['$profitOwnByMinute', 60] }],
        },
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

  async findOneById(id: string): Promise<IItemModel | null> {
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

    const model: IItemModel | undefined = docs[0];

    if (!model) {
      return null;
    }

    return {
      ...model,
      depends: model.depends.filter((p: any) => p.item),
    };
  }

  // async findItemDependsById(id: ObjectId) {
  //   const docs = await this.collection.find({
  //     'depends.item': { $eq: new ObjectId(id) },
  //   });

  //   return docs.toArray();
  //   // return [];
  // }
}
