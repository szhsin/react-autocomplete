import { useEffect, useRef } from 'react';
import type {
  Feature,
  FeatureProps,
  GetPropsFunctions,
  GetPropsWithRefFunctions,
  FeatureState
} from '../../types';
import { useToggle } from '../../hooks/useToggle';

type DropdownToggleFeature<T> = Feature<
  T,
  Pick<GetPropsWithRefFunctions<T>, 'getToggleProps'> &
    Pick<GetPropsFunctions<T>, 'getInputProps'> &
    FeatureState
>;

const dropdownToggle =
  <T>({
    closeOnSelect = true
  }: Pick<FeatureProps<T>, 'closeOnSelect'>): DropdownToggleFeature<T> =>
  ({ inputRef, open, setOpen, focusItem, value, tmpValue }) => {
    const [startToggle, stopToggle] = useToggle(open, setOpen);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const inputValue = tmpValue || value || '';

    useEffect(() => {
      if (open) inputRef.current?.focus();
    }, [open, inputRef]);

    // We don't want to flow through onBlur handler in `autocompleteLite`,
    // this is a workaround to short cut it by waiting for `open` becomes false
    const focusToggle = () => setTimeout(() => toggleRef.current?.focus(), 0);

    return {
      isInputEmpty: !inputValue,

      getToggleProps: () => ({
        type: 'button',
        'aria-haspopup': true,
        'aria-expanded': open,
        ref: toggleRef,

        onMouseDown: startToggle,

        onClick: stopToggle,

        onKeyDown: (e) => {
          const { key } = e;
          if (key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }
      }),

      getInputProps: () => ({
        value: inputValue,
        onKeyDown: (e) => {
          const { key } = e;
          if (key === 'Escape' || (closeOnSelect && focusItem && key === 'Enter')) {
            focusToggle();
          }
        }
      })
    };
  };

export { type DropdownToggleFeature, dropdownToggle };
