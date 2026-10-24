"use strict";
// src/features/atom/autoFocus.ts
const autoFocus = ({ onRequestItem }) => ({ setFocusIndex }) => ({ getInputProps: () => ({ onChange: (e) => {
	const value = e.target.value;
	if (value) onRequestItem({ value }, (data) => setFocusIndex(data.index));
} }) });
exports.autoFocus = autoFocus;
