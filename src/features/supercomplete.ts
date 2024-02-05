import { useCallback, useState } from 'react';
import type { Feature, Contextual } from '../common';
import { autocomplete } from './autocomplete';

export interface Instance {
  /**
   * ### INTERNAL API ###
   * action mapper
   */
  a: [number, () => void] | [];

  /**
   * ### INTERNAL API ###
   * The most recent focus index
   */
  b?: number;

  /**
   * ### INTERNAL API ###
   * Whether the last value change is "insertText"
   */
  c?: boolean;
}

const supercomplete: () => Feature<{
  inlineComplete: (props: { index: number; value: string }) => void;
}> = () => {
  const base = autocomplete({ rovingInput: true });
  return ({ setFocusIndex: _setFocusIndex, onChange: _onChange, ...cx }) => {
    const [instance] = useState<Instance>({ a: [] });
    const setFocusIndex = useCallback(
      (value: number) => {
        instance.b = value;
        _setFocusIndex(value);
      },
      [instance, _setFocusIndex]
    );
    const onChange: Contextual['onChange'] = (value, meta) => {
      if (meta.type !== 'input') {
        instance.c = false;
        instance.a = [];
      }
      _onChange(value, meta);
    };
    const baseFeature = base({ ...cx, setFocusIndex, onChange });
    const { inputRef, setInputValue, _: cxInstance } = cx;

    return {
      ...baseFeature,

      onInputChange: (e) => {
        instance.c = (e.nativeEvent as unknown as { inputType: string }).inputType === 'insertText';
        if (!instance.c) instance.a = [];

        baseFeature.onInputChange!(e);
      },

      onKeyDown: (e) => {
        baseFeature.onKeyDown!(e);
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          const [index, action] = instance.a;
          if (instance.b === index) action?.();
        }
      },

      inlineComplete: useCallback(
        ({ index, value }) => {
          if (instance.c) {
            const action = () => {
              setFocusIndex(index);
              const valueLength = cxInstance.b.length;
              const newValue = cxInstance.b + value.slice(valueLength);
              setInputValue(newValue);
              inputRef.current?.setSelectionRange(valueLength, value.length);
            };
            action();
            instance.a = [index, action];
          }
        },
        [cxInstance, instance, inputRef, setFocusIndex, setInputValue]
      )
    };
  };
};

export { supercomplete };
