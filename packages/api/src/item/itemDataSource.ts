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
  BuildingSlugs,
} from '@pbr-simcity/types/types';
import { itemsList } from '../itemList';

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

  async resolveItemProfit(item: string): Promise<IItemProfit> {
    if (!item || item === '') {
      throw new Error('Missing item to analyse');
    }

    const buildings: IBuildingPreviewModel[] = await this.itemRepository.findBuildings();

    const items: IItemProfitDependency[] = await this.flatItemsFromDependency(
      item,
    );

    const itemsWithBuilding = items.map((a: any) => ({
      ...a,
      building: buildings.find((b: any) => `${b._id}` === `${a.building}`),
    }));
    // prepare buildings - industry

    const industryBuilding: IItemProfitBuilding = ItemDataSource //
      .createParallelBuildingProfitSlots(
        itemsWithBuilding,
        'industry',
      );

    // prepare buildings - supplies

    const suppliesBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        'supplies',
      );

    // prepare buildings - hardware

    const hardwareBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        'hardware',
      );

    // prepare buildings - fashion

    const fashionBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        'fashion',
      );

    // prepare buildings - furniture

    const furnitureBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        'furniture',
      );

    // prepare buildings - gardening

    const gardeningBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        'gardening',
      );

    // prepare buildings - farmers market

    const farmersBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        'farmers',
      );

    // console.log(farmersBuilding);

    // prepare buildings - donut shop

    const donutBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        'donut',
      );

    // prepare buildings - fast food restaurante
    const fastFoodBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        'fast-food',
      );

    const homeAppliancesBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        'home-appliances',
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

  /**
   * Retorna um Array com todas dependências de determinado item até a ultima folha.
   * @param rootItem
   */
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

  /**
   * Função responsável por concentrar toda lógica de
   * programação referente à busca de critical path de dependencias
   *
   * @param slug
   */
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
  /**
   * Procura recursivamente por dependências até a última folha
   *
   * @param depends
   */
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

  /**
   * Encontra as dependências relativas a determinado item dentro da recursividade
   *
   * @param depends
   */
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

  static createParallelBuildingProfitSlots(
    items: IItemProfitDependency[],
    buildingSlug: BuildingSlugs,
  ): IItemProfitBuilding {
    const itemsDependsIndustry: IItemProfitDependency[] = items.filter(
      (a: IItemProfitDependency) => `${a.building.slug}` === `${buildingSlug}`,
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

  // async createSlot(a, index, lastCritical, lastComplete) {
  //   // console.log(JSON.stringify(a));
  //   const dependencyGraph = await this.resolveItemDependencyGraph(a.slug);

  //   const { criticalPath } = dependencyGraph;

  //   // console.log(dependencyGraph);

  //   const start = lastCritical === criticalPath ? lastComplete : criticalPath;

  //   const complete = lastCritical === criticalPath
  //     ? start + a.productionTime
  //     : criticalPath + a.productionTime;

  //   const slot: IItemProfitBuildingSlots = {
  //     slot: index + 1,
  //     schedule: criticalPath,
  //     start,
  //     complete,
  //     item: a,
  //   };

  //   lastComplete = complete;
  //   lastCritical = criticalPath;
  //   // console.log(a.slug, start, lastComplete);
  //   return slot;
  // }

  async resolveItemProfitSequentialSlots(items: any[]) {
    let lastComplete = 0;
    let lastCritical = 0;

    // console.log(JSON.stringify(items));
    const sequentialSlotsPromises: Promise<IItemProfitBuildingSlots>[] = items.map(
      async (a: any, index: number) => {
        // console.log(JSON.stringify(a));
        const dependencyGraph = await this.resolveItemDependencyGraph(a.slug);

        const { criticalPath } = dependencyGraph;

        // console.log(dependencyGraph);

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

    const sequentialSlots = await Promise.all(sequentialSlotsPromises);
    return sequentialSlots;
  }

  async createSequentialBuildingProfitSlots(
    items: IItemProfitDependency[],
    buildingSlug: BuildingSlugs,
  ): Promise<IItemProfitBuilding> {
    const itemsDepends: IItemProfitDependency[] = items.filter(
      (a: IItemProfitDependency) => `${a.building.slug}` === `${buildingSlug}`,
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

    const sequentialSlots = await this.resolveItemProfitSequentialSlots(itemsExpand);

    const building: IItemProfitBuilding = {
      slots: sequentialSlots,
    };
    return building;
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
