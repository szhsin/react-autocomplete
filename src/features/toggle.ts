import { useEffect, useRef } from 'react';
import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions } from '../common';
import { useMutableState } from '../hooks/useMutableState';

type ToggleFeature<T> = Feature<
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

const toggle =
  <T>(): ToggleFeature<T> =>
  ({ inputRef, open, setOpen, focusItem }) => {
    const mutable = useMutableState<MutableState>({});
    const toggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (open) inputRef.current?.focus();
    }, [open, inputRef]);

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
            setOpen(true);
          }
        },
        onKeyDown: (e) => {
          const { key } = e;
          if (key === 'ArrowUp' || key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }
      }),

      getInputProps: () => ({
        onKeyDown: (e) => {
          const { key } = e;
          if (key === 'Escape') toggleRef.current?.focus();
          if (key === 'Enter' && focusItem) {
            e.preventDefault();
            toggleRef.current?.focus();
          }
        }
      })
    };
  };

export { type ToggleFeature, toggle };
