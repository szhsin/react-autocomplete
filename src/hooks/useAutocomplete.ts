import { useState, useRef, useCallback } from 'react';
import type {
  GetProps,
  AutocompleteProps,
  AutocompleteState,
  Instance,
  Contextual
} from '../common';

const useAutocomplete = <T, FeatureActions>({
  items = [],
  onChange = () => {},
  feature: useFeature,
  getItemValue: _getItemValue
}: AutocompleteProps<T, FeatureActions>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [instance] = useState<Instance>({ b: '', c: [] });

  const getItemValue: Contextual<T>['getItemValue'] = (item) =>
    item == null ? null : _getItemValue ? _getItemValue(item) : item.toString();

  const setInputValue = useCallback((value: string) => {
    const input = inputRef.current;
    if (input) input.value = value;
  }, []);

  const state: AutocompleteState = {
    setInputValue,
    focusIndex,
    setFocusIndex,
    open,
    setOpen
  };

  const {
    getInputProps: _getInputProps,
    getItemProps: _getItemProps,
    ...actions
  } = useFeature({
    _: instance,
    items,
    getItemValue,
    onChange,
    inputRef,
    ...state
  });

  const { onBlur, onKeyDown, ...featureInputProps } = _getInputProps();

  const getInputProps: GetProps['getInputProps'] = () => ({
    ...featureInputProps,
    onBlur: (e) => !instance.a && onBlur?.(e),
    onKeyDown: (e) => {
      const { key } = e;
      if (items.length && (key === 'ArrowUp' || key === 'ArrowDown')) e.preventDefault();
      onKeyDown?.(e);
    },
    ref: inputRef
  });

  const getItemProps: GetProps['getItemProps'] = (option) => {
    const { onMouseDown, onClick, ...featureItemProps } = _getItemProps(option);
    return {
      ...featureItemProps,
      onMouseDown: (e) => {
        onMouseDown?.(e);
        instance.a = 1;
      },
      onClick: (e) => {
        onClick?.(e);
        inputRef.current?.focus();
        instance.a = 0;
      }
    };
  };

  return {
    getInputProps,
    getItemProps,
    ...state,
    ...actions
  };
};

export { useAutocomplete };
