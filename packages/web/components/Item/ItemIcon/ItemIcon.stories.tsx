import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import ItemIcon, { ItemIconProps } from './ItemIcon';

export default {
  title: 'Item/ItemIcon',
  component: ItemIcon,
  argTypes: {
    // name: { name: 'name', type: { name: 'string', required: true } },
  },
} as Meta<ItemIconProps>;

const Template: Story<ItemIconProps> = (args: ItemIconProps) => (
  <ItemIcon {...args} />
);

export const VerySmallIcon = Template.bind({});
VerySmallIcon.args = {
  slug: 'donuts',
  size: 'xs',
};

export const SmallIcon = Template.bind({});
SmallIcon.args = {
  slug: 'donuts',
  size: 'sm',
};

export const MediumIcon = Template.bind({});
MediumIcon.args = {
  slug: 'donuts',
  size: 'md',
};

// export const LargeIcon = Template.bind({});
// LargeIcon.args = {
//   slug: 'donuts',
//   size: 'lg',
// };

// export const VeryLargeIcon = Template.bind({});
// VeryLargeIcon.args = {
//   slug: 'donuts',
//   size: 'vlg',
// };
