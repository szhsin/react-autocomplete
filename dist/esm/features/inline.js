const inline = ({
  getInlineItem
}) => ({
  getItemValue,
  setTmpValue,
  setFocusItem
}) => {
  return {
    getInputProps: () => ({
      onChange: async ({
        target,
        nativeEvent
      }) => {
        if (nativeEvent.inputType !== 'insertText') {
          return;
        }
        const nextValue = target.value;
        const item = await getInlineItem(nextValue);
        if (!item) return;
        setFocusItem(item);
        const itemValue = getItemValue(item);
        const start = nextValue.length;
        const end = itemValue.length;
        setTmpValue(nextValue + itemValue.slice(start));
        setTimeout(() => target.setSelectionRange(start, end), 0);
      }
    })
  };
};

export { inline };
