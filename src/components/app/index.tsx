import * as React from 'react';
import Checkbox from '../checkbox';
import { ECheckboxState } from '../checkbox/types';
import Icon from '../icon';
import { EIcon } from '../icon/types';
import Tree from '../tree';
import TreeItemRow from '../tree/tree-item-row';
import { ITreeItem } from '../tree/types';
import { Wrapper } from './styled';

const items: ITreeItem<string>[] = [
  {
    items: [
      {
        items: [
          {
            collapsed: true,
            checked: ECheckboxState.Indeterminate,
            icon: EIcon.Car,
            label: 'car',
            data: 'car data',
          },
          {
            collapsed: true,
            checked: ECheckboxState.Indeterminate,
            icon: EIcon.Car,
            label: 'car1',
            data: 'car1 data',
          },
          {
            collapsed: true,
            checked: ECheckboxState.Indeterminate,
            icon: EIcon.Car,
            label: 'car2',
            data: 'car2 data',
          },
        ],
        checked: ECheckboxState.Indeterminate,
        icon: EIcon.File,
        selected: true,
        label: 'second',
        data: 'second data',
        collapsed: true,
      },
      {
        items: [
          {
            collapsed: true,
            checked: ECheckboxState.Indeterminate,
            icon: EIcon.Car,
            label: 'car3',
            data: 'car3 data',
          },
          {
            collapsed: true,
            checked: ECheckboxState.Indeterminate,
            icon: EIcon.Car,
            label: 'car4',
            data: 'car4 data',
          },
          {
            collapsed: true,
            checked: ECheckboxState.Indeterminate,
            icon: EIcon.Car,
            label: 'car5',
            data: 'car5 data',
          },
        ],
        checked: ECheckboxState.Indeterminate,
        icon: EIcon.File,
        selected: true,
        label: 'second1',
        data: 'second1 data',
        collapsed: true,
      },
      {
        items: [
          {
            collapsed: true,
            checked: ECheckboxState.Indeterminate,
            icon: EIcon.Car,
            label: 'car6',
            data: 'car6 data',
          },
          {
            collapsed: true,
            checked: ECheckboxState.Indeterminate,
            icon: EIcon.Car,
            label: 'car7',
            data: 'car7 data',
          },
          {
            collapsed: true,
            checked: ECheckboxState.Indeterminate,
            icon: EIcon.Car,
            label: 'car8',
            data: 'car8 data',
          },
        ],
        checked: ECheckboxState.Indeterminate,
        icon: EIcon.File,
        selected: true,
        label: 'second2',
        data: 'second2 data',
        collapsed: true,
      },
    ],
    collapsed: false,
    checked: ECheckboxState.Indeterminate,
    icon: EIcon.Folder,
    label: 'first',
    data: 'first data',
  },
];

const App: React.FC = () => (
  <Wrapper>
    <Icon icon={EIcon.Placeholder} />
    <Icon icon={EIcon.Checkbox} />
    <Icon icon={EIcon.CheckboxChecked} />
    <Icon icon={EIcon.CheckboxIndeterminate} />
    <Icon icon={EIcon.TogglerCollapsed} />
    <Icon icon={EIcon.TogglerUncollapsed} />
    <Icon icon={EIcon.Folder} />
    <Icon icon={EIcon.File} />
    <Icon icon={EIcon.Car} />
    <Checkbox
      checked={ECheckboxState.Checked}
      onStateChange={(val) => {
        console.log(val);
      }}
    />
    <TreeItemRow
      key="0"
      id="0"
      hasChild
      checked={ECheckboxState.Checked}
      icon={EIcon.Car}
      label="sdfsdfssdff"
      level={0}
      onChangeCollapsed={(collapsed, id) => {
        console.log({ collapsed, id });
      }}
    />
    <TreeItemRow
      key="1"
      id="1"
      selected
      checked={ECheckboxState.Checked}
      icon={EIcon.Car}
      label="sdfsdfssdff"
      level={0}
      onChangeCollapsed={(collapsed, id) => {
        console.log({ collapsed, id });
      }}
    />
    <TreeItemRow
      key="2"
      id="2"
      hasChild
      collapsed
      checked={ECheckboxState.Checked}
      icon={EIcon.Car}
      label="sdfsdfssdff"
      level={0}
      onChangeCollapsed={(collapsed, id) => {
        console.log({ collapsed, id });
      }}
    />
    <Tree
      items={items}
      onItemChangeCollapsed={(a, b, c) => {
        console.log(a, b, c);
      }}
      onItemChangeCheckState={(a, b, c) => {
        console.log(a, b, c);
      }}
      onItemClick={(a, b) => {
        console.log(a, b);
      }}
      someshit={35}
    />
  </Wrapper>
);

export default App;
