const isArray = Array.isArray;
const getGroupedItems = ({
  groups,
  getItemsInGroup
}) => {
  const groupArray = isArray(groups) ? groups : Object.values(groups);
  return groupArray.reduce((accu, group) => accu.concat(isArray(group) ? group : getItemsInGroup ? getItemsInGroup(group) : []), []);
};

export { getGroupedItems };
