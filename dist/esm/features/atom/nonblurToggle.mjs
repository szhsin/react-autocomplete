import { getInputToggleProps } from "../../common.mjs";
// src/features/atom/nonblurToggle.ts
const nonblurToggle = () => ({ id, open, setOpen, disabled }) => ({ getToggleProps: () => ({
	...getInputToggleProps(id, open, disabled),
	onClick: () => setOpen(!open)
}) });
export { nonblurToggle };
