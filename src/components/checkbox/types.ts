export enum ECheckboxState {
  Blank,
  Checked,
  Indeterminate,
}

export interface ICheckboxProps {
  className?: string;
  checked?: ECheckboxState;
  onStateChange?: (state: ECheckboxState) => void;
}
