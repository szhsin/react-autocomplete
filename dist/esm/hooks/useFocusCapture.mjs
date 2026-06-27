import { useMutableState } from "./useMutableState.mjs";
//#region src/hooks/useFocusCapture.ts
const useFocusCapture = (focusRef) => {
	const mutable = useMutableState({});
	return [
		() => {
			mutable.a = 1;
		},
		() => {
			if (mutable.a) {
				mutable.a = 0;
				focusRef.current?.focus();
				return true;
			}
		},
		() => {
			mutable.a = 0;
			focusRef.current?.focus();
		}
	];
};
//#endregion
export { useFocusCapture };
