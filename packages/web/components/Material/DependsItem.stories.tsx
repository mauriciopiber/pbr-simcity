import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import DependsItem, { DependsItemProps } from './DependsItem';

export default {
  title: 'Material/DependsItem',
  component: DependsItem,
  argTypes: {
    name: { name: 'name', type: { name: 'string', required: true } },
  },
} as Meta<DependsItemProps>;


const Template: Story<DependsItemProps> = (args: DependsItemProps) => <DependsItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: "Metal",
  slug: "metal",
  productionTime: 1,
  quantity: 5,
};
