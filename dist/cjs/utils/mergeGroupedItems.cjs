"use strict";
//#region src/utils/mergeGroupedItems.ts
const isArray = Array.isArray;
const mergeGroupedItems = ({ groups, getItemsInGroup }) => {
	return (isArray(groups) ? groups : Object.values(groups)).reduce((accu, group) => accu.concat(isArray(group) ? group : getItemsInGroup ? getItemsInGroup(group) : []), []);
};
//#endregion
exports.mergeGroupedItems = mergeGroupedItems;
