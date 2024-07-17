const defaultEqual = (itemA, itemB) => itemA === itemB;
const getId = (prefix, suffix) => prefix && prefix + suffix;
const ButtonProps = {
  tabIndex: -1,
  type: 'button'
};

export { ButtonProps, defaultEqual, getId };
