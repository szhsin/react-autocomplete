declare const useAutoHeight: ({ anchorRef, show, margin }: {
    anchorRef: React.RefObject<Element>;
    show?: boolean;
    margin?: number;
}) => readonly [import("csstype").Property.MaxHeight<string | number> | undefined, () => void];
export { useAutoHeight };
