import {
  IItemDataSource,
  IItemRepository,
  IItemModel,
  IItemProfit,
  IItemProfitDependency,
  IItemProfitBuldingList,
  IItemProfitBuildingSlots,
  IBuildingPreviewModel,
  IItemDependency,
  IItemArgs,
  // IBuilding,
  IItemProfitBuilding,
  IItemDependencyGraph,
} from '@pbr-simcity/types/types';

/* eslint-disable class-methods-use-this */

export default class ItemDataSource implements IItemDataSource {
  itemRepository: IItemRepository;

  constructor(itemRepository: IItemRepository) {
    this.itemRepository = itemRepository;
  }

  async resolveFindAll(args: IItemArgs): Promise<IItemModel[]> {
    const match = ItemDataSource.createMatch(args);
    const order = ItemDataSource.createOrder(args);
    return this.itemRepository.findAll(match, order);
  }

  async resolveFindItemsByBuildingId(parent: string, args: IItemArgs): Promise<IItemModel[]> {
    if (!parent) {
      throw new Error('Missing parent ID');
    }
    const match = ItemDataSource.createMatch(args);
    const order = ItemDataSource.createOrder(args);
    return this.itemRepository.findByBuildingId(parent, match, order);
  }

  async resolveFindItemsByBuildingSlug(args: IItemArgs): Promise<IItemModel[]> {
    const {
      building,
    } = args;

    if (!building) {
      throw new Error('Missing building slug on call');
    }
    const match = ItemDataSource.createMatch(args);
    const order = ItemDataSource.createOrder(args);
    return this.itemRepository.findByBuildingSlug(building, match, order);
  }

  async resolveFindItemsDependsByBuildingSlug(args: IItemArgs): Promise<IItemModel[]> {
    const {
      building,
    } = args;

    if (!building) {
      throw new Error('Missing building slug on call');
    }
    const match = ItemDataSource.createMatch(args);
    const order = ItemDataSource.createOrder(args);
    return this.itemRepository.findDependsByBuildingSlug(building, match, order);
  }

  async resolveFindItemsUsedInByBuildingSlug(args: IItemArgs): Promise<IItemModel[]> {
    const {
      building,
    } = args;

    if (!building) {
      throw new Error('Missing building slug on call');
    }
    const match = ItemDataSource.createMatch(args);
    const order = ItemDataSource.createOrder(args);
    return this.itemRepository.findUsedInByBuildingSlug(building, match, order);
  }

  async resolveFindOneItem(args: IItemArgs): Promise<IItemModel> {
    const {
      id,
      slug,
    } = args;

    if (slug) {
      const itemBySlug = await this.itemRepository.findOneBySlug(slug);
      if (itemBySlug) {
        return itemBySlug;
      }
    }

    if (id) {
      const itemById = await this.itemRepository.findOneById(id);
      if (itemById) {
        return itemById;
      }
    }

    throw new Error('Missing Item');
  }

  async resolveItemDependsByItemId(parent: string): Promise<IItemModel> {
    const item = await this.itemRepository.findOneById(parent);

    if (item) {
      return item;
    }

    throw new Error('Find item by depends id not found');
  }

  async resolveUsedInByItemId(parent: string, args: IItemArgs): Promise<IItemModel[]> {
    const match = ItemDataSource.createMatch(args);
    const order = ItemDataSource.createOrder(args);
    return this.itemRepository.findUsedInByItemId(parent, match, order);
  }

  recursiveCreateDependencyGraph(depends: any[], items: any[]): any[] {
    return depends.map((a: any) => {
      const itemDepends = items.find((b: any) => `${b._id}` === `${a.item}`);

      const innerDependencyGraph = this.recursiveCreateDependencyGraph(itemDepends.depends, items);

      // console.log(innerDependencyGraph);

      const criticalPath = innerDependencyGraph.reduce(
        (prev: any, current: any) => (
          (prev > current.productionTime) ? prev : current.productionTime
        ),
        0,
      );

      return {
        slug: itemDepends.slug,
        quantity: a.quantity,
        parallel: itemDepends.building.parallel,
        productionTime: itemDepends.productionTime,
        depends: innerDependencyGraph,
        criticalPath: criticalPath + itemDepends.productionTime,
      };
    });
  }

