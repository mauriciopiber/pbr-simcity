import MaterialMap, { MaterialMapProps } from './MaterialMap';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


describe('Material Map', () => {

  test('render material from primitive', async () => {

    const args: MaterialMapProps = {
      name: 'MyTitle'
    }

    render(<MaterialMap {...args}/>);

    expect(screen.getByTestId('material-title').textContent).toEqual(args.name);
  })
})
