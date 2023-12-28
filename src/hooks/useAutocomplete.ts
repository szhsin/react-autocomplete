import type { InputHTMLAttributes, HTMLAttributes } from 'react';
import { useState, useRef } from 'react';

interface GetProps {
  input: [never, InputHTMLAttributes<HTMLInputElement>];
  option: [{ index?: number }, HTMLAttributes<HTMLElement>];
}

type GetPropsFunc<T extends keyof GetProps> = (option?: GetProps[T][0]) => GetProps[T][1];
type ValueEventType = 'type' | 'submit' | 'esc' | 'blur' | 'nav';
export type AutocompleteState = ReturnType<typeof useAutocomplete>['state'];

export interface AutocompleteProps {
  onChange?: (value: string, meta: { type: ValueEventType; state: AutocompleteState }) => void;
  onSetInputValue?: (
    value: string,
    meta: { type: ValueEventType; state: AutocompleteState },
    base: AutocompleteState['inputValue'][1]
  ) => void;
  items?: string[];
}

const useAutocomplete = ({ onChange, onSetInputValue, items = [] }: AutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const [inputValue, setInputValueBase] = useState('');
  const [focusIndex, setfocusIndex] = useState(-1);
  const [isOpen, setOpen] = useState(false);
  const [instance] = useState<{
    /**
     * Whether to bypass onblur event on input
     */
    a?: number;
  }>({});

  const state = {
    inputValue: [inputValue, setInputValueBase],
    focusIndex: [focusIndex, setfocusIndex],
    isOpen: [isOpen, setOpen]
  } as const;

  const itemLength = items.length;
  const setInputValue = (onSetInputValue || setInputValueBase) as NonNullable<
    AutocompleteProps['onSetInputValue']
  >;

  const updateInputByNav = (itemIndex: number) => {
    setfocusIndex(itemIndex);
    setInputValue(items[itemIndex], { type: 'nav', state }, setInputValueBase);
  };

  const updateValue = (value: string | undefined, type: ValueEventType) => {
    if (value == null) return;
    setInputValue(value, { type, state }, setInputValueBase);
    onChange?.(value, { type, state });
  };

  const getInputProps: GetPropsFunc<'input'> = () => ({
    value: inputValue,

    ref: inputRef,

    onChange: (e) => {
      updateValue(e.target.value, 'type');
      setOpen(true);
      setfocusIndex(-1);
    },

    onClick: () => setOpen(!isOpen),

    onBlur: () => !instance.a && setOpen(false),

    onKeyDown: ({ key }) => {
      let nextIndex = focusIndex;
      switch (key) {
        case 'ArrowDown':
          if (isOpen) {
            if (++nextIndex >= itemLength) nextIndex = 0;
            updateInputByNav(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            if (--nextIndex < 0) nextIndex = itemLength - 1;
            updateInputByNav(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          if (isOpen) {
            setOpen(false);
            updateValue(items[focusIndex], 'submit');
          }
          break;
        case 'Escape':
          setOpen(false);
          break;
      }
    }
  });

  const getOptionProps: GetPropsFunc<'option'> = ({ index = -1 } = {}) => ({
    onMouseDown: () => (instance.a = 1),
    onClick: () => {
      setOpen(false);
      updateValue(items[index], 'submit');
      inputRef.current?.focus();
      instance.a = 0;
    }
  });

  const getProps: <T extends keyof GetProps>(
    elementType: T,
    option?: GetProps[T][0]
  ) => GetProps[T][1] = (elementType, option) => {
    switch (elementType) {
      case 'input':
        return getInputProps();
      default:
        return getOptionProps(option);
    }
  };

  return {
    getProps,
    state
  };
};

export { useAutocomplete };
