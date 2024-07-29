const autoFocus = ({
  requestItem
}) => ({
  setFocusIndex
}) => ({
  getInputProps: () => ({
    onChange: async e => {
      const nextValue = e.target.value;
      if (nextValue) {
        const result = await requestItem(nextValue);
        result && setFocusIndex(result.index);
      }
    }
  })
});

export { autoFocus };
