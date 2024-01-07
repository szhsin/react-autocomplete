import type { InputHTMLAttributes, HTMLAttributes } from 'react';
import { useState, useRef } from 'react';
import { AutocompleteProps, AutocompleteState } from '../common';

interface GetProps {
  input: [never, InputHTMLAttributes<HTMLInputElement>];
  item: [{ index?: number }, HTMLAttributes<HTMLElement>];
}

type GetPropsFunc<T extends keyof GetProps> = (option?: GetProps[T][0]) => GetProps[T][1];

const useAutocomplete = ({ feature, items = [], onChange = () => {} }: AutocompleteProps) => {
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

  const state: AutocompleteState = {
    inputValue: [inputValue, setInputValueBase],
    focusIndex: [focusIndex, setfocusIndex],
    isOpen: [isOpen, setOpenBase]
  };

  const { onInputChange, onInputClick, onBlur, onKeyDown, onItemClick } =
    feature?.({ state, props: { items, onChange } }) || {};

  const getInputProps: GetPropsFunc<'input'> = () => ({
    value: inputValue,

    ref: inputRef,

    onChange: (e) => onInputChange?.({ value: e.target.value }),

    onClick: () => onInputClick?.(),

    onBlur: () => !instance.a && onBlur?.(),

    onKeyDown: ({ key }) => onKeyDown?.({ key })
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
    state
  };
};

export { useAutocomplete };
