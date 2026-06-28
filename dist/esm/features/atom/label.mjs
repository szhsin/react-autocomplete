import { getId } from "../../common.mjs";
//#region src/features/atom/label.ts
const label = () => ({ id }) => {
	const inputId = getId(id, "i");
	const labelId = getId(id, "a");
	return {
		getLabelProps: () => ({
			id: labelId,
			htmlFor: inputId
		}),
		getInputProps: () => ({ id: inputId }),
		getListProps: () => ({ "aria-labelledby": labelId })
	};
};
//#endregion
export { label };
