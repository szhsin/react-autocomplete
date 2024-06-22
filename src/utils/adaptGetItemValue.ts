import type { GetItemValue, Contextual } from '../common';

const adaptGetItemValue =
  <T>(getItemValue?: GetItemValue<T>['getItemValue']): Contextual<T>['getItemValue'] =>
  (item) =>
    item == null ? '' : getItemValue ? getItemValue(item) : item.toString();

export { adaptGetItemValue };