  async resolveItemDependencyGraph(slug: string): Promise<IItemDependencyGraph> {
    const item: IItemModel | null = await this.itemRepository.findOneBySlug(slug);

    if (!item) {
      throw new Error('Item not found');
    }

    const buildings = await this.itemRepository.findBuildings();

    const depends = await this.recursiveDependency(item.depends);

    const dependsWithBuilding = depends.map((a: any) => ({
      ...a,
      building: buildings.find((b: any) => `${b._id}` === `${a.building}`),
    }));

    const dependencyGraph = this.recursiveCreateDependencyGraph(item.depends, dependsWithBuilding);

    const criticalPath = dependencyGraph.reduce(
      (prev: any, current: any) => (
        (prev > current.criticalPath) ? prev : current.criticalPath
      ),
      0,
    );
    // console.log(dependencyGraph);

    return {
      slug: item.slug,
      criticalPath,
      productionTime: item.productionTime,
      maxTime: criticalPath + item.productionTime,
    };
  }
  /** Profit */

  async findDependsItems(
    depends: IItemDependency[],
  ): Promise<IItemProfitDependency[]> {
    const getDependsItems = depends.map(
      async (a: IItemDependency): Promise<IItemProfitDependency> => {
        const itemDepends = await this.itemRepository.findOneById(a.item);

        if (!itemDepends) {
          throw new Error('Missing Item from depends');
        }
        return {
          ...itemDepends,
          quantity: a.quantity,
        };
      },
    );

    const dependsItems: IItemProfitDependency[] = await Promise.all(
      getDependsItems,
    );
    return dependsItems;
  }

  async recursiveDependency(
    depends: IItemDependency[],
  ): Promise<IItemProfitDependency[]> {
    const dependsItems: IItemProfitDependency[] = await this.findDependsItems(
      depends,
    );

    const dependsInner: IItemDependency[] = dependsItems
      .map((a: IItemModel) => a.depends)
      .flat();

    if (dependsInner.length <= 0) {
      return dependsItems;
    }

    const moreItems = await this.recursiveDependency(dependsInner);

    return [...dependsItems, ...moreItems];
  }

  async flatItemsFromDependency(
    rootItem: string,
  ): Promise<IItemProfitDependency[]> {
    const itemModel: IItemModel | null = await this.itemRepository.findOneBySlug(rootItem);

    if (!itemModel) {
      throw new Error('Missing Item Model');
    }

    const { depends } = itemModel;

    const dependsItems: IItemProfitDependency[] = await this.recursiveDependency(
      depends,
    );

    const groupItems = dependsItems.reduce(
      (res: any, value: IItemProfitDependency) => {
        if (res[value.slug]) {
          res[value.slug].quantity += value.quantity;
          return res;
        }

        res[value.slug] = {
          ...value,
        };
        return res;
      },
      {},
    );

    const groupItemsValues: IItemProfitDependency[] = Object.values(groupItems);

    const allItems = [
      {
        ...itemModel,
        quantity: 1,
      },
      ...groupItemsValues,
    ];

    allItems.sort(
      (a: IItemProfitDependency, b: IItemProfitDependency): number => {
        if (a.level > b.level) {
          return 1;
        }
        return -1;
      },
    );

    return allItems;
  }

