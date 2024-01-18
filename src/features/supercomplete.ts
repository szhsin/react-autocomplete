import { useCallback } from 'react';
import type { Feature } from '../common';
import { autocomplete } from './autocomplete';

const supercomplete: () => Feature<{
  inlineComplete: (props: { index: number; value: string }) => void;
}> = () => (cx) => {
  const base = autocomplete({ rovingInput: true })(cx);

  const { inputRef, setFocusIndex, setInputValue, _ } = cx;
  return {
    ...base,
    onKeyDown: (e) => {
      base.onKeyDown!(e);
      if (e.key === 'Enter') {
        const input = inputRef.current;
        if (input) {
          input.setSelectionRange(input.value.length, input.value.length);
        }
      }
    },
    inlineComplete: useCallback(
      ({ index, value }) => {
        setFocusIndex(index);
        setInputValue(value);
        const input = inputRef.current;
        if (input) {
          input.value = value;
          input.setSelectionRange(_.b.length, value.length);
        }
      },
      [inputRef, setFocusIndex, setInputValue, _]
    )
  };
};

export { supercomplete };
