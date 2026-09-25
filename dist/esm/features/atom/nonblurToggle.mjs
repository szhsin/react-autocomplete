import { getInputToggleProps } from "../../common.mjs";
//#region src/features/atom/nonblurToggle.ts
const nonblurToggle = () => ({ id, open, setOpen, disabled }) => ({ getToggleProps: () => ({
	...getInputToggleProps(id, open, disabled),
	onClick: () => setOpen(!open)
}) });
//#endregion
export { nonblurToggle };
