import { useCallback, useState } from 'react';
import type { Feature } from '../common';
import { CHANGETYPE_INSERT } from '../common';
import { autocomplete } from './autocomplete';

export interface Instance {
  /**
   * ### INTERNAL API ###
   * action mapper
   */
  a?: [number, () => void];
}

const supercomplete: () => Feature<{
  inlineComplete: (props: { index: number; value: string }) => void;
}> = () => (cx) => {
  const [instance] = useState<Instance>({});

  const base = autocomplete({ rovingInput: true })(cx);

  const { inputRef, setInputValue, setFocusIndex, _: cxInstance } = cx;
  return {
    ...base,

    onKeyDown: (e) => {
      base.onKeyDown!(e);
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const [index, action] = instance.a || [];
        if (cxInstance.d === index) action?.();
        // const { length } = inputValue;
        // inputRef.current?.setSelectionRange(length, length);
      }
    },

    inlineComplete: useCallback(
      ({ index, value }) => {
        const action = () => {
          if (cxInstance.c !== CHANGETYPE_INSERT) return;
          setFocusIndex(index);
          const valueLength = cxInstance.b.length;
          const newValue = cxInstance.b + value.slice(valueLength);
          setInputValue(newValue);
          inputRef.current?.setSelectionRange(valueLength, value.length);
        };
        action();
        instance.a = [index, action];
      },
      [cxInstance, instance, inputRef, setFocusIndex, setInputValue]
    )
  };
};

export { supercomplete };
