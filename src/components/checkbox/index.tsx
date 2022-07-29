import * as React from 'react';
import Icon, { EIcon } from '../icon';
import './style.less';

export enum ECheckboxState {
  Blank,
  Checked,
  Indeterminate,
}

export interface ICheckboxProps {
  checked?: ECheckboxState;
  onStateChange?: (state: ECheckboxState) => void;
}

const checkboxIcons: Record<ECheckboxState, EIcon> = {
  [ECheckboxState.Blank]: EIcon.Checkbox,
  [ECheckboxState.Checked]: EIcon.CheckboxChecked,
  [ECheckboxState.Indeterminate]: EIcon.CheckboxIndeterminate,
};

const Checkbox: React.FC<ICheckboxProps> = ({
  checked = ECheckboxState.Blank,
  onStateChange,
}) => {
  const [checkboxState, setCheckboxState] = React.useState<ECheckboxState>(
    ECheckboxState.Blank
  );
  const clickHandler = React.useCallback(() => {
    const newState =
      checkboxState === ECheckboxState.Checked
        ? ECheckboxState.Blank
        : ECheckboxState.Checked;
    setCheckboxState(newState);
    onStateChange?.(newState);
  }, [checkboxState, onStateChange]);
  React.useEffect(() => {
    setCheckboxState(checked);
  }, [checked]);
  return (
    <div className="checkbox">
      <Icon icon={checkboxIcons[checkboxState]} onClick={clickHandler} />
    </div>
  );
};

export default React.memo(Checkbox);
