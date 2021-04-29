import {
  IItemDataSource,
  IItemRepository,
  IItemModel,
  IItemProfit,
  IItemProfitDependency,
  IItemProfitBuldingList,
  IItemProfitBuildingSlots,
  IBuildingPreviewModel,
  ItemSortRepository,
  // ItemMatchRepository,
  IItemDependency,
  IItemArgs,
  // IBuilding,
  IItemProfitBuilding,
  IItemDependencyGraph,
  ItemDependencyGraph,
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

  recursiveCreateDependencyGraph(
    depends: IItemDependency[],
    items: IItemModel[],
  ): ItemDependencyGraph[] {
    return depends.map((a: IItemDependency) => {
      const itemDepends = items.find((b: IItemModel) => `${b._id}` === `${a.item}`);

      if (!itemDepends) {
        throw new Error('Item not found');
      }

      const innerDependencyGraph:
        ItemDependencyGraph[] = this.recursiveCreateDependencyGraph(itemDepends.depends, items);

      // console.log(innerDependencyGraph);

      const criticalPath = innerDependencyGraph.reduce(
        (prev: number, current: ItemDependencyGraph) => (
          (prev > current.productionTime) ? prev : current.productionTime
        ),
        0,
      );

      return {
        slug: itemDepends.slug,
        building: itemDepends.building.slug,
        quantity: a.quantity,
        parallel: itemDepends.building.parallel,
        productionTime: itemDepends.productionTime,
        depends: innerDependencyGraph,
        criticalPath: criticalPath + itemDepends.productionTime,
        innerPath: criticalPath,
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
        buildings.find((a: IBuildingPreviewModel) => a.slug === 'industry'),
      );

    // prepare buildings - supplies

    const suppliesBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        buildings.find((a: IBuildingPreviewModel) => a.slug === 'supplies'),
      );

    // prepare buildings - hardware

    const hardwareBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        buildings.find((a: IBuildingPreviewModel) => a.slug === 'hardware'),
      );

    // prepare buildings - fashion

    const fashionBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        buildings.find((a: IBuildingPreviewModel) => a.slug === 'fashion'),
      );

    // prepare buildings - furniture

    const furnitureBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        buildings.find((a: IBuildingPreviewModel) => a.slug === 'furniture'),
      );

    // prepare buildings - gardening

    const gardeningBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        buildings.find((a: IBuildingPreviewModel) => a.slug === 'gardening'),
      );

    // prepare buildings - farmers market

    const farmersBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        buildings.find((a: IBuildingPreviewModel) => a.slug === 'farmers'),
      );

    // console.log(farmersBuilding);

    // prepare buildings - donut shop

    const donutBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        buildings.find((a: IBuildingPreviewModel) => a.slug === 'donut'),
      );

    // prepare buildings - fast food restaurante
    const fastFoodBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        buildings.find((a: IBuildingPreviewModel) => a.slug === 'fast-food'),
      );

    const homeAppliancesBuilding: IItemProfitBuilding = await this
      .createSequentialBuildingProfitSlots(
        itemsWithBuilding,
        buildings.find((a: IBuildingPreviewModel) => a.slug === 'home-appliances'),
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
      slug: item,
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

    const criticalItem = dependencyGraph.reduce(
      (prev: any, current: any) => (
        (prev.criticalPath > current.criticalPath) ? prev : current
      ),
      0,
    );

    const criticalConflict = dependencyGraph.find(
      (a: any) => a.building === criticalItem.building
        && a.innerPath === criticalItem.innerPath
        && a.slug !== criticalItem.slug,
    );

    const criticalPath = criticalItem.criticalPath + (
      (
        criticalConflict
        && criticalConflict.parallel === false
        && criticalConflict?.productionTime
      ) || 0
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
    building: IBuildingPreviewModel | null | undefined,
  ): IItemProfitBuilding {
    if (!building) {
      throw new Error('Missing building');
    }
    const itemsDependsIndustry: IItemProfitDependency[] = items.filter(
      (a: IItemProfitDependency) => `${a.building.slug}` === `${building.slug}`,
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
      slug: building.slug,
      name: building.name,
      slots: industrySlots,
    };
    return industryBuilding;
  }

  async resolveItemProfitSequentialSlots(items: any[]) {
    const dependencyGraphItemsPromises = items.map(async (a: any) => {
      const dependencyGraph = await this.resolveItemDependencyGraph(a.slug);
      return {
        [a.slug]: dependencyGraph,
      };
    });

    const allDependencyGraph = await Promise.all(dependencyGraphItemsPromises);

    const dependencyGraphs = allDependencyGraph.reduce((a: any, b:any) => {
      const slug: string | undefined = Object.keys(b)[0];
      if (!slug) {
        throw new Error('Error finding dependency graph');
      }
      return {
        ...a,
        [slug]: b[slug],
      };
    }, {});

    let lastComplete = 0;
    let lastCritical = 0;

    const sequentialSlotsPromises: IItemProfitBuildingSlots[] = items.map(
      (a: any, index: number) => {
        const dependencyGraph = dependencyGraphs[a.slug];

        const { criticalPath } = dependencyGraph;

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
        return slot;
      },
    );

    return sequentialSlotsPromises;
  }

  async createSequentialBuildingProfitSlots(
    items: IItemProfitDependency[],
    building: IBuildingPreviewModel | null | undefined,
  ): Promise<IItemProfitBuilding> {
    if (!building) {
      throw new Error('Building not found');
    }

    const itemsDepends: IItemProfitDependency[] = items.filter(
      (a: IItemProfitDependency) => `${a.building.slug}` === `${building.slug}`,
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

    const buildingProfit: IItemProfitBuilding = {
      slug: building.slug,
      name: building.name,
      slots: sequentialSlots,
    };
    return buildingProfit;
  }

  static createOrder(args: IItemArgs): ItemSortRepository {
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
