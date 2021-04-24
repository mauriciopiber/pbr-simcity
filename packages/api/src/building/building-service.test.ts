import BuildingService from '@pbr-simcity/api/src/building/buildingService';

describe('Building Service', () => {
  test('find one doc', async () => {
    const findAll = BuildingService.resolveFindAllStatic();

    expect(findAll[0]).toEqual('a');
    expect(findAll[1]).toEqual('b');
    expect(findAll[2]).toEqual('c');
  });

  test('find one doc', async () => {
    const buildingService = new BuildingService(['z', 'f']);

    const findAll = buildingService.resolveFindAll();

    expect(findAll[0]).toEqual('z');
    expect(findAll[1]).toEqual('f');
  });

  // test('find one doc', async () => {
  //   const findAll = BuildingService.resolveFindAllStatic();

  //   expect(findAll[0]).toEqual('a');
  //   expect(findAll[1]).toEqual('b');
  //   expect(findAll[2]).toEqual('c');
  // });
});
