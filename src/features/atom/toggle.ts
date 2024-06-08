import { useEffect } from 'react';
import type { Feature, GetPropsFunctions } from '../../common';
import { useMutableState } from '../../hooks/useMutableState';

type ToggleFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getToggleProps'>>;

interface MutableState {
  /**
   * ### INTERNAL API ###
   * Whether to skip opening drowdown in onClick
   */
  a?: boolean | 0 | 1;
}

const toggle =
  <T>(): ToggleFeature<T> =>
  ({ inputRef, open, setOpen, focusItem, onChange }) => {
    const mutable = useMutableState<MutableState>({});

    // useEffect(() => {
    //   if (open) inputRef.current?.focus();
    // }, [open, inputRef]);

    const openList = () => {
      // onChange('');
      setOpen(true);
    };

    return {
      getToggleProps: () => ({
        onMouseDown: () => {
          mutable.a = open;
        },
        onClick: () => {
          if (mutable.a) {
            mutable.a = 0;
            inputRef.current?.focus();
          } else {
            openList();
            inputRef.current?.focus();
          }
        },
        // onKeyDown: (e) => {
        //   const { key } = e;
        //   if (key === 'ArrowDown') {
        //     e.preventDefault();
        //     openList();
        //   }
        // }
      })
    };
  };

export { type ToggleFeature, toggle };
