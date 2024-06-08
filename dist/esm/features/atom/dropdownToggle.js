import { useRef } from 'react';

const dropdownToggle = () => ({
  focusItem
}) => {
  const toggleRef = useRef(null);
  const focusToggle = () => setTimeout(() => {
    var _toggleRef$current;
    return (_toggleRef$current = toggleRef.current) == null ? void 0 : _toggleRef$current.focus();
  }, 0);
  return {
    getToggleProps: () => ({
      ref: toggleRef
    }),
    getInputProps: () => ({
      onKeyDown: e => {
        const {
          key
        } = e;
        if (key === 'Escape') focusToggle();
        if (key === 'Enter' && focusItem) {
          e.preventDefault();
          focusToggle();
        }
      }
    })
  };
};

export { dropdownToggle };
