export enum EIcon {
  Placeholder = 'placeholder',
  Checkbox = 'square',
  CheckboxIndeterminate = 'square-square',
  CheckboxChecked = 'check-square',
  TogglerCollapsed = 'plus-square',
  TogglerUncollapsed = 'minus-square',
  Folder = 'folder',
  File = 'file',
  Car = 'car',
  Crow = 'crow',
}

export interface IIconProps {
  className?: string;
  hidden?: boolean;
  icon: EIcon;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
