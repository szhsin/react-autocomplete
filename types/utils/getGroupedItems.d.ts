export interface GroupedItemsProps<G, T> {
    groups: G[] | {
        [s: string]: T[];
    } | ArrayLike<T[]>;
    getItemsInGroup?: (group: G) => T[];
}
declare const getGroupedItems: <G, T>({ groups, getItemsInGroup }: GroupedItemsProps<G, T>) => T[];
export { getGroupedItems };
