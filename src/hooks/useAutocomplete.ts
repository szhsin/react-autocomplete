import { useState, useRef, useCallback } from 'react';
import type {
  GetProps,
  GetPropsResult,
  GetPropsFunc,
  AutocompleteProps,
  AutocompleteState,
  Instance,
  Feature
} from '../common';

const useAutocomplete = <FeatureActions = object>({
  feature: useFeature = (() => ({})) as unknown as Feature<FeatureActions>,
  items = [],
  onChange = () => {}
}: AutocompleteProps<FeatureActions>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [instance] = useState<Instance>({ b: '', c: [] });

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

  const { getProps: getFeatureProps, ...actions } = useFeature({
    _: instance,
    items,
    onChange,
    inputRef,
    ...state
  });

  const { onBlur, onKeyDown, ...featureInputProps } = getFeatureProps('input');

  const inputProps: GetPropsResult<'input'> = {
    ...featureInputProps,
    onBlur: (e) => !instance.a && onBlur?.(e),
    onKeyDown: (e) => {
      const { key } = e;
      if (items.length && (key === 'ArrowUp' || key === 'ArrowDown')) e.preventDefault();
      onKeyDown?.(e);
    },
    ref: inputRef
  } as GetPropsResult<'input'>;

  const getItemProps: GetPropsFunc<'item'> = (option) => {
    const { onMouseDown, onClick, ...featureItemProps } = getFeatureProps('item', option);
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

  const getProps: <T extends keyof GetProps>(
    elementType: T,
    option?: GetProps[T][0]
  ) => GetProps[T][1] = (elementType, option) => {
    switch (elementType) {
      case 'item':
        return getItemProps(option);
      case 'input':
      default:
        return inputProps;
    }
  };

  return {
    getProps,
    ...state,
    ...(actions as FeatureActions)
  };
};

export { useAutocomplete };
