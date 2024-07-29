const autoInline = ({
  requestItem
}) => ({
  getItemValue,
  setTmpValue,
  setFocusIndex
}) => ({
  getInputProps: () => ({
    'aria-autocomplete': 'both',
    onChange: async ({
      target,
      nativeEvent
    }) => {
      if (nativeEvent.inputType !== 'insertText') {
        return;
      }
      const nextValue = target.value;
      const result = await requestItem(nextValue);
      if (!result) return;
      setFocusIndex(result.index);
      const itemValue = getItemValue(result.item);
      const start = nextValue.length;
      const end = itemValue.length;
      setTmpValue(nextValue + itemValue.slice(start));
      setTimeout(() => target.setSelectionRange(start, end), 0);
    }
  })
});

export { autoInline };
