const scrollIntoView = vi.fn();
Element.prototype.scrollIntoView = scrollIntoView;

export { scrollIntoView };
