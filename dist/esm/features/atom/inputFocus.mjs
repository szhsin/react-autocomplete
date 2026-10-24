import { useState } from "react";
// src/features/atom/inputFocus.ts
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
export { inputFocus };
