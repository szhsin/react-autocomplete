import type { InputHTMLAttributes, HTMLAttributes, ChangeEvent } from 'react';
import { useState, useRef } from 'react';
import type { AutocompleteProps, AutocompleteState, Instance, Feature } from '../common';

interface GetProps {
  input: [never, InputHTMLAttributes<HTMLInputElement>];
  item: [{ index?: number }, HTMLAttributes<HTMLElement>];
}

type ab = Parameters<NonNullable<InputHTMLAttributes<HTMLInputElement>['onChange']>>[0];

type GetPropsFunc<T extends keyof GetProps> = (option?: GetProps[T][0]) => GetProps[T][1];

const useAutocomplete = <FeatureActions = object>({
  feature: useFeature = (() => ({})) as unknown as Feature<FeatureActions>,
  items = [],
  onChange = () => {}
}: AutocompleteProps<FeatureActions>) => {
  const inputRef = useRef<HTMLInputElement>(null);
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

  const { onInputChange, onInputClick, onBlur, onKeyDown, onItemClick, ...actions } = useFeature({
    _: instance,
    items,
    onChange,
    inputRef,
    ...state
  });

  const getInputProps: GetPropsFunc<'input'> = () => ({
    value: inputValue,
    ref: inputRef,
    onChange: onInputChange,
    onClick: onInputClick,
    onBlur,
    onKeyDown: (e) => {
      const { key } = e;
      if (items.length && (key === 'ArrowUp' || key === 'ArrowDown')) e.preventDefault();
      onKeyDown?.(e);
    }
  });

  const getItemProps: GetPropsFunc<'item'> = ({ index = -1 } = {}) => ({
    onMouseDown: () => (instance.a = 1),
    onClick: (e) => {
      onItemClick?.(e, { index });
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
    ...state,
    ...(actions as FeatureActions)
  };
};

export { useAutocomplete };
