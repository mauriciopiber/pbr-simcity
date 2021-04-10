import { IItem, IItemPrint } from '@pbr-simcity/types/types';
import Table from 'cli-table';
import { itemsList } from '@pbr-simcity/api/src/itemList';
import { profit } from '@pbr-simcity/api/src/calculator';

function renderTable(items: IItemPrint[]) {
  // instantiate
  const table = new Table({
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

function calculateProfit(items: IItem[]) {
  const calculateItems: IItemPrint[] = profit(
    items.filter((p) => p.level <= 21),
  );
  renderTable(calculateItems);
}

calculateProfit(itemsList);
