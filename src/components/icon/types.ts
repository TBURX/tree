export enum EIcon {
  Placeholder = 'placeholder',
  Checkbox = 'square',
  CheckboxIndeterminate = 'square-square',
  CheckboxChecked = 'check-square',
  TogglerCollapsed = 'plus-square',
  TogglerUncollapsed = 'minus-square',
  Folder = 'folder',
  File = 'file',
  Car = 'crow',
}

export interface IIconProps {
  className?: string;
  icon: EIcon;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
