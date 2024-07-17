import type { GetItemValue, Contextual } from '../types';

const adaptGetItemValue =
  <T>(getItemValue?: GetItemValue<T>['getItemValue']): Contextual<T>['getItemValue'] =>
  (item) =>
    item == null ? '' : getItemValue ? getItemValue(item) : item.toString();

export { adaptGetItemValue };
