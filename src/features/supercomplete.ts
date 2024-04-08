import { useCallback } from 'react';
import type { Feature } from '../common';
import { mergeEvents } from '../utils/mergeEvents';
import { useMutableState } from '../hooks/useMutableState';
import { autocomplete } from './autocomplete';

interface MutableState {
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
    const mutable = useMutableState<MutableState>({});
    const { inputRef, getItemValue, setInputValue, setFocusItem, _: cxInstance } = cx;

    return {
      ...rest,

      getInputProps: () =>
        mergeEvents(
          {
            onChange: (e) => {
              mutable.c =
                (e.nativeEvent as unknown as { inputType: string }).inputType === 'insertText';
            }
          },
          _getInputProps()
        ),

      inlineComplete: useCallback(
        ({ item }) => {
          if (mutable.c) {
            mutable.c = 0;
            setFocusItem(item);
            const value = getItemValue(item)!;
            const start = cxInstance.b.length;
            const end = value.length;
            setInputValue(cxInstance.b + value.slice(start));
            cxInstance.c = [start, end];
            inputRef.current?.setSelectionRange(start, end);
          }
        },
        [cxInstance, mutable, inputRef, getItemValue, setFocusItem, setInputValue]
      )
    };
  };
};

export { supercomplete };
