import type { InputHTMLAttributes, HTMLAttributes } from 'react';
import { useState, useRef } from 'react';
import type { AutocompleteProps, AutocompleteState, Instance } from '../common';

interface GetProps {
  input: [never, InputHTMLAttributes<HTMLInputElement>];
  item: [{ index?: number }, HTMLAttributes<HTMLElement>];
}

type GetPropsFunc<T extends keyof GetProps> = (option?: GetProps[T][0]) => GetProps[T][1];

const useAutocomplete = ({ feature, items = [], onChange = () => {} }: AutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [instance] = useState<Instance>({ b: inputValue });

  const state: AutocompleteState = {
    inputValue,
    setInputValue,
    focusIndex,
    setFocusIndex,
    isOpen,
    setOpen
  };

  const { onInputChange, onInputClick, onBlur, onKeyDown, onItemClick } =
    feature?.({ _: instance, items, onChange, ...state }) || {};

  const getInputProps: GetPropsFunc<'input'> = () => ({
    value: inputValue,

    ref: inputRef,

    onChange: (e) => onInputChange?.({ value: e.target.value }),

    onClick: () => onInputClick?.(),

    onBlur: () => !instance.a && onBlur?.(),

    onKeyDown: (e) => {
      const { key } = e;
      if (items.length && (key === 'ArrowUp' || key === 'ArrowDown')) e.preventDefault();
      onKeyDown?.({ key });
    }
  });

  const getItemProps: GetPropsFunc<'item'> = ({ index = -1 } = {}) => ({
    onMouseDown: () => (instance.a = 1),
    onClick: () => {
      onItemClick?.({ index });
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
        return getItemProps(option);
    }
  };

  return {
    getProps,
    ...state
  };
};

export { useAutocomplete };
