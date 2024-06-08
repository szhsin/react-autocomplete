import { useRef } from 'react';
import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions } from '../../common';

type DropdownToggleFeature<T> = Feature<
  T,
  Pick<GetPropsWithRefFunctions<T>, 'getToggleProps'> & Pick<GetPropsFunctions<T>, 'getInputProps'>
>;

const dropdownToggle =
  <T>(): DropdownToggleFeature<T> =>
  ({ focusItem }) => {
    const toggleRef = useRef<HTMLButtonElement>(null);

    const focusToggle = () => setTimeout(() => toggleRef.current?.focus(), 0);

    return {
      getToggleProps: () => ({
        ref: toggleRef
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
