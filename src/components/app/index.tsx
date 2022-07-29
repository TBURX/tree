import * as React from 'react';
import Checkbox, { ECheckboxState } from '../checkbox';
import Icon, { EIcon } from '../icon';
import Tree from '../tree';
import TreeItemRow from '../tree/tree-item-row';

const App: React.FC = () => (
  <>
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
      items={[
        {
          items: [
            {
              items: [
                {
                  collapsed: true,
                  checked: ECheckboxState.Indeterminate,
                  icon: EIcon.Car,
                  label: 'car',
                },
              ],
              checked: ECheckboxState.Indeterminate,
              icon: EIcon.File,
              selected: true,
              label: 'second',
              collapsed: true,
            },
          ],
          collapsed: false,
          checked: ECheckboxState.Indeterminate,
          icon: EIcon.Folder,
          label: 'first',
        },
      ]}
      onItemChangeCollapsed={(a, b, c) => {
        console.log(a, b, c);
      }}
      onItemChangeCheckState={(a, b, c) => {
        console.log(a, b, c);
      }}
    />
  </>
);

export default App;
