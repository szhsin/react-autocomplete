const isArray = Array.isArray;
const mergeGroupedItems = ({
  groups,
  getItemsInGroup
}) => {
  const groupArray = isArray(groups) ? groups : Object.values(groups);
  return groupArray.reduce((accu, group) => accu.concat(isArray(group) ? group : getItemsInGroup ? getItemsInGroup(group) : []), []);
};

export { mergeGroupedItems };
