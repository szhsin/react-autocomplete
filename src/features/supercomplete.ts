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

  /**
   * ### INTERNAL API ###
   * The most recent focus index
   */
  b?: number;
}

const supercomplete: () => Feature<{
  inlineComplete: (props: { index: number; value: string }) => void;
}> = () => {
  const base = autocomplete({ rovingInput: true });
  return ({ setFocusIndex: _setFocusIndex, ...cx }) => {
    const [instance] = useState<Instance>({});
    const setFocusIndex = useCallback(
      (value: number) => {
        _setFocusIndex(value);
        instance.b = value;
      },
      [instance, _setFocusIndex]
    );
    const baseFeature = base({ ...cx, setFocusIndex });
    const { inputRef, setInputValue, _: cxInstance } = cx;

    return {
      ...baseFeature,

      onKeyDown: (e) => {
        baseFeature.onKeyDown!(e);
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          const [index, action] = instance.a || [];
          if (instance.b === index) action?.();
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
};

export { supercomplete };
