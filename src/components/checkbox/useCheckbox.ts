import * as React from 'react';
import { ECheckboxState, ICheckboxProps } from './types';

const useCheckbox = (props: ICheckboxProps) => {
  const { checked, onStateChange, className } = props;
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
      onStateChange?.(newState);
    },
    [onStateChange, checkboxState]
  );
  React.useEffect(() => {
    setCheckboxState(checked);
  }, [checked]);
  return {
    checkboxState,
    clickHandler,
    className,
  };
};

export default useCheckbox;
