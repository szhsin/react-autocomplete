declare const useAutoHeight: ({ anchorRef, show, margin }: {
    anchorRef: React.RefObject<Element>;
    show?: boolean | undefined;
    margin?: number | undefined;
}) => readonly [import("csstype").Property.MaxHeight<string | number> | undefined, () => void];
export { useAutoHeight };
