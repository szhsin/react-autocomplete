//#region src/common.ts
const defaultEqual = (itemA, itemB) => itemA === itemB;
const getId = (prefix, suffix) => prefix && prefix + suffix;
const buttonProps = {
	tabIndex: -1,
	type: "button"
};
const getInputToggleProps = (id, open) => ({
	...buttonProps,
	"aria-expanded": open,
	"aria-controls": getId(id, "l")
});
//#endregion
export { buttonProps, defaultEqual, getId, getInputToggleProps };
