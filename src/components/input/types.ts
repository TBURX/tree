export interface IInputProps {
  className?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
}