  static createParallelBuildingProfitSlots(
    items: IItemProfitDependency[],
    buildingId: string,
  ): IItemProfitBuilding {
    const itemsDependsIndustry: IItemProfitDependency[] = items.filter(
      (a: IItemProfitDependency) => `${a.building}` === `${buildingId}`,
    );

    const itemsExpandIndustry = itemsDependsIndustry
      .map((a: IItemDependency) => {
        const { quantity, ...rest } = a;

        if (quantity === 1) {
          return a;
        }

        return [...Array(quantity).keys()].map(() => rest);
      })
      .flat();

    const industrySlots: IItemProfitBuildingSlots[] = itemsExpandIndustry.map(
      (a: any, index: number) => {
        const slot: IItemProfitBuildingSlots = {
          slot: index + 1,
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

  static getItemCriticalPath(
    item: IItemProfitDependency,
    items: IItemProfitDependency[],
    // industryId = '6067df64e0fc61d7365eb582',
  ): number {
    const rootDepends = item.depends;

    const dependsLvl1 = rootDepends
      .map((a: IItemDependency) => {
        const itemDepends = items.filter(
          (b: IItemModel) => `${b._id}` === `${a.item}`,
        );
        return itemDepends;
      }).flat();

    const maxLvl1 = dependsLvl1.reduce(
      (prev, current) => ((prev.productionTime > current.productionTime) ? prev : current),
    );

    // console.log(maxLvl1);
    const dependsLvl1Value = maxLvl1.productionTime;

    if (maxLvl1.depends.length <= 0) {
      return 5 + dependsLvl1Value;
    }

    const dependsLvl2 = maxLvl1.depends
      .map((a: IItemDependency) => {
        const itemDepends = items.filter(
          (b: IItemModel) => `${b._id}` === `${a.item}`,
        );
        return itemDepends;
      }).flat();

    const maxLvl2 = dependsLvl2.reduce(
      (prev, current) => ((prev.productionTime > current.productionTime) ? prev : current),
    );

    const dependsLvl2Value = maxLvl2.productionTime;

    return 5 + dependsLvl1Value + dependsLvl2Value;
  }

  static createSequentialBuildingProfitSlots(
    items: IItemProfitDependency[],
    buildingId: string,
  ): IItemProfitBuilding {
    const itemsDepends: IItemProfitDependency[] = items.filter(
      (a: IItemProfitDependency) => `${a.building}` === `${buildingId}`,
    );

    const itemsExpand = itemsDepends
      .map((a: IItemDependency) => {
        const { quantity, ...rest } = a;

        if (quantity === 1) {
          return a;
        }

        return [...Array(quantity).keys()].map(() => rest);
      })
      .flat();

    let lastComplete = 0;
    let lastCritical = 0;

    // console.log(JSON.stringify(items));
    const industrySlots: IItemProfitBuildingSlots[] = itemsExpand.map(
      (a: any, index: number) => {
        // console.log(JSON.stringify(a));
        const criticalPath = ItemDataSource.getItemCriticalPath(a, items);

        const start = lastCritical === criticalPath ? lastComplete : criticalPath;

        const complete = lastCritical === criticalPath
          ? start + a.productionTime
          : criticalPath + a.productionTime;

        const slot: IItemProfitBuildingSlots = {
          slot: index + 1,
          schedule: criticalPath,
          start,
          complete,
          item: a,
        };

        lastComplete = complete;
        lastCritical = criticalPath;
        // console.log(a.slug, start, lastComplete);
        return slot;
      },
    );
    const building: IItemProfitBuilding = {
      slots: industrySlots,
    };
    return building;
  }

  async resolveItemProfit(item: string): Promise<IItemProfit> {
    if (!item || item === '') {
      throw new Error('Missing item to analyse');
    }

    const buildings: IBuildingPreviewModel[] = await this.itemRepository.findBuildings();

    // console.log(buildings);

    const buildingsProfit = buildings.reduce(
      (a: any, b: IBuildingPreviewModel) => ({
        ...a,
        [b.slug]: {
          _id: b._id,
          name: b.name,
        },
      }),
      {},
    );

    const items: IItemProfitDependency[] = await this.flatItemsFromDependency(
      item,
    );

    // prepare buildings - industry

    const industryBuilding: IItemProfitBuilding = ItemDataSource //
      .createParallelBuildingProfitSlots(
        items,
        buildingsProfit.industry._id,
      );

    // prepare buildings - supplies

    const suppliesBuilding: IItemProfitBuilding = ItemDataSource
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.supplies._id,
      );

    // prepare buildings - hardware

    const hardwareBuilding: IItemProfitBuilding = ItemDataSource
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.hardware._id,
      );

    // prepare buildings - fashion

    const fashionBuilding: IItemProfitBuilding = ItemDataSource
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.fashion._id,
      );

    // prepare buildings - furniture

    const furnitureBuilding: IItemProfitBuilding = ItemDataSource
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.furniture._id,
      );

    // prepare buildings - gardening

    const gardeningBuilding: IItemProfitBuilding = ItemDataSource
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.gardening._id,
      );

    // prepare buildings - farmers market

    const farmersBuilding: IItemProfitBuilding = ItemDataSource
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.farmers._id,
      );

    // prepare buildings - donut shop

    const donutBuilding: IItemProfitBuilding = ItemDataSource
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit.donut._id,
      );

    // prepare buildings - fast food restaurante
    const fastFoodBuilding: IItemProfitBuilding = ItemDataSource
      .createSequentialBuildingProfitSlots(
        items,
        buildingsProfit['fast-food']._id,
      );

    const homeAppliancesBuilding: IItemProfitBuilding = ItemDataSource
      .createSequentialBuildingProfitSlots(
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

    const itemProfit: IItemProfit = {
      cycles: [],
      buildings: profitBuildings,
    };

    // find depends.
    return itemProfit;
  }

  static createOrder(args: IItemArgs): any {
    const order = (args.order === 'desc' && -1) || 1;

    const sort = { [args.orderBy]: order };
    return {
      $sort: sort,
    };
  }

  static createMatch(args: IItemArgs): any {
    const match: any = {};

    if (args.filter?.level) {
      match.level = { $lte: args.filter.level };
    }

    return {
      $match: match,
    };
  }
}
