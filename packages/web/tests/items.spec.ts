import { screen } from '@testing-library/testcafe'

fixture `Piber Network`
  .page `http://localhost:3000`


async function enterItemPage(t: any, name: string) {
  await t.expect(screen.getByTestId('title').exists).ok();
  await t.click(screen.getByTestId('menu-items'));
  await t.click(screen.getByText(name));
}


test('Item Stats - Metal', async t => {
  // Test code


  const fixture = 'Metal';

  await enterItemPage(t, fixture);
  await t.expect(screen.findByTestId('material-title').exists).ok();
});

test('Item Stats - Planks', async t => {
  // Test code

  const fixture = 'Planks';

  await enterItemPage(t, fixture);
  await t.expect(screen.findByTestId('material-title').exists).ok();

  //await t.expect(screen.findByTestId('dependency-quantity-time-planks').textContent).eql('60');
});



test('Item Stats - Ladder', async t => {
  // Test code

  const fixture = 'Ladder';

  await enterItemPage(t, fixture);
  await t.expect(screen.findByTestId('material-title').exists).ok();

  await t.expect(screen.findByTestId('dependency-quantity-time-planks').textContent).eql('60');
  await t.expect(screen.findByTestId('dependency-time-bill-planks').textContent).eql('63');
});



test('Item Stats - Cherry Cheesecake', async t => {
  // Test code

  const fixture = 'Cherry Cheesecake';

  await enterItemPage(t, fixture);
  await t.expect(screen.findByTestId('material-title').exists).ok();

  // check seeds from tree saplings
  await t.expect(screen.findByTestId('dependency-quantity-time-tree-saplings-seeds').textContent).eql('20');
  await t.expect(screen.findByTestId('dependency-time-bill-tree-saplings-seeds').textContent).eql('20');

  await t.expect(screen.findByTestId('dependency-quantity-time-flour-bag-seeds').textContent).eql('20');
  await t.expect(screen.findByTestId('dependency-time-bill-flour-bag-seeds').textContent).eql('20');


  await t.expect(screen.findByTestId('dependency-quantity-time-fruit-and-berries-seeds').textContent).eql('20');
  await t.expect(screen.findByTestId('dependency-time-bill-fruit-and-berries-seeds').textContent).eql('20');


  // // check shovel data
  await t.expect(screen.findByTestId('dependency-quantity-time-tree-saplings-shovel').textContent).eql('30');
  await t.expect(screen.findByTestId('dependency-time-bill-tree-saplings-shovel').textContent).eql('39');

  await t.expect(screen.findByTestId('dependency-quantity-time-fruit-and-berries-tree-saplings').textContent).eql('90');
  await t.expect(screen.findByTestId('dependency-time-bill-fruit-and-berries-tree-saplings').textContent).eql('129');

  await t.expect(screen.findByTestId('dependency-quantity-time-fruit-and-berries').textContent).eql('90');
  await t.expect(screen.findByTestId('dependency-time-bill-fruit-and-berries').textContent).eql('219');

  // await t.expect(screen.findByTestId('dependency-quantity-time-tree-saplings').textContent).eql('90');
  // await t.expect(screen.findByTestId('dependency-time-bill-tree-saplings').textContent).eql('129');
  // await t.expect(screen.findByTestId('dependency-quantity-time-planks').textContent).eql('60');


});




test('Item Stats - Cheese Fries', async t => {
  const fixture = 'Cheese Fries';
  await enterItemPage(t, fixture);
  await t.expect(screen.findByTestId('material-title').exists).ok();
})
