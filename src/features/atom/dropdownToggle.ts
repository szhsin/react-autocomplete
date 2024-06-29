import { useEffect, useRef } from 'react';
import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions, Clearable } from '../../common';
import { useToggle } from '../../hooks/useToggle';

type DropdownToggleFeature<T> = Feature<
  T,
  Pick<GetPropsWithRefFunctions<T>, 'getToggleProps'> &
    Pick<GetPropsFunctions<T>, 'getInputProps'> &
    Clearable
>;

const dropdownToggle =
  <T>(): DropdownToggleFeature<T> =>
  ({ inputRef, open, setOpen, focusItem, value, tmpValue }) => {
    const [startToggle, stopToggle] = useToggle(open, setOpen);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const inputValue = tmpValue || value || '';

    useEffect(() => {
      if (open) inputRef.current?.focus();
    }, [open, inputRef]);

    const focusToggle = () => setTimeout(() => toggleRef.current?.focus(), 0);

    return {
      clearable: !!inputValue,

      getToggleProps: () => ({
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
          if (key === 'Escape') focusToggle();
          if (key === 'Enter' && focusItem) {
            e.preventDefault();
            focusToggle();
          }
        }
      })
    };
  };

export { type DropdownToggleFeature, dropdownToggle };
