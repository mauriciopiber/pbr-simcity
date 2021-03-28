import { screen } from '@testing-library/testcafe'

fixture `Piber Network`
  .page `http://localhost:3000`

test('Home', async t => {
  // Test code
  await t.expect(screen.findByTestId('title').exists).ok();
});
