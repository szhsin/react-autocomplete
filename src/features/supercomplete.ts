import { useCallback, useState } from 'react';
import type { Feature } from '../common';
import { autocomplete } from './autocomplete';

export interface Instance {
  /**
   * ### INTERNAL API ###
   * Whether the last value change is "insertText"
   */
  c?: boolean | 0 | 1;
}

const supercomplete = <T>() => {
  const useAutocomplete = autocomplete<T>({ rovingText: true });
  const useSupercomplete: Feature<
    T,
    {
      inlineComplete: (props: { index?: number; value: string }) => void;
    }
  > = (cx) => {
    const { getInputProps: _getInputProps, ...rest } = useAutocomplete(cx);
    const [instance] = useState<Instance>({});
    const { inputRef, setInputValue, setFocusIndex, _: cxInstance } = cx;

    return {
      ...rest,

      getInputProps: () => {
        const inputProps = _getInputProps();
        return {
          ...inputProps,
          onChange: (e) => {
            instance.c =
              (e.nativeEvent as unknown as { inputType: string }).inputType === 'insertText';
            inputProps.onChange!(e);
          }
        };
      },

      inlineComplete: useCallback(
        ({ index = 0, value }) => {
          if (instance.c) {
            instance.c = 0;
            setFocusIndex(index);
            const start = cxInstance.b.length;
            const end = value.length;
            setInputValue(cxInstance.b + value.slice(start));
            cxInstance.c = [start, end];
            inputRef.current?.setSelectionRange(start, end);
          }
        },
        [cxInstance, instance, inputRef, setFocusIndex, setInputValue]
      )
    };
  };

  return useSupercomplete;
};

export { supercomplete };
