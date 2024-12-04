const autoInline = ({
  onRequestItem
}) => ({
  getItemValue,
  setTmpValue,
  setFocusIndex
}) => ({
  getInputProps: () => ({
    'aria-autocomplete': 'both',
    onChange: ({
      target,
      nativeEvent
    }) => {
      if (nativeEvent.inputType !== 'insertText') {
        return;
      }
      const value = target.value;
      onRequestItem({
        value
      }, data => {
        setFocusIndex(data.index);
        const itemValue = getItemValue(data.item);
        const start = value.length;
        const end = itemValue.length;
        setTmpValue(value + itemValue.slice(start));
        setTimeout(() => target.setSelectionRange(start, end), 0);
      });
    }
  })
});

export { autoInline };
