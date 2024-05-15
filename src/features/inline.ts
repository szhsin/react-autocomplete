import { useCallback } from 'react';
import type { Feature, GetProps } from '../common';
import { useMutableState } from '../hooks/useMutableState';

type InlineFeature<T> = Feature<
  T,
  {
    inlineComplete: (props: { item: T }) => void;
  } & Pick<GetProps<T>, 'getInputProps'>
>;

interface MutableState {
  /**
   * ### INTERNAL API ###
   * Whether the last value change is "insertText"
   */
  c?: boolean | 0 | 1;
}

const inline =
  <T>(): InlineFeature<T> =>
  ({ inputRef, getItemValue, setInputValue, setFocusItem, $: cxMutable }) => {
    const mutable = useMutableState<MutableState>({});

    return {
      getInputProps: (() => ({
        onChange: (e) => {
          mutable.c =
            (e.nativeEvent as unknown as { inputType: string }).inputType === 'insertText';
        }
      })) as GetProps<T>['getInputProps'],

      inlineComplete: useCallback(
        ({ item }) => {
          if (mutable.c) {
            mutable.c = 0;
            setFocusItem(item);
            const value = getItemValue(item);
            const start = cxMutable.b.length;
            const end = value.length;
            setInputValue(cxMutable.b + value.slice(start));
            inputRef.current?.setSelectionRange(start, end);
          }
        },
        [cxMutable, mutable, inputRef, getItemValue, setFocusItem, setInputValue]
      )
    };
  };

export { type InlineFeature, inline };
