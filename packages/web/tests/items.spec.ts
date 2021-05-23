

import { screen } from '@testing-library/testcafe';

fixture`Piber Network`.page`http://localhost:3000`;


async function enterItemPage(t: any, name: string) {
  await t.click(screen.getByTestId('menu-items'));
  await t.click(screen.getByText(name));
}

test('Item Stats - Metal', async (t) => {
  // Test code

  const fixture = 'Metal';

  await enterItemPage(t, fixture);
  // await t.expect(screen.findByTestId('material-title').exists).ok();
});

test('Item Stats - Planks', async (t) => {
  // Test code

  const fixture = 'Planks';

  await enterItemPage(t, fixture);

});

test('Item Stats - Ladder', async (t) => {
  // Test code

  const fixture = 'Ladder';

  await enterItemPage(t, fixture);
  // await t.expect(screen.findByTestId('material-title').exists).ok();

});

test('Item Stats - Cherry Cheesecake', async (t) => {
  // Test code

  const fixture = 'Cherry Cheesecake';

  await enterItemPage(t, fixture);
  // await t.expect(screen.findByTestId('material-title').exists).ok();

  // check seeds from tree saplings

});

test('Item Stats - Cheese Fries', async (t) => {
  const fixture = 'Cheese Fries';
  await enterItemPage(t, fixture);
  // await t.expect(screen.findByTestId('material-title').exists).ok();
});
