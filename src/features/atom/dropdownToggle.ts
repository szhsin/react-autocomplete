import { useEffect, useRef } from 'react';
import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions } from '../../common';
import { useMutableState } from '../../hooks/useMutableState';

type DropdownToggleFeature<T> = Feature<
  T,
  Pick<GetPropsWithRefFunctions<T>, 'getToggleProps'> & Pick<GetPropsFunctions<T>, 'getInputProps'>
>;

interface MutableState {
  /**
   * ### INTERNAL API ###
   * Whether to skip opening drowdown in onClick
   */
  a?: boolean | 0 | 1;
}

const dropdownToggle =
  <T>(): DropdownToggleFeature<T> =>
  ({ inputRef, open, setOpen, focusItem, onChange }) => {
    const mutable = useMutableState<MutableState>({});
    const toggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (open) inputRef.current?.focus();
    }, [open, inputRef]);

    const openList = () => {
      onChange('');
      setOpen(true);
    };

    const focusToggle = () => setTimeout(() => toggleRef.current?.focus(), 0);

    return {
      getToggleProps: () => ({
        ref: toggleRef,

        onMouseDown: () => {
          mutable.a = open;
        },

        onClick: () => {
          if (mutable.a) {
            mutable.a = 0;
          } else {
            openList();
          }
        },

        onKeyDown: (e) => {
          const { key } = e;
          if (key === 'ArrowDown') {
            e.preventDefault();
            openList();
          }
        }
      }),

      getInputProps: () => ({
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
