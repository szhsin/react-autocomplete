/// <reference types="react" />
export interface AutocompleteState {
    inputValue: [string, React.Dispatch<React.SetStateAction<string>>];
    focusIndex: [number, React.Dispatch<React.SetStateAction<number>>];
    isOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
interface FeatureProps {
    onChange: (value: string) => void;
    items: string[];
}
export interface FeatureEvent {
    state: AutocompleteState;
    props: FeatureProps;
}
type FeatureEventHandler<T = object> = (event: T & FeatureEvent) => void;
export interface Feature {
    onInputChange?: FeatureEventHandler<{
        value: string;
    }>;
    onInputClick?: FeatureEventHandler;
    onBlur?: FeatureEventHandler;
    onKeyDown?: FeatureEventHandler<{
        key: string;
    }>;
    onItemClick?: FeatureEventHandler<{
        index: number;
    }>;
}
export interface AutocompleteProps extends Partial<FeatureProps> {
    feature?: Feature;
}
export {};
