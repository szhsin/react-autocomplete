import { linearTraversal } from './linearTraversal.js';

const isArray = Array.isArray;
const groupedTraversal = ({
  groupedItems,
  getItemsInGroup,
  ...restProps
}) => {
  const groups = isArray(groupedItems) ? groupedItems : Object.values(groupedItems);
  const items = groups.reduce((accu, group) => accu.concat(isArray(group) ? group : getItemsInGroup ? getItemsInGroup(group) : []), []);
  return linearTraversal({
    ...restProps,
    items
  });
};

export { groupedTraversal };
