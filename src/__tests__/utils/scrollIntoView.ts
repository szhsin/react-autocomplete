const scrollIntoView = vi.fn<Element['scrollIntoView']>();
Element.prototype.scrollIntoView = scrollIntoView;

export { scrollIntoView };
