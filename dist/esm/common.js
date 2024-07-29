const defaultFocusIndex = -1;
const defaultEqual = (itemA, itemB) => itemA === itemB;
const getId = (prefix, suffix) => prefix && prefix + suffix;
const buttonProps = {
  tabIndex: -1,
  type: 'button'
};

export { buttonProps, defaultEqual, defaultFocusIndex, getId };
