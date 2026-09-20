import { getInputToggleProps } from "../../common.mjs";
//#region src/features/atom/nonblurToggle.ts
const nonblurToggle = () => ({ id, open, setOpen }) => ({ getToggleProps: () => ({
	...getInputToggleProps(id, open),
	onClick: () => setOpen(!open)
}) });
//#endregion
export { nonblurToggle };
