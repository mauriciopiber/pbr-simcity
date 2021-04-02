import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import ItemMap, { ItemMapProps } from './ItemMap';

export default {
  title: 'Item/ItemMap',
  component: ItemMap,
  argTypes: {
    name: { name: 'name', type: { name: 'string', required: true } },
  },
} as Meta<ItemMapProps>;

const Template: Story<ItemMapProps> = (args: ItemMapProps) => (
  <ItemMap {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  name: '123',
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
