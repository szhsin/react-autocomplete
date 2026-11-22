export interface GroupedItemsProps<G, T> {
    groups: G[] | {
        [s: string]: T[];
    } | ArrayLike<T[]>;
    getItemsInGroup?: (group: G) => T[];
}
declare const mergeGroupedItems: <G, T>({ groups, getItemsInGroup }: GroupedItemsProps<G, T>) => T[];
export { mergeGroupedItems };
