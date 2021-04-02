import { buildingsList, itemsList } from './itemList';
import { profit } from './calculator';
import { IItem, IBuilding, IItemPrint } from '@pbr-simcity/types/types';
import Table from 'cli-table';

function renderTable(items: IItemPrint[]) {
  // instantiate
  var table = new Table({
    head: [
      'Item',
      'Time',
      'Max Value',
      'Cost',
      'Profit',
      'Per Min',
      'Per Hour',
    ],
    colWidths: [50, 10, 10, 10, 10, 10, 10],
  });

  const renderData = items.map((p) => Object.values(p));

  table.push(...renderData);
}

function calculateProfit(buildings: IBuilding[], items: IItem[]) {
  const calculateItems: IItemPrint[] = profit(
    buildings,
    items.filter((p) => p.level <= 21),
  );
  renderTable(calculateItems);
}

calculateProfit(buildingsList, itemsList);
