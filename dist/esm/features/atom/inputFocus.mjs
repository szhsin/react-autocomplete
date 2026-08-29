import { useState } from "react";
//#region src/features/atom/inputFocus.ts
const inputFocus = () => () => {
	const [focused, setFocused] = useState(false);
	return {
		focused,
		getInputProps: () => ({
			onFocusCapture: () => setFocused(true),
			onBlurCapture: () => setFocused(false)
		})
	};
};
//#endregion
export { inputFocus };
