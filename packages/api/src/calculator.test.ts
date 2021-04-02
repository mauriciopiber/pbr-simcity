import { /*IItem, IBuilding,*/ IItemDependency, IItemPrint, IItemDependencyValues } from './types/types';
import { buildingsList, itemsList } from './itemList';
import { profit, dependency } from './calculator';


describe('test dependency', () => {
  test('calculate depenedncy', () => {

    const [
      metal
    ] = itemsList;

    //const metal = itemsList.find(a => a.name == 'Metal');

    const depends: IItemDependency[] = [
      {
        item: metal,
        quantity: 2,
      }
    ]


    const values: IItemDependencyValues = dependency(depends);


  })
})

describe('test profit calculator', () => {
  test('calculate profit', () => {
    const calculateItems: IItemPrint[] = profit(buildingsList, itemsList);

    /* Validate Metal */
    const metal = calculateItems.find(a => a.name == 'Metal');
    expect(metal?.time).toEqual(1);
    expect(metal?.maxValue).toEqual(10);
    expect(metal?.cost).toEqual(0);
    expect(metal?.profit).toEqual(10);
    expect(metal?.profitByMinute).toEqual(10);
    expect(metal?.profitByHour).toEqual(600);

    /* Validate Wood */
    const wood = calculateItems.find(a => a.name == 'Wood');
    expect(wood?.time).toEqual(3);
    expect(wood?.maxValue).toEqual(20);
    expect(wood?.cost).toEqual(0);
    expect(wood?.profit).toEqual(20);
    expect(wood?.profitByMinute).toEqual(6.67);
    expect(wood?.profitByHour).toEqual(400);


    const nails = calculateItems.find(a => a.name == 'Nails');
    expect(nails?.time).toEqual(5);
    expect(nails?.maxValue).toEqual(80);
    expect(nails?.cost).toEqual(20);
    expect(nails?.profit).toEqual(60);
    expect(nails?.profitByMinute).toEqual(12);
    expect(nails?.profitByHour).toEqual(720);


  })
})
