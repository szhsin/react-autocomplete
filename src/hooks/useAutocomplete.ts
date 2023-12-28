import type { InputHTMLAttributes, HTMLAttributes } from 'react';
import { useState, useRef } from 'react';

interface GetProps {
  input: [never, InputHTMLAttributes<HTMLInputElement>];
  option: [{ index?: number }, HTMLAttributes<HTMLElement>];
}

type GetPropsFunc<T extends keyof GetProps> = (option?: GetProps[T][0]) => GetProps[T][1];

const useAutocomplete = ({
  onChange,
  items = []
}: {
  onChange?: (value: string) => void;
  items?: string[];
}) => {
  const inputRef = useRef<HTMLInputElement>();
  const [inputValue, setInputValue] = useState('');
  const [focusIndex, setfocusIndex] = useState(-1);
  const [isOpen, setOpen] = useState(false);
  const [instance] = useState<{
    /**
     * Whether to bypass onblur event on input
     */
    a?: number;
  }>({});

  const itemLength = items.length;

  const updateInput = (itemIndex: number) => {
    setfocusIndex(itemIndex);
    setInputValue(items[itemIndex]);
  };

  const updateValue = (value?: string) => {
    if (value == null) return;
    setInputValue(value);
    onChange?.(value);
  };

  const getInputProps: GetPropsFunc<'input'> = () => ({
    value: inputValue,

    ref: inputRef,

    onChange: (e) => {
      updateValue(e.target.value);
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
            updateInput(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            if (--nextIndex < 0) nextIndex = itemLength - 1;
            updateInput(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          if (isOpen) {
            setOpen(false);
            updateValue(items[focusIndex]);
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
      updateValue(items[index]);
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
    state: {
      inputValue: [inputValue, setInputValue],
      focusIndex: [focusIndex, setfocusIndex],
      isOpen: [isOpen, setOpen]
    } as const
  };
};

export { useAutocomplete };
