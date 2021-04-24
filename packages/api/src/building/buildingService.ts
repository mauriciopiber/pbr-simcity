class BuildingService {
  itemRepository: string[];

  constructor(itemRepository: string[]) {
    this.itemRepository = itemRepository;
  }

  static resolveFindAllStatic(): string[] {
    return [
      'a',
      'b',
      'c',
    ];
  }

  resolveFindAll(): string[] {
    return this.itemRepository;
  }
}

export default BuildingService;
