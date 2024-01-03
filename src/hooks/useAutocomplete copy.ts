import type { InputHTMLAttributes, HTMLAttributes } from 'react';
import { useState, useRef } from 'react';

interface GetProps {
  input: [never, InputHTMLAttributes<HTMLInputElement>];
  option: [{ index?: number }, HTMLAttributes<HTMLElement>];
}

type GetPropsFunc<T extends keyof GetProps> = (option?: GetProps[T][0]) => GetProps[T][1];
type ValueEventType = 'type' | 'submit' | 'esc' | 'blur' | 'nav' | 'focus';
export type AutocompleteState = ReturnType<typeof useAutocomplete>['state'];

export interface AutocompleteProps {
  onChange?: (value: string, meta: { type: ValueEventType; state: AutocompleteState }) => void;
  onSetInputValue?: (
    value: string,
    meta: { type: ValueEventType; state: AutocompleteState },
    base: AutocompleteState['inputValue'][1]
  ) => void;
  onSetOpen?: (
    value: boolean,
    meta: { type: ValueEventType; state: AutocompleteState },
    base: AutocompleteState['isOpen'][1]
  ) => void;
  items?: string[];
}

const useAutocomplete = ({
  onChange,
  onSetInputValue,
  onSetOpen,
  items = []
}: AutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const [inputValue, setInputValueBase] = useState('');
  const [isOpen, setOpenBase] = useState(false);
  const [focusIndex, setfocusIndex] = useState(-1);
  const [instance] = useState<{
    /**
     * Whether to bypass onblur event on input
     */
    a?: number;
  }>({});

  const state = {
    inputValue: [inputValue, setInputValueBase],
    focusIndex: [focusIndex, setfocusIndex],
    isOpen: [isOpen, setOpenBase]
  } as const;

  const itemLength = items.length;
  const setInputValue = onSetInputValue || setInputValueBase;
  const setOpen = (value: boolean, type: ValueEventType) =>
    onSetOpen ? onSetOpen(value, { type, state }, setOpenBase) : setOpenBase(value);

  const traverseItems = (itemIndex: number) => {
    setfocusIndex(itemIndex);
    setInputValue(items[itemIndex], { type: 'nav', state }, setInputValueBase);
  };

  const updateValue = (value: string | undefined, type: ValueEventType) => {
    if (value != null) {
      setInputValue(value, { type, state }, setInputValueBase);
      onChange?.(value, { type, state });
    }
  };

  const updateAndCloseList = (value: string | undefined, type: ValueEventType) => {
    if (isOpen) {
      updateValue(value, type);
      setOpen(false, type);
      setfocusIndex(-1);
    }
  };

  const getInputProps: GetPropsFunc<'input'> = () => ({
    value: inputValue,

    ref: inputRef,

    onChange: (e) => {
      updateValue(e.target.value, 'type');
      setOpen(true, 'type');
      setfocusIndex(-1);
    },

    onClick: () => setOpen(true, 'focus'),

    onBlur: () => {
      if (!instance.a) {
        updateAndCloseList(inputValue, 'blur');
      }
    },

    onKeyDown: ({ key }) => {
      let nextIndex = focusIndex;
      switch (key) {
        case 'ArrowDown':
          if (isOpen) {
            if (++nextIndex >= itemLength) nextIndex = 0;
            traverseItems(nextIndex);
          } else {
            setOpen(true, 'nav');
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            if (--nextIndex < 0) nextIndex = itemLength - 1;
            traverseItems(nextIndex);
          } else {
            setOpen(true, 'nav');
          }
          break;
        case 'Enter':
          updateAndCloseList(items[focusIndex], 'submit');
          break;
        case 'Escape':
          updateAndCloseList(inputValue, 'esc');
          break;
      }
    }
  });

  const getOptionProps: GetPropsFunc<'option'> = ({ index = -1 } = {}) => ({
    onMouseDown: () => (instance.a = 1),
    onClick: () => {
      updateAndCloseList(items[index], 'submit');
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
