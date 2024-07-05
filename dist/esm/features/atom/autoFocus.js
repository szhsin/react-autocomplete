const autoFocus = ({
  getFocusItem
}) => ({
  setFocusItem
}) => ({
  getInputProps: () => ({
    onChange: async e => {
      const nextValue = e.target.value;
      if (nextValue) {
        const item = await getFocusItem(nextValue);
        item && setFocusItem(item);
      }
    }
  })
});

export { autoFocus };
