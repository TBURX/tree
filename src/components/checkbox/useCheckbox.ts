import * as React from 'react';
import { ECheckboxState, ICheckboxProps } from './types';

const useCheckbox = (props: ICheckboxProps) => {
  const { checked, onStateChange } = props;
  const [checkboxState, setCheckboxState] = React.useState<ECheckboxState>(
    ECheckboxState.Blank
  );
  const clickHandler = React.useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    (event) => {
      event.stopPropagation();
      const newState =
        checkboxState === ECheckboxState.Checked
          ? ECheckboxState.Blank
          : ECheckboxState.Checked;
      setCheckboxState(newState);
    },
    [checkboxState]
  );
  React.useEffect(() => {
    setCheckboxState(checked);
  }, [checked]);
  React.useEffect(() => {
    onStateChange?.(checkboxState);
  }, [checkboxState]);
  return {
    checkboxState,
    clickHandler,
    className: props.className,
  };
};

export default useCheckbox;
