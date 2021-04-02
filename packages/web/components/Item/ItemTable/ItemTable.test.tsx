import ItemTable, { ItemTableProps } from "./ItemTable";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Item Map", () => {
  test("render material from primitive", async () => {
    const args: ItemTableProps = {
      items: [],
      setOrder: Function,
    };

    const setOrder = jest.fn();

    render(<ItemTable {...args} setOrder={setOrder}/>);

    //expect(screen.getByTestId('material-title').textContent).toEqual(args.name);
  });
});
