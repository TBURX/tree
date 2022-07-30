import { EIcon } from '../icon/types';
import { ECheckboxState } from './types';

export const checkboxIcons: Record<ECheckboxState, EIcon> = {
  [ECheckboxState.Blank]: EIcon.Checkbox,
  [ECheckboxState.Checked]: EIcon.CheckboxChecked,
  [ECheckboxState.Indeterminate]: EIcon.CheckboxIndeterminate,
};
