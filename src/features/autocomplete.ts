import { Feature, FeatureEvent } from '../common';

const autocomplete: () => Feature = () => {
  const updateAndCloseList = (
    {
      props: { onChange },
      state: {
        inputValue: [, setInputValue],
        focusIndex: [, setfocusIndex],
        isOpen: [isOpen, setOpen]
      }
    }: FeatureEvent,
    value: string | undefined
  ) => {
    if (isOpen) {
      if (value != null) {
        setInputValue(value);
        onChange(value);
      }
      setOpen(false);
      setfocusIndex(-1);
    }
  };

  return {
    onItemClick: ({ index, ...event }) => updateAndCloseList(event, event.props.items[index]),

    onInputChange: ({
      value,
      props: { onChange },
      state: {
        inputValue: [, setInputValue],
        focusIndex: [, setfocusIndex],
        isOpen: [, setOpen]
      }
    }) => {
      setInputValue(value);
      setfocusIndex(-1);
      setOpen(true);
      onChange(value);
    },

    onInputClick: ({
      state: {
        isOpen: [, setOpen]
      }
    }) => setOpen(true),

    onBlur: (event) => updateAndCloseList(event, event.state.inputValue[0]),

    onKeyDown: ({ key, ...event }) => {
      const {
        props: { items },
        state: {
          focusIndex: [focusIndex, setfocusIndex],
          inputValue: [inputValue, setInputValue],
          isOpen: [isOpen, setOpen]
        }
      } = event;

      const traverseItems = (itemIndex: number) => {
        setfocusIndex(itemIndex);
        setInputValue(items[itemIndex]);
      };

      let nextIndex = focusIndex;
      const itemLength = items.length;
      switch (key) {
        case 'ArrowDown':
          if (isOpen) {
            if (++nextIndex >= itemLength) nextIndex = 0;
            traverseItems(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            if (--nextIndex < 0) nextIndex = itemLength - 1;
            traverseItems(nextIndex);
          } else {
            setOpen(true);
          }
          break;
        case 'Enter':
          updateAndCloseList(event, items[focusIndex]);
          break;
        case 'Escape':
          updateAndCloseList(event, inputValue);
          break;
      }
    }
  };
};

export { autocomplete };
