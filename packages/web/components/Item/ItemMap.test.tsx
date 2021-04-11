import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemMap, { ItemMapProps } from './ItemMap';
import '@testing-library/jest-dom/extend-expect';

describe('Item Map', () => {
  test('render material from primitive', async () => {
    const args: ItemMapProps = {
      name: 'Item Map',
      usedIn: [],
      depends: [],
    };

    render(<ItemMap {...args} />);

    expect(screen.getByTestId('material-title').textContent).toEqual(args.name);
  });
});
