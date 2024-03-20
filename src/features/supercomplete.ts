import { useCallback, useState } from 'react';
import type { Feature } from '../common';
import { mergeEvents } from '../utils/mergeEvents';
import { autocomplete } from './autocomplete';

interface Instance {
  /**
   * ### INTERNAL API ###
   * Whether the last value change is "insertText"
   */
  c?: boolean | 0 | 1;
}

const supercomplete = <T>(): Feature<
  T,
  {
    inlineComplete: (props: { item: T }) => void;
  }
> => {
  const useAutocomplete = autocomplete<T>({ rovingText: true });
  return (cx) => {
    const { getInputProps: _getInputProps, ...rest } = useAutocomplete(cx);
    const [instance] = useState<Instance>({});
    const { inputRef, getItemValue, setInputValue, setFocusItem, _: cxInstance } = cx;

    return {
      ...rest,

      getInputProps: () =>
        mergeEvents(
          {
            onChange: (e) => {
              instance.c =
                (e.nativeEvent as unknown as { inputType: string }).inputType === 'insertText';
            }
          },
          _getInputProps()
        ),

      inlineComplete: useCallback(
        ({ item }) => {
          if (instance.c) {
            instance.c = 0;
            setFocusItem(item);
            const value = getItemValue(item)!;
            const start = cxInstance.b.length;
            const end = value.length;
            setInputValue(cxInstance.b + value.slice(start));
            cxInstance.c = [start, end];
            inputRef.current?.setSelectionRange(start, end);
          }
        },
        [cxInstance, instance, inputRef, getItemValue, setFocusItem, setInputValue]
      )
    };
  };
};

export { supercomplete };
