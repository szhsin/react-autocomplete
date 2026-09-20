"use strict";
const require_useToggle = require("../../hooks/useToggle.cjs");
let react = require("react");
//#region src/features/atom/dropdownToggle.ts
const dropdownToggle = ({ closeOnSelect = true, toggleRef: externalToggleRef } = {}) => ({ inputRef, open, setOpen, focusIndex, value, tmpValue }) => {
	const [startToggle, stopToggle] = require_useToggle.useToggle(open, setOpen);
	const internalToggleRef = (0, react.useRef)(null);
	const toggleRef = externalToggleRef || internalToggleRef;
	const inputValue = tmpValue || value || "";
	(0, react.useEffect)(() => {
		if (open) inputRef.current?.focus({ preventScroll: true });
	}, [open, inputRef]);
	const focusToggle = () => setTimeout(() => toggleRef.current?.focus(), 0);
	return {
		toggleRef,
		isInputEmpty: !inputValue,
		getToggleProps: () => ({
			type: "button",
			"aria-haspopup": true,
			"aria-expanded": open,
			ref: toggleRef,
			onMouseDown: startToggle,
			onClick: stopToggle,
			onKeyDown: (e) => {
				const { key } = e;
				if (key === "ArrowDown") {
					e.preventDefault();
					setOpen(true);
				}
			}
		}),
		getInputProps: () => ({
			value: inputValue,
			onKeyDown: (e) => {
				const { key } = e;
				if (key === "Escape" || closeOnSelect && focusIndex >= 0 && key === "Enter") focusToggle();
			}
		})
	};
};
//#endregion
exports.dropdownToggle = dropdownToggle;
