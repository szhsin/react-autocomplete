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

const supercomplete: () => Feature<{
  inlineComplete: (props: { index: number; value: string }) => void;
}> = () => {
  const useAutocomplete = autocomplete({ rovingText: true });
  return (cx) => {
    const { inputProps, ...rest } = useAutocomplete(cx);
    const [instance] = useState<Instance>({});
    const { inputRef, setInputValue, setFocusIndex, _: cxInstance } = cx;

    return {
      ...rest,

      inputProps: {
        ...inputProps,
        onChange: (e) => {
          instance.c = (e.nativeEvent as unknown as { inputType: string }).inputType === 'insertText';
          inputProps.onChange!(e);
        },
      },

      inlineComplete: useCallback(
        ({ index, value }) => {
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
};

export { supercomplete };
