import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";


import ItemTable, { ItemTableProps } from "./ItemTable";

export default {
  title: "Item/ItemTable",
  component: ItemTable,
  argTypes: {
    name: { name: "name", type: { name: "string", required: true } },
  },
} as Meta<ItemTableProps>;

const Template: Story<ItemTableProps> = (args: ItemTableProps) => (
  <ItemTable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  items: [
    {
      _id: "605fa6cfd9397142fe1793e1",
      name: "Donuts",
      level: 18,
      building: {
        name: "Donuts shop",
        slots: 1,
        parallel: true,
        nextSlot: 1,
        slug: "donuts-shop",
      },
      usedIn: [],
      slug: "donuts",
      productionTime: 45,
      maxValue: 950,
      depends: [
        { item: "605fa6cfd9397142fe1793d6", quantity: 1 },
        { item: "605fa6cfd9397142fe1793bf", quantity: 1 },
      ],
      billTime: 240,
      billCost: 680,
      profitOwnProduction: 270,
      profitOwnByMinute: 6,
      profitOwnByHour: 360,
    },
  ],
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
