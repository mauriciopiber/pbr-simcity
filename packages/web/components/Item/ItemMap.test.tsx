import ItemMap, { ItemMapProps } from './ItemMap';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Item Map', () => {
  test('render material from primitive', async () => {
    const args: ItemMapProps = {
      name: 'MyTitle',
      usedIn: [],
      depends: [],
    };

    render(<ItemMap {...args} />);

    expect(screen.getByTestId('material-title').textContent).toEqual(args.name);
  });
});
