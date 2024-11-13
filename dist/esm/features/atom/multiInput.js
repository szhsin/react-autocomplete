const multiInput = () => ({
  removeSelect
}) => {
  return {
    getInputProps: () => ({
      onKeyDown: e => !e.target.value && e.key === 'Backspace' && removeSelect?.()
    })
  };
};

export { multiInput };
